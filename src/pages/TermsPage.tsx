import type { ReactNode } from 'react'

import termsMarkdown from '../../TERMS.md?raw'
import { PageMetadata, type PageMetadataProps } from '../app/components/PageMetadata'

const metadata = {
  title: '利用規約 | fukidashi',
  description: 'fukidashiの利用規約です。ご利用前に内容をご確認ください。',
  path: '/terms',
} satisfies PageMetadataProps

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${part}-${index}`} className="font-bold text-[#353b3c]">
          {part.slice(2, -2)}
        </strong>
      )
    }

    return part
  })
}

export function MarkdownDocument({ markdown }: { markdown: string }) {
  const lines = markdown.trim().split(/\r?\n/)
  const blocks: ReactNode[] = []

  for (let index = 0; index < lines.length;) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line)

    if (heading) {
      const level = heading[1].length
      const content = renderInline(heading[2])

      if (level === 1) {
        blocks.push(
          <h1 key={`heading-${index}`} className="text-2xl font-bold text-[#353b3c] sm:text-3xl">
            {content}
          </h1>,
        )
      } else if (level === 2) {
        blocks.push(
          <h2 key={`heading-${index}`} className="mt-10 border-b border-[#dedede] pb-3 text-xl font-bold text-[#353b3c]">
            {content}
          </h2>,
        )
      } else {
        blocks.push(
          <h3 key={`heading-${index}`} className="mt-7 text-base font-bold text-[#353b3c]">
            {content}
          </h3>,
        )
      }

      index += 1
      continue
    }

    if (line.startsWith('- ')) {
      const startIndex = index
      const items: ReactNode[] = []

      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(
          <li key={`item-${index}`} className="leading-7">
            {renderInline(lines[index].slice(2))}
          </li>,
        )
        index += 1
      }

      blocks.push(
        <ul key={`list-${startIndex}`} className="mt-4 list-disc space-y-2 pl-6 text-[#555] marker:text-[#9d9d9d]">
          {items}
        </ul>,
      )
      continue
    }

    const paragraphStart = index
    const paragraphLines: string[] = []

    while (index < lines.length && lines[index].trim() && !/^(#{1,3})\s+/.test(lines[index]) && !lines[index].startsWith('- ')) {
      paragraphLines.push(lines[index])
      index += 1
    }

    blocks.push(
      <p key={`paragraph-${paragraphStart}`} className="mt-4 leading-8 text-[#555]">
        {renderInline(paragraphLines.join(' '))}
      </p>,
    )
  }

  return blocks
}

export function TermsPage() {
  return (
    <>
      <PageMetadata {...metadata} />
      <div className="h-full overflow-y-auto">
        <article className="mx-auto w-full max-w-3xl px-6 py-12 pb-20">
          <MarkdownDocument markdown={termsMarkdown} />
        </article>
      </div>
    </>
  )
}
