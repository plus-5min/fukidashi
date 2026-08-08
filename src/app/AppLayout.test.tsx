import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'

import { AppLayout } from './AppLayout'

function renderLayout(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route Component={AppLayout}>
          <Route index element={<main>Generator page</main>} />
          <Route path="*" element={<main>Not found page</main>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('AppLayout', () => {
  it.each([
    ['generator page', '/', 'Generator page'],
    ['not found page', '/missing', 'Not found page'],
  ])('shows the site header and footer on the %s', (_, path, pageContent) => {
    const html = renderLayout(path)

    expect(html).toContain('<header>')
    expect(html).toContain(pageContent)
    expect(html).toContain('<footer>')
  })
})
