import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { TermsPage } from './TermsPage'

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
})
