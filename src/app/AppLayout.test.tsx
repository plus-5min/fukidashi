import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'

import { AppLayout } from './AppLayout'

function renderLayout(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route Component={AppLayout}>
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
    ['generator page', '/', 'Generator page'],
    ['terms page', '/terms', 'Terms page'],
    ['not found page', '/missing', 'Not found page'],
  ])('shows the site header and footer on the %s', (_, path, pageContent) => {
    const html = renderLayout(path)

    expect(html).toContain('<header')
    expect(html).toContain('<main class="min-h-0 flex-1 overflow-y-auto">')
    expect(html).toContain(pageContent)
    expect(html).toContain('<footer')
    expect(html).toContain('href="/terms"')
  })
})
