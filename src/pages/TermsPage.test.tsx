import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { MarkdownDocument, TermsPage } from './TermsPage'

describe('TermsPage', () => {
  it('renders the terms markdown as structured HTML', () => {
    const html = renderToStaticMarkup(<TermsPage />)

    expect(html).toContain('<h1')
    expect(html).toContain('ガイドライン・利用規約')
    expect(html).toContain('<h2')
    expect(html).toContain('用語の定義')
    expect(html).toContain('<strong')
    expect(html).toContain('本サービス')
    expect(html).toContain('<ul')
    expect(html).toContain('生成CSSの再配布、販売、譲渡、再頒布')
  })

  it('escapes raw HTML and does not activate unsafe Markdown URLs', () => {
    const maliciousMarkdown = [
      '# <script>alert("xss")</script>',
      '',
      '- <img src=x onerror="alert(1)">',
      '- **<svg onload="alert(1)">**',
      '',
      '[unsafe link](javascript:alert(1))',
      '',
      '![unsafe image](data:image/svg+xml,<svg onload="alert(1)">)',
      '',
      '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
      '',
      '<style>body { display: none }</style>',
    ].join('\n')

    const html = renderToStaticMarkup(<MarkdownDocument markdown={maliciousMarkdown} />)
    const renderedTags = html.match(/<[^>]+>/g) ?? []

    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('javascript:alert(1)')
    expect(html).not.toMatch(/<(?:script|img|svg|iframe|style|a)(?:\s|>)/i)
    expect(renderedTags.join('')).not.toMatch(/\s(?:href|src|srcdoc|on\w+)=/i)
  })

  it('renders malformed Markdown as text without throwing', () => {
    const malformedMarkdown = `# ${'*'.repeat(10_000)}<script>`

    expect(() => renderToStaticMarkup(<MarkdownDocument markdown={malformedMarkdown} />)).not.toThrow()
  })
})
