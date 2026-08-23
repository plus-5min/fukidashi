import type { CSSProperties, ReactNode } from 'react'

function isSafeUrl(value: string) {
  if (value.startsWith('/') || value.startsWith('#')) {
    return true
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${part}-${index}`} className="font-bold text-foreground">
          {renderInline(part.slice(2, -2))}
        </strong>
      )
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)

    if (link && isSafeUrl(link[2])) {
      const isExternal = /^https?:/.test(link[2])

      return (
        <a
          key={`${part}-${index}`}
          className="rounded-sm font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:text-primary"
          href={link[2]}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
        >
          {link[1]}
        </a>
      )
    }

    return part
  })
}

function renderParagraphLines(lines: string[]) {
  return lines.flatMap((line, index) => [index > 0 ? <br key={`break-${index}`} /> : null, ...renderInline(line)])
}

function isBlockStart(line: string) {
  return /^(#{1,4})\s+/.test(line) || line === '---' || line.startsWith('- ') || line.startsWith('>') || line.startsWith('![')
}

type MarkdownDocumentProps = {
  markdown: string
  variant?: 'default' | 'guide'
}

export function MarkdownDocument({ markdown, variant = 'default' }: MarkdownDocumentProps) {
  const lines = markdown.trim().split(/\r?\n/)
  const blocks: ReactNode[] = []

  for (let index = 0; index < lines.length;) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line)

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
          <h2 key={`heading-${index}`} className={`${variant === 'guide' ? 'mt-12' : 'mt-8'} border-b border-border pb-2 text-xl font-bold text-foreground`}>
            {content}
          </h2>,
        )
      } else if (level === 3) {
        blocks.push(
          <h3 key={`heading-${index}`} className={`mt-8 ${variant === 'guide' ? 'text-lg' : 'text-base'} font-bold text-foreground`}>
            {content}
          </h3>,
        )
      } else {
        blocks.push(
          <h4 key={`heading-${index}`} className="mt-8 text-base font-bold text-foreground">
            {content}
          </h4>,
        )
      }

      index += 1
      continue
    }

    if (line === '---') {
      blocks.push(<hr key={`divider-${index}`} className="my-8 border-border" />)
      index += 1
      continue
    }

    const image = /^!\[([^\]]*)\]\((\S+?)(?:\s+["']width=(\d+)["'])?\)$/.exec(line)

    if (image) {
      if (!isSafeUrl(image[2])) {
        blocks.push(
          <p key={`unsafe-image-${index}`} className="mt-4 leading-8 text-foreground">
            {line}
          </p>,
        )
      } else {
        const style: CSSProperties | undefined = image[3] ? { width: `${image[3]}px` } : undefined

        blocks.push(
          <figure key={`image-${index}`} className="my-8 flex justify-center">
            <img className="h-auto max-w-full" src={image[2]} alt={image[1]} loading="lazy" style={style} />
          </figure>,
        )
      }

      index += 1
      continue
    }

    if (line.startsWith('![')) {
      blocks.push(
        <p key={`malformed-image-${index}`} className="mt-4 leading-8 text-foreground">
          {line}
        </p>,
      )
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

    if (line.startsWith('>')) {
      const startIndex = index
      const quoteLines: string[] = []

      while (index < lines.length && lines[index].startsWith('>')) {
        quoteLines.push(lines[index].replace(/^> ?/, ''))
        index += 1
      }

      blocks.push(
        <blockquote key={`quote-${startIndex}`} className="mt-8 rounded-r-2xl border-l-4 border-secondary bg-surface px-4 py-4">
          <MarkdownDocument markdown={quoteLines.join('\n')} variant={variant} />
        </blockquote>,
      )
      continue
    }

    const paragraphStart = index
    const paragraphLines: string[] = []

    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraphLines.push(lines[index])
      index += 1
    }

    blocks.push(
      <p key={`paragraph-${paragraphStart}`} className="mt-4 leading-8 text-foreground">
        {renderParagraphLines(paragraphLines)}
      </p>,
    )
  }

  return blocks
}
