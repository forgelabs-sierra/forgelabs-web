'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

interface ImageUploaderProps {
  onInsert: (text: string) => void
  onUploaded?: () => void  // called after upload so editor can refresh SHA
}

export function ImageUploader({ onInsert, onUploaded }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleButtonClick() {
    setError(null)
    inputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      // Read file as base64 (without data URI prefix)
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          // Strip the data URI prefix (e.g. "data:image/jpeg;base64,")
          const base64Data = result.split(',')[1]
          resolve(base64Data)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, content: base64 }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Upload failed (${res.status})`)
      }

      const { url } = await res.json() as { url: string }

      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(url)
      } catch {
        // Clipboard write failed — non-fatal
      }

      // Insert as YAML image field at cursor
      onInsert(`image: ${url}`)

      // Notify editor to refresh SHA — upload committed to GitHub, invalidating current SHA
      onUploaded?.()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      // Reset so the same file can be re-uploaded if needed
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handleButtonClick}
        disabled={uploading}
        className="whitespace-nowrap text-xs"
      >
        {uploading ? (
          <span className="flex items-center gap-1">
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Uploading…
          </span>
        ) : (
          '📷 Upload Image'
        )}
      </Button>
      {error && (
        <span className="text-xs text-red-600 max-w-[200px] truncate" title={error}>
          {error}
        </span>
      )}
    </div>
  )
}
