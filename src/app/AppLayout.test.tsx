import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'

import { AppLayout, GeneratorLayout } from './AppLayout'

function renderLayout(path: string, Layout = AppLayout) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route Component={Layout}>
          <Route index element={<div>Generator page</div>} />
          <Route path="terms" element={<div>Terms page</div>} />
          <Route path="*" element={<div>Not found page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('AppLayout', () => {
  it.each([
    ['generator page', GeneratorLayout, '/', 'Generator page'],
    ['terms page', AppLayout, '/terms', 'Terms page'],
    ['not found page', AppLayout, '/missing', 'Not found page'],
  ])('shows the site header and footer on the %s', (_, Layout, path, pageContent) => {
    const html = renderLayout(path, Layout)

    expect(html).toContain('<header')
    expect(html).toContain('<main class="flex min-h-0 flex-1 flex-col">')
    expect(html).toContain(pageContent)
    expect(html).toContain('<footer')
    expect(html).toContain('href="/terms"')
    expect(html).toContain('href="https://x.com/asahinapipi_5m"')
    expect(html).toContain('aria-label="アサヒナピピのXを開く"')
  })

  it('keeps the footer at the bottom without constraining the generator to the viewport', () => {
    const generatorHtml = renderLayout('/', GeneratorLayout)
    const termsHtml = renderLayout('/terms')

    expect(generatorHtml).toContain('min-h-dvh')
    expect(generatorHtml).not.toContain('class="flex h-dvh')
    expect(termsHtml).toContain('min-h-dvh')
  })
})
