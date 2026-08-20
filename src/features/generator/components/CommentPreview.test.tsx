import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { defaultGeneratorConfig, generatorReducer } from '../generatorConfig'
import { CommentPreview } from './CommentPreview'

describe('CommentPreview', () => {
  it('normalでは通常コメントの名前背景を表示しない', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'normal',
    })
    const html = renderToStaticMarkup(<CommentPreview config={config} />)

    expect(html).not.toContain('bg-[var(--listener-name-bg)]')
    expect(html).not.toContain('bg-[var(--member-name-bg)]')
    expect(html).not.toContain('text-[var(--listener-name)]')
    expect(html).not.toContain('text-[var(--member-name)]')
    expect(html).toContain('text-[var(--listener-comment)]')
    expect(html).toContain('text-[var(--member-comment)]')
    expect(html).toContain('px-0')
  })

  it('fukidashiでは通常コメントの名前背景を表示する', () => {
    const html = renderToStaticMarkup(<CommentPreview config={defaultGeneratorConfig} />)

    expect(html).toContain('relative z-0 rounded-4xl bg-secondary')
    expect(html).toContain('bg-[var(--listener-name-bg)]')
    expect(html).toContain('bg-[var(--member-name-bg)]')
    expect(html).toContain('text-[var(--listener-name)]')
    expect(html).toContain('text-[var(--member-name)]')
    expect(html).toContain('px-3')
  })

  it('プラットフォームを切り替えてもプレビューと設定パネルの高さを維持する', () => {
    const twitchConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'platformChanged',
      value: 'twitch',
    })
    const youtubeHtml = renderToStaticMarkup(<CommentPreview config={defaultGeneratorConfig} />)
    const twitchHtml = renderToStaticMarkup(<CommentPreview config={twitchConfig} />)

    expect(youtubeHtml).toContain('col-start-1 row-start-1 grid gap-3')
    expect(youtubeHtml).toContain('col-start-1 row-start-1 grid content-start invisible')
    expect(twitchHtml).toContain('col-start-1 row-start-1 grid gap-3 invisible')
    expect(twitchHtml).toContain('col-start-1 row-start-1 grid content-start')
  })
})
