'use client'

import { useRef, useState, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'

interface ImageEntry {
  name: string
  url: string
  downloadUrl: string
}

interface ImageManagerProps {
  onInsert: (text: string) => void
  onUploaded?: () => void
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

export function ImageManager({ onInsert, onUploaded }: ImageManagerProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'library' | 'upload'>('library')
  const [images, setImages] = useState<ImageEntry[]>([])
  const [loadingImages, setLoadingImages] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [deletingImage, setDeletingImage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchImages = useCallback(async () => {
    setLoadingImages(true)
    try {
      const res = await fetch('/api/images')
      if (res.ok) {
        const data = await res.json() as ImageEntry[]
        setImages(data)
      }
    } catch {
      // silently fail — library will just be empty
    } finally {
      setLoadingImages(false)
    }
  }, [])

  function handleOpen(isOpen: boolean) {
    setOpen(isOpen)
    if (isOpen) {
      setTab('library')
      fetchImages()
    }
  }

  function handleThumbnailClick(img: ImageEntry) {
    onInsert(`image: ${img.url}`)
    setOpen(false)
  }

  async function handleDelete(img: ImageEntry, e: React.MouseEvent) {
    e.stopPropagation()
    if (!confirm(`Delete ${img.name}?`)) return
    setDeletingImage(img.name)
    try {
      const res = await fetch('/api/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: img.name }),
      })
      if (res.ok) {
        onUploaded?.() // refresh SHA — delete commits to GitHub
        await fetchImages()
      }
    } catch {
      // silently fail
    } finally {
      setDeletingImage(null)
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError(null)

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          resolve(result.split(',')[1])
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
        throw new Error((body as { error?: string }).error ?? `Upload failed (${res.status})`)
      }

      onUploaded?.()
      // Switch to library and refresh
      setTab('library')
      await fetchImages()
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="whitespace-nowrap text-xs">
          🖼️ Images
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl w-[540px] max-w-[95vw] max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <Dialog.Title className="font-semibold text-base">Image Library</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-gray-600 text-lg leading-none" aria-label="Close">
                ×
              </button>
            </Dialog.Close>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-5 pt-3">
            <button
              onClick={() => setTab('library')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                tab === 'library'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Library
            </button>
            <button
              onClick={() => setTab('upload')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                tab === 'upload'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upload
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 min-h-[200px]">
            {tab === 'library' && (
              <>
                {loadingImages ? (
                  <div className="flex items-center justify-center h-32 gap-2 text-gray-500">
                    <Spinner />
                    <span className="text-sm">Loading images…</span>
                  </div>
                ) : images.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-center text-sm text-gray-500">
                    No images uploaded yet.
                    <br />
                    Use the Upload tab to add images.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-3">
                    {images.map(img => (
                      <div key={img.name} className="flex flex-col items-center gap-1 group relative">
                        <button
                          onClick={() => handleThumbnailClick(img)}
                          className="relative"
                          title={`Insert ${img.name}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.downloadUrl ?? ''}
                            alt={img.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 object-cover rounded border border-gray-200 group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                          />
                          {deletingImage === img.name && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded">
                              <Spinner />
                            </div>
                          )}
                        </button>
                        <span className="text-xs text-gray-600 w-full text-center truncate px-1">
                          {img.name}
                        </span>
                        <button
                          onClick={(e) => handleDelete(img, e)}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors"
                          title={`Delete ${img.name}`}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {tab === 'upload' && (
              <div className="flex flex-col items-center justify-center gap-4 h-40">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  onClick={() => { setUploadError(null); inputRef.current?.click() }}
                  disabled={uploading}
                  className="flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Spinner />
                      Uploading…
                    </>
                  ) : (
                    '📷 Choose image to upload'
                  )}
                </Button>
                {uploadError && (
                  <p className="text-sm text-red-600 text-center max-w-xs">{uploadError}</p>
                )}
                <p className="text-xs text-gray-400">
                  After uploading, the image will appear in the Library tab.
                </p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
