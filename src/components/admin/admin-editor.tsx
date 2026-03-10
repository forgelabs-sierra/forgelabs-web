'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback, useRef } from 'react'
import { signOut } from 'next-auth/react'
import { parseShortcodes } from '@/lib/shortcodes'
import { renderBlocks } from '@/lib/renderer'
import { ShortcodeToolbar } from './shortcode-toolbar'
import { Button } from '@/components/ui/button'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const DRAFT_KEY = 'forgelabs-cms-draft'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'conflict' | 'error'

interface AdminEditorProps {
  userEmail: string
}

function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return debounced
}

function timeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}

export function AdminEditor({ userEmail }: AdminEditorProps) {
  const [content, setContent] = useState('')
  const [initialContent, setInitialContent] = useState('')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [lastSavedDisplay, setLastSavedDisplay] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const [sha, setSha] = useState<string | undefined>()
  const [conflictMsg, setConflictMsg] = useState('')
  const [draftRestored, setDraftRestored] = useState(false)

  const contentRef = useRef(content)
  contentRef.current = content

  // Load content from API on mount
  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then(data => {
        const serverContent = data.content ?? ''
        setSha(data.sha)

        // Check for a saved draft
        const draft = localStorage.getItem(DRAFT_KEY)
        if (draft && draft !== serverContent) {
          const restore = window.confirm(
            'You have unsaved draft changes. Restore draft? (Cancel to use published version)'
          )
          if (restore) {
            setContent(draft)
            setIsDirty(true)
            setDraftRestored(true)
          } else {
            localStorage.removeItem(DRAFT_KEY)
            setContent(serverContent)
          }
        } else {
          setContent(serverContent)
        }
        setInitialContent(serverContent)
      })
      .catch(err => {
        console.error('Failed to load content', err)
      })
  }, [])

  // Track dirty state
  useEffect(() => {
    setIsDirty(content !== initialContent || draftRestored)
  }, [content, initialContent, draftRestored])

  // Auto-save draft to localStorage every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirty) {
        localStorage.setItem(DRAFT_KEY, contentRef.current)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [isDirty])

  // Update "last saved" display every 5s
  useEffect(() => {
    if (!lastSaved) return
    const interval = setInterval(() => {
      setLastSavedDisplay(timeSince(lastSaved))
    }, 5000)
    setLastSavedDisplay(timeSince(lastSaved))
    return () => clearInterval(interval)
  }, [lastSaved])

  // Warn on unload if dirty
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, sha])

  const handleSave = useCallback(async () => {
    setSaveStatus('saving')
    setConflictMsg('')
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: contentRef.current, sha }),
      })
      if (res.status === 409) {
        const body = await res.json().catch(() => ({}))
        setSaveStatus('conflict')
        setConflictMsg(body.error ?? 'Conflict: content was modified elsewhere.')
        return
      }
      if (!res.ok) {
        setSaveStatus('error')
        return
      }
      const data = await res.json()
      setSha(data.sha)
      setInitialContent(contentRef.current)
      setIsDirty(false)
      setDraftRestored(false)
      localStorage.removeItem(DRAFT_KEY)
      setSaveStatus('saved')
      setLastSaved(new Date())
      setLastSavedDisplay('just now')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }, [sha])

  const handleInsert = useCallback((text: string) => {
    setContent(prev => prev + (prev.endsWith('\n') || prev === '' ? '' : '\n') + text)
  }, [])

  const debouncedContent = useDebounce(content, 300)
  const previewBlocks = parseShortcodes(debouncedContent)
  const previewNodes = renderBlocks(previewBlocks)

  const saveButtonLabel =
    saveStatus === 'saving' ? 'Saving…' :
    saveStatus === 'saved' ? 'Published ✓' :
    saveStatus === 'conflict' ? 'Conflict!' :
    saveStatus === 'error' ? 'Error — Retry' :
    'Save & Deploy'

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-background px-6 flex-shrink-0" style={{ height: '60px' }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to site</a>
          <h1 className="font-bold text-lg">Forge Labs CMS</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">{userEmail}</span>
          <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>
            Sign out
          </Button>
        </div>
      </header>

      {/* Shortcode Toolbar */}
      <ShortcodeToolbar onInsert={handleInsert} />

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor (left) */}
        <div className="w-1/2 h-full overflow-hidden" data-color-mode="light">
          <MDEditor
            value={content}
            onChange={v => setContent(v ?? '')}
            height="100%"
            preview="edit"
            hideToolbar={false}
            style={{ borderRadius: 0, border: 'none', height: '100%' }}
          />
        </div>

        {/* Preview (right) */}
        <div className="w-1/2 h-full overflow-y-auto border-l bg-white">
          <div className="origin-top-left scale-75 w-[133.33%]">
            {previewNodes.length > 0 ? (
              <div>{previewNodes}</div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                Preview will appear here as you type…
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t bg-background px-6 flex-shrink-0" style={{ height: '48px' }}>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {lastSaved && <span>Last saved: {lastSavedDisplay}</span>}
          {isDirty && <span className="text-amber-600 font-medium">● Unsaved changes</span>}
          {conflictMsg && (
            <span className="text-red-600 text-xs flex items-center gap-2">
              {conflictMsg}
              <button
                className="underline text-blue-600"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
            </span>
          )}
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={saveStatus === 'saving' || (!isDirty && saveStatus === 'idle')}
          className={saveStatus === 'saved' ? 'bg-green-600 hover:bg-green-700' : saveStatus === 'conflict' || saveStatus === 'error' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          {saveButtonLabel}
        </Button>
      </div>
    </div>
  )
}
