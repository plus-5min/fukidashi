import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CreateModal } from './CreateModal'

describe('CreateModal', () => {
  it('labels the CSS editor and exposes copy feedback to assistive technology', () => {
    const html = renderToStaticMarkup(<CreateModal open css="body {}" onCssChange={() => undefined} onClose={() => undefined} />)

    expect(html).toContain('for="custom-css"')
    expect(html).toContain('生成されたCSS')
    expect(html).toContain('font-mono')
    expect(html).toContain('app-scrollbar relative min-h-48')
    expect(html).toContain('aria-label="CSSをコピー"')
    expect(html).toContain('role="status"')
    expect(html).toContain('aria-live="polite"')
  })
})
