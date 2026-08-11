import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { PageMetadata } from './PageMetadata'

describe('PageMetadata', () => {
  it('renders page-specific metadata', () => {
    const html = renderToStaticMarkup(
      <PageMetadata title="利用規約 | fukidashi" description="利用規約です。" path="/terms" keywords={['利用規約', 'fukidashi']} />,
    )

    expect(html).toContain('<title>利用規約 | fukidashi</title>')
    expect(html).toContain('name="description" content="利用規約です。"')
    expect(html).toContain('rel="canonical" href="https://fukidashi-css.com/terms"')
    expect(html).toContain('property="og:site_name" content="fukidashi"')
    expect(html).toContain('name="twitter:creator" content="@asahinapipi_5m"')
    expect(html).toContain('name="keywords" content="利用規約,fukidashi"')
  })

  it('can prevent indexing without publishing a canonical URL', () => {
    const html = renderToStaticMarkup(<PageMetadata title="404 | fukidashi" description="ページが見つかりません。" noIndex />)

    expect(html).toContain('name="robots" content="noindex"')
    expect(html).not.toContain('rel="canonical"')
    expect(html).not.toContain('property="og:url"')
  })
})
