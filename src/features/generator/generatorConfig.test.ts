import { describe, expect, it } from 'vitest'

import { generateCss } from './generateCss'
import { defaultGeneratorConfig, generatorReducer } from './generatorConfig'

describe('generatorReducer', () => {
  it('指定した色だけを変更する', () => {
    const nextConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'colorChanged',
      key: 'listener-name-bg',
      value: '#fb83ab',
    })

    expect(nextConfig.colors['listener-name-bg']).toBe('#FB83AB')
    expect(defaultGeneratorConfig.colors['listener-name-bg']).toBe('#8CCCE3')
  })

  it('コメントテンプレートを変更する', () => {
    const nextConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'card',
    })

    expect(nextConfig.template).toBe('card')
  })
})

describe('generateCss', () => {
  it('YouTube用CSSの全プレースホルダーを置換する', () => {
    const css = generateCss(defaultGeneratorConfig)

    expect(css).toContain('--listener-name-bg: #8CCCE3;')
    expect(css).toContain('@import url("https://plus-5min.github.io/live-chat-css/youtube/hide.css");')
    expect(css).toContain('animation: popInLeft 0.3s ease-out forwards;')
    expect(css).toContain('--chat-comment-border-style: 3px solid var(--listener-comment-border);')
    expect(css).not.toContain('{{')
  })

  it('現在のレイアウトを維持したまま新しいYouTube要素を対象にする', () => {
    const css = generateCss(defaultGeneratorConfig)

    expect(css).toContain('border-radius: 30px;')
    expect(css).toContain('padding: 12px 20px;')
    expect(css).toContain('ytd-sponsorships-live-chat-gift-purchase-announcement-renderer #header')
    expect(css).toContain('#price-column.yt-live-chat-paid-sticker-renderer')
    expect(css).toContain(':has(#message.yt-live-chat-paid-message-renderer:empty)')
    expect(css).toContain('yt-live-chat-app {')
  })

  it('非表示処理を外部のhide.cssに任せる', () => {
    const css = generateCss(defaultGeneratorConfig)

    expect(css).toContain('@import url("https://plus-5min.github.io/live-chat-css/youtube/hide.css");')
    expect(css).not.toContain('#creator-heart-button.yt-live-chat-paid-message-renderer')
    expect(css).not.toContain('yt-live-chat-ticker-renderer')
    expect(css).not.toContain('yt-live-chat-message-input-renderer')
    expect(css).not.toContain('yt-live-chat-header-renderer {')
  })

  it('枠線なしをCSSへ反映する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'visibilityChanged',
      key: 'showBorder',
      value: false,
    })
    const css = generateCss(config)

    expect(css).toContain('--chat-comment-border-style: none;')
    expect(css).toContain('content: none;')
  })

  it('Twitch用CSSを生成する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'platformChanged',
      value: 'twitch',
    })
    const css = generateCss(config)

    expect(css).toContain('.chat-line__message')
    expect(css).toContain('@import url("https://plus-5min.github.io/live-chat-css/twitch/hide.css");')
    expect(css).toContain('.chat-scrollable-area__message-container')
    expect(css).toContain('overflow-wrap: anywhere;')
    expect(css).toContain('--chat-comment-rendered-bg: var(--listener-comment-bg);')
    expect(css).toContain('--chat-comment-border-style: 3px solid var(--listener-comment-border);')
    expect(css).not.toContain('yt-live-chat-paid-message-renderer')
    expect(css).not.toContain('{{')
  })

  it('Twitchの非表示処理を外部のhide.cssに任せる', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'platformChanged',
      value: 'twitch',
    })
    const css = generateCss(config)

    expect(css).toContain('@import url("https://plus-5min.github.io/live-chat-css/twitch/hide.css");')
    expect(css).not.toContain('.simplebar-scrollbar')
    expect(css).not.toContain('.chat-line__timestamp')
    expect(css).not.toContain('.stream-chat-header')
    expect(css).not.toContain('.community-highlight-stack')
  })

  it('Twitchのcard用CSSを生成する', () => {
    const twitchConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'platformChanged',
      value: 'twitch',
    })
    const config = generatorReducer(twitchConfig, {
      type: 'templateChanged',
      value: 'card',
    })
    const css = generateCss(config)

    expect(css).toContain('--chat-comment-rendered-bg: var(--listener-comment-bg);')
    expect(css).toContain('--chat-comment-border-style: 3px solid var(--listener-comment-border);')
    expect(css).toContain('content: none;')
    expect(css).not.toContain('{{')
  })

  it('card用CSSを生成する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'card',
    })
    const css = generateCss(config)

    expect(css).toContain('--chat-comment-rendered-bg: var(--listener-comment-bg);')
    expect(css).toContain('border-radius: 30px;')
    expect(css).toContain('padding: 12px 20px;')
    expect(css).toContain('--chat-comment-border-style: 3px solid var(--listener-comment-border);')
    expect(css).toContain('content: none;')
    expect(css).not.toContain('{{')
  })

  it('normal用CSSを生成する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'normal',
    })
    const css = generateCss(config)

    expect(css).toContain('--chat-comment-rendered-bg: transparent;')
    expect(css).toContain('border-radius: 0;')
    expect(css).toContain('padding: 0;')
    expect(css).toContain('--chat-comment-border-style: none;')
    expect(css).toContain('content: none;')
    expect(css).not.toContain('{{')
  })
})
