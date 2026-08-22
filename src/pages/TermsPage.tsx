import type { ReactNode } from 'react'

import termsMarkdown from '../../TERMS.md?raw'
import { PageMetadata } from '../app/components/PageMetadata'
import { pageMetadata } from '../app/pageMetadata'

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${part}-${index}`} className="font-bold text-foreground">
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
          <h1 key={`heading-${index}`} className="text-3xl font-bold text-foreground max-lg:text-2xl">
            {content}
          </h1>,
        )
      } else if (level === 2) {
        blocks.push(
          <h2 key={`heading-${index}`} className="mt-8 border-b border-border pb-2 text-xl font-bold text-foreground">
            {content}
          </h2>,
        )
      } else {
        blocks.push(
          <h3 key={`heading-${index}`} className="mt-8 text-base font-bold text-foreground">
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
        <ul key={`list-${startIndex}`} className="mt-4 list-disc space-y-2 pl-4 text-foreground marker:text-foreground-muted">
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
      <p key={`paragraph-${paragraphStart}`} className="mt-4 leading-8 text-foreground">
        {renderInline(paragraphLines.join(' '))}
      </p>,
    )
  }

  return blocks
}

export function TermsPage() {
  return (
    <>
      <PageMetadata {...pageMetadata.terms} />
      <div className="h-full overflow-y-auto">
        <article className="mx-auto w-full max-w-3xl px-8 py-12 pb-16 max-lg:px-4">
          <MarkdownDocument markdown={termsMarkdown} />
        </article>
      </div>
    </>
  )
}
