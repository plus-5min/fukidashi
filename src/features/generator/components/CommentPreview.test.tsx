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

    expect(html).not.toContain('bg-(--listener-name-bg)')
    expect(html).not.toContain('bg-(--member-name-bg)')
    expect(html).not.toContain('text-(--listener-name)')
    expect(html).not.toContain('text-(--member-name)')
    expect(html).toContain('text-(--listener-comment)')
    expect(html).toContain('text-(--member-comment)')
    expect(html).toContain('px-0')
  })

  it('fukidashiでは通常コメントの名前背景を表示する', () => {
    const html = renderToStaticMarkup(<CommentPreview config={defaultGeneratorConfig} />)

    expect(html).toContain('relative z-0 rounded-4xl bg-background')
    expect(html).toContain('bg-(--listener-name-bg)')
    expect(html).toContain('bg-(--member-name-bg)')
    expect(html).toContain('text-(--listener-name)')
    expect(html).toContain('text-(--member-name)')
    expect(html).toContain('px-3')
    expect(html).toContain('src="/image/icon.jpg"')
    expect(html).toContain('min-w-6 block')
    expect(html).toContain('border-0')
  })

  it('プラットフォームを切り替えてもプレビューと設定パネルの高さを維持する', () => {
    const twitchConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'platformChanged',
      value: 'twitch',
    })
    const youtubeHtml = renderToStaticMarkup(<CommentPreview config={defaultGeneratorConfig} />)
    const twitchHtml = renderToStaticMarkup(<CommentPreview config={twitchConfig} />)

    expect(youtubeHtml).toContain('col-start-1 row-start-1 grid gap-6')
    expect(youtubeHtml).toContain('col-start-1 row-start-1 grid content-start invisible')
    expect(twitchHtml).toContain('col-start-1 row-start-1 grid gap-6 invisible')
    expect(twitchHtml).toContain('col-start-1 row-start-1 grid content-start')
  })
})
