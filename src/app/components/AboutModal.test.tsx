import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { AboutModal } from './AboutModal'

describe('AboutModal', () => {
  it('Creatorリンクのhoverで枠線と背景をSecondaryへ変更する', () => {
    const html = renderToStaticMarkup(<AboutModal open onClose={() => undefined} />)

    expect(html).toContain('hover:border-secondary hover:bg-secondary hover:text-on-primary')
    expect(html).toContain('group-hover:invert-0')
    expect(html).toContain('max-lg:hover:border-border max-lg:hover:bg-transparent max-lg:hover:text-foreground')
    expect(html).toContain('max-lg:group-hover:invert')
  })

  it('noteは公式の白黒アイコンをhoverで切り替える', () => {
    const html = renderToStaticMarkup(<AboutModal open onClose={() => undefined} />)

    expect(html).toContain('class="size-5 relative inline-block shrink-0"')
    expect(html).toContain('class="absolute inset-0 size-full object-contain group-hover:hidden max-lg:group-hover:block" src="/assets/note-logo.svg"')
    expect(html).toContain(
      'class="absolute inset-0 hidden size-full object-contain group-hover:block max-lg:group-hover:hidden" src="/assets/note-logo-black.svg"',
    )
    expect(html).not.toContain('brightness-0 invert" src="/assets/note-logo.svg"')
  })
})
