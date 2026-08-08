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
  })
})
