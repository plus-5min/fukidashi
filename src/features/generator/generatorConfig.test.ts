import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { generateCss } from './generateCss'
import { defaultGeneratorConfig, generatorReducer, primaryColorKeys } from './generatorConfig'

const youtubeStylesheet = readFileSync(new URL('../../../public/css/v1/youtube.css', import.meta.url), 'utf8')
const twitchStylesheet = readFileSync(new URL('../../../public/css/v1/twitch.css', import.meta.url), 'utf8')
const youtubeFukidashiStylesheet = readFileSync(new URL('../../../public/css/v1/youtube/fukidashi.css', import.meta.url), 'utf8')
const youtubeCardStylesheet = readFileSync(new URL('../../../public/css/v1/youtube/card.css', import.meta.url), 'utf8')
const youtubeNormalStylesheet = readFileSync(new URL('../../../public/css/v1/youtube/normal.css', import.meta.url), 'utf8')
const twitchCardStylesheet = readFileSync(new URL('../../../public/css/v1/twitch/card.css', import.meta.url), 'utf8')
const stylesheetOrigin = 'https://fukidashi-css.com'

function generateTestCss(config: Parameters<typeof generateCss>[0]): string {
  return generateCss(config, stylesheetOrigin)
}

describe('generatorReducer', () => {
  it('初回表示は吹き出し、アイコンあり、枠線なしにする', () => {
    expect(defaultGeneratorConfig.template).toBe('fukidashi')
    expect(defaultGeneratorConfig.showProfileImage).toBe(true)
    expect(defaultGeneratorConfig.showBorder).toBe(false)
    expect(defaultGeneratorConfig.colors['listener-name-bg']).toBe('#5997F2')
    expect(defaultGeneratorConfig.colors['listener-comment']).toBe('#5997F2')
    expect(defaultGeneratorConfig.colors['member-name-bg']).toBe('#FFB5D5')
    expect(defaultGeneratorConfig.colors['member-comment']).toBe('#FFB5D5')
    expect(defaultGeneratorConfig.colors['member-comment-border']).toBe('#FFB5D5')
  })

  it('指定した色だけを変更する', () => {
    const nextConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'colorChanged',
      key: 'listener-name-bg',
      value: '#fb83ab',
    })

    expect(nextConfig.colors['listener-name-bg']).toBe('#FB83AB')
    expect(defaultGeneratorConfig.colors['listener-name-bg']).toBe('#5997F2')
  })

  it('Primaryに対応する色だけを一括で変更する', () => {
    const nextConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'primaryColorChanged',
      value: '#fb83ab',
    })

    for (const key of primaryColorKeys) {
      expect(nextConfig.colors[key]).toBe('#FB83AB')
    }
    expect(nextConfig.colors['member-name-bg']).toBe('#FB83AB')
    expect(nextConfig.colors['member-comment']).toBe('#FB83AB')
    expect(nextConfig.colors['member-comment-border']).toBe('#FB83AB')
    expect(nextConfig.colors['member-name']).toBe('#FFFFFF')
    expect(nextConfig.colors['listener-comment-bg']).toBe('#FFFFFF')
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
  it('YouTube用の配信CSSと設定変数だけを生成する', () => {
    const css = generateTestCss(defaultGeneratorConfig)

    expect(css).toContain('@import url("https://fukidashi-css.com/css/v1/youtube/fukidashi.css");')
    expect(css).toContain(':root {')
    expect(css).not.toContain(':root {\n\n')
    expect(css).toContain('--listener-name-bg: #5997F2;')
    expect(css).toContain('--comment-border-width: 0;')
    expect(css).not.toContain('--animation-name:')
    expect(css).not.toContain('--auto-margin-inline:')
    expect(css).toContain('--profile-image-display: block;')
    expect(css).not.toContain('yt-live-chat-text-message-renderer')
  })

  it('指定されたoriginから配信CSSのURLを生成する', () => {
    const css = generateCss(defaultGeneratorConfig, 'http://localhost:5173')

    expect(css).toContain('@import url("http://localhost:5173/css/v1/youtube/fukidashi.css");')
    expect(css).not.toContain(stylesheetOrigin)
  })

  it('配信するYouTube CSSが現在の対象要素と外部の非表示CSSを維持する', () => {
    expect(youtubeStylesheet).toContain('https://plus-5min.github.io/live-chat-css/youtube/hide.css')
    expect(youtubeStylesheet).toContain('ytd-sponsorships-live-chat-gift-purchase-announcement-renderer #header')
    expect(youtubeStylesheet).toContain('#price-column.yt-live-chat-paid-sticker-renderer')
    expect(youtubeStylesheet).toContain(':has(#message.yt-live-chat-paid-message-renderer:empty)')
    expect(youtubeStylesheet).toContain('yt-live-chat-app {')
    expect(youtubeStylesheet).toContain('animation: var(--animation-name, popInLeft)')
    expect(youtubeStylesheet).toContain('var(--name-padding-inline, 0)')
    expect(youtubeStylesheet).toContain('var(--comment-padding-block, 0) var(--comment-padding-inline, 0)')
    expect(youtubeStylesheet).toContain('var(--comment-border-radius, var(--comment-radius, 0))')
    expect(youtubeStylesheet).toContain('display: var(--pointer-display, inline);')
    expect(youtubeStylesheet).toContain('var(--auto-margin-left, 0) var(--auto-margin-right, auto)')
    expect(youtubeStylesheet).toContain('var(--pointer-outer-left, -3px) var(--pointer-outer-right, auto)')
    expect(youtubeStylesheet).not.toContain('{{')
  })

  it('YouTubeの非表示処理を外部のhide.cssに任せる', () => {
    expect(youtubeStylesheet).not.toContain('#creator-heart-button.yt-live-chat-paid-message-renderer')
    expect(youtubeStylesheet).not.toContain('yt-live-chat-ticker-renderer')
    expect(youtubeStylesheet).not.toContain('yt-live-chat-message-input-renderer')
    expect(youtubeStylesheet).not.toContain('yt-live-chat-header-renderer {')
  })

  it('YouTubeのテンプレート設定を配信CSSへ分離する', () => {
    expect(youtubeFukidashiStylesheet).toContain("@import url('../youtube.css');")
    expect(youtubeFukidashiStylesheet).toContain('--name-padding-inline: 12px;')
    expect(youtubeFukidashiStylesheet).toContain('--comment-padding-block: 12px;')
    expect(youtubeFukidashiStylesheet).toContain('--comment-padding-inline: 20px;')
    expect(youtubeFukidashiStylesheet).toContain('--comment-radius: 30px;')
    expect(youtubeFukidashiStylesheet).toContain('--comment-border-width: 3px;')
    expect(youtubeFukidashiStylesheet).toContain('--pointer-display: block;')
    expect(youtubeFukidashiStylesheet).toContain('--pointer-inner-display: block;')
    expect(youtubeCardStylesheet).toContain('--pointer-display: none;')
    expect(youtubeNormalStylesheet).toContain('--comment-background: transparent;')
  })

  it('初回表示の枠線なしをCSSへ反映する', () => {
    const css = generateTestCss(defaultGeneratorConfig)

    expect(css).toContain('--comment-border-width: 0;')
    expect(css).toContain('--pointer-display: none;')
    expect(css).not.toContain('--pointer-inner-content:')
  })

  it('Twitch用の配信CSSと必要な色だけを生成する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'platformChanged',
      value: 'twitch',
    })
    const css = generateTestCss(config)

    expect(css).toContain('@import url("https://fukidashi-css.com/css/v1/twitch/fukidashi.css");')
    expect(css).toContain('--listener-comment-border: #5997F2;')
    expect(css).not.toContain('--member-name:')
    expect(css).not.toContain('.chat-line__message')
  })

  it('配信するTwitch CSSが現在の対象要素と外部の非表示CSSを維持する', () => {
    expect(twitchStylesheet).toContain('https://plus-5min.github.io/live-chat-css/twitch/hide.css')
    expect(twitchStylesheet).toContain('.chat-line__message')
    expect(twitchStylesheet).toContain('.chat-scrollable-area__message-container')
    expect(twitchStylesheet).toContain('overflow-wrap: anywhere;')
    expect(twitchStylesheet).toContain('animation: var(--animation-name, popInLeft)')
    expect(twitchStylesheet).toContain('var(--name-padding-inline, 0)')
    expect(twitchStylesheet).toContain('var(--comment-padding-block, 0) var(--comment-padding-inline, 0)')
    expect(twitchStylesheet).toContain('var(--comment-border-radius, var(--comment-radius, 0))')
    expect(twitchStylesheet).toContain('display: var(--pointer-display, inline);')
    expect(twitchStylesheet).toContain('var(--auto-margin-left, 0) var(--auto-margin-right, auto)')
    expect(twitchStylesheet).toContain('var(--pointer-outer-left, -3px) var(--pointer-outer-right, auto)')
    expect(twitchStylesheet).not.toContain('yt-live-chat-paid-message-renderer')
    expect(twitchStylesheet).not.toContain('{{')
    expect(twitchCardStylesheet).toContain("@import url('../twitch.css');")
  })

  it('Twitchの非表示処理を外部のhide.cssに任せる', () => {
    expect(twitchStylesheet).not.toContain('.simplebar-scrollbar')
    expect(twitchStylesheet).not.toContain('.chat-line__timestamp')
    expect(twitchStylesheet).not.toContain('.stream-chat-header')
    expect(twitchStylesheet).not.toContain('.community-highlight-stack')
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
    const css = generateTestCss(config)

    expect(css).not.toContain('--comment-background:')
    expect(css).toContain('@import url("https://fukidashi-css.com/css/v1/twitch/card.css");')
    expect(css).toContain('--comment-border-width: 0;')
    expect(css).not.toContain('--pointer-content:')
    expect(css).not.toContain('--pointer-inner-content:')
  })

  it('card用CSSを生成する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'card',
    })
    const css = generateTestCss(config)

    expect(css).not.toContain('--comment-background:')
    expect(css).toContain('@import url("https://fukidashi-css.com/css/v1/youtube/card.css");')
    expect(css).not.toContain('--comment-border-radius:')
    expect(css).not.toContain('--comment-padding:')
    expect(css).toContain('--comment-border-width: 0;')
    expect(css).not.toContain('--pointer-content:')
    expect(css).not.toContain('--pointer-inner-content:')
  })

  it('normal用CSSを生成する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'normal',
    })
    const css = generateTestCss(config)

    expect(css).toContain('@import url("https://fukidashi-css.com/css/v1/youtube/normal.css");')
    expect(css).not.toContain('--comment-background:')
    expect(css).toContain('--listener-name: #5997F2;')
    expect(css).toContain('--listener-name-bg: transparent;')
    expect(css).toContain('--listener-comment: #5997F2;')
    expect(css).toContain('--member-name: #FFB5D5;')
    expect(css).toContain('--member-name-bg: transparent;')
    expect(css).toContain('--member-comment: #FFB5D5;')
    expect(css).not.toContain('--listener-comment-bg:')
    expect(css).not.toContain('--listener-comment-border:')
    expect(css).not.toContain('--member-comment-bg:')
    expect(css).not.toContain('--member-comment-border:')
    expect(css).not.toContain('--animation-name:')
    expect(css).not.toContain('--name-display:')
    expect(css).not.toContain('--name-padding:')
    expect(css).not.toContain('--comment-border-radius:')
    expect(css).not.toContain('--comment-padding:')
    expect(css).not.toContain('--comment-border-width:')
    expect(css).not.toContain('--pointer-content:')
    expect(css).not.toContain('--pointer-inner-content:')
    expect(css).not.toContain('--auto-margin-inline:')
    expect(css).not.toContain('--message-flex-direction:')
    expect(css).not.toContain('--message-justify-content:')
    expect(css).toContain('--profile-image-display: block;')
  })

  it('Twitchのnormalではコメント文字色だけを生成する', () => {
    const twitchConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'platformChanged',
      value: 'twitch',
    })
    const config = generatorReducer(twitchConfig, {
      type: 'templateChanged',
      value: 'normal',
    })
    const css = generateTestCss(config)

    expect(css).toContain('@import url("https://fukidashi-css.com/css/v1/twitch/normal.css");')
    expect(css).toContain('--listener-name: #5997F2;')
    expect(css).toContain('--listener-name-bg: transparent;')
    expect(css).toContain('--listener-comment: #5997F2;')
    expect(css).not.toContain('--listener-comment-bg:')
    expect(css).not.toContain('--listener-comment-border:')
  })

  it('右寄せ用の変数を生成する', () => {
    const borderedConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'visibilityChanged',
      key: 'showBorder',
      value: true,
    })
    const config = generatorReducer(borderedConfig, {
      type: 'directionChanged',
      value: 'right',
    })
    const css = generateTestCss(config)

    expect(css).toContain('--animation-name: popInRight;')
    expect(css).toContain('--auto-margin-inline: auto 0;')
    expect(css).toContain('--message-flex-direction: row-reverse;')
    expect(css).toContain('--message-justify-content: end;')
    expect(css).toContain('--pointer-outer-inset-inline: auto -3px;')
    expect(css).toContain('--pointer-inner-inset-inline: auto 1px;')
  })

  it('名前とアイコンの非表示をCSSへ反映する', () => {
    const hiddenNameConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'visibilityChanged',
      key: 'showName',
      value: false,
    })
    const config = generatorReducer(hiddenNameConfig, {
      type: 'visibilityChanged',
      key: 'showProfileImage',
      value: false,
    })
    const css = generateTestCss(config)

    expect(css).toContain('--name-display: none;')
    expect(css).not.toContain('--profile-image-display:')
  })
})
