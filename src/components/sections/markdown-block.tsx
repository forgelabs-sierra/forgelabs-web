import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownBlock({ content }: { content: string }) {
  if (!content.trim()) return null
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6 prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </section>
  )
}
