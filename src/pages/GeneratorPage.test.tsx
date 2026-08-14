import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GeneratorPage } from './GeneratorPage'

describe('GeneratorPage', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('デスクトップでは設定パネルの高さをプレビューに合わせる', () => {
    vi.stubGlobal('location', { origin: 'https://fukidashi-css.com' })

    const html = renderToStaticMarkup(<GeneratorPage />)

    expect(html).toContain('items-stretch')
    expect(html).toContain('relative min-h-0 w-full max-w-md shrink-0')
    expect(html).toContain('absolute inset-0 max-lg:static')
  })
})
