import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { Modal } from './Modal'

describe('Modal', () => {
  it('does not render while closed', () => {
    const html = renderToStaticMarkup(
      <Modal open={false} titleId="modal-title" onClose={() => undefined}>
        <h2 id="modal-title">Modal title</h2>
      </Modal>,
    )

    expect(html).toBe('')
  })

  it('renders the shared dialog layout while open', () => {
    const html = renderToStaticMarkup(
      <Modal open titleId="modal-title" onClose={() => undefined}>
        <h2 id="modal-title">Modal title</h2>
      </Modal>,
    )

    expect(html).toContain('role="dialog"')
    expect(html).toContain('aria-modal="true"')
    expect(html).toContain('aria-labelledby="modal-title"')
    expect(html).toContain('Modal title')
    expect(html).toContain('aria-label="閉じる"')
    expect(html).toContain('size-5')
    expect(html).toContain('motion-reduce:transition-none')
    expect(html).toContain('min-h-96')
    expect(html).toContain('max-h-160')
    expect(html).toContain('min-w-2xl')
    expect(html).toContain('max-w-3xl')
    expect(html).toContain('starting:opacity-0')
    expect(html).toContain('starting:translate-y-4')
  })

  it('fits content without an internal scrollbar on desktop when requested', () => {
    const html = renderToStaticMarkup(
      <Modal open titleId="modal-title" onClose={() => undefined} fitContentOnDesktop>
        <h2 id="modal-title">Modal title</h2>
      </Modal>,
    )

    expect(html).toContain('overflow-y-auto max-lg:overflow-hidden')
    expect(html).toContain('h-auto max-h-none max-lg:h-full max-lg:max-h-160')
    expect(html).toContain('flex-none overflow-visible max-lg:flex-1')
    expect(html).toContain('max-lg:overflow-x-hidden max-lg:overflow-y-auto')
  })
})
