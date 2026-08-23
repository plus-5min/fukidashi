import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GeneratorPage } from './GeneratorPage'

describe('GeneratorPage', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('デスクトップでは設定パネルを画面の利用可能な高さまで広げる', () => {
    vi.stubGlobal('location', { origin: 'https://fukidashi-css.com' })

    const html = renderToStaticMarkup(<GeneratorPage />)

    expect(html).toContain('flex min-h-0 flex-1 flex-col')
    expect(html).toContain('mx-auto flex min-h-0 w-full flex-1 p-8 max-lg:block')
    expect(html).toContain('max-w-7xl flex-1 items-stretch')
    expect(html).toContain('items-stretch')
    expect(html).toContain('relative min-h-0 w-full max-w-md shrink-0')
    expect(html).toContain('absolute inset-0 max-lg:static')
    expect(html).toContain('aria-label="ブルーのカラープリセット" aria-pressed="false"')
  })
})
