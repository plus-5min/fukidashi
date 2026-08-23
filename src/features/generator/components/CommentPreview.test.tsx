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
    expect(html).toContain('flex gap-2 font-sans')
    expect(html).toContain('min-w-6 block')
    expect(html).toContain('class="block size-6 rounded-full object-cover"')
    expect(html).toContain('height="24" width="24"')
    expect(html).toContain('rounded-[18px] py-0 text-base px-0')
    expect(html).toContain('flex items-center gap-2 justify-start')
    expect(html).not.toContain('min-h-6')
    expect(html).not.toContain('col-span-full')
  })

  it('cardでは通常コメントの角丸を20pxにする', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'card',
    })
    const html = renderToStaticMarkup(<CommentPreview config={config} />)

    expect(html).toContain('flex gap-2 font-sans')
    expect(html).toContain('min-w-9 block')
    expect(html).not.toContain('class="contents"')
    expect(html).toContain('rounded-[20px] px-6 py-4 text-left')
  })

  it('fukidashiでは通常コメントの名前背景を表示する', () => {
    const html = renderToStaticMarkup(<CommentPreview config={defaultGeneratorConfig} />)

    expect(html).toContain('relative z-0 rounded-4xl')
    expect(html).toContain('flex gap-2 font-sans')
    expect(html).toContain('bg-background')
    expect(html).toContain('bg-(--listener-name-bg)')
    expect(html).toContain('bg-(--member-name-bg)')
    expect(html).toContain('text-(--listener-name)')
    expect(html).toContain('text-(--member-name)')
    expect(html).toContain('px-3')
    expect(html).toContain('src="/image/icon.jpg"')
    expect(html).toContain('min-w-9 block')
    expect(html).toContain('class="block size-9 rounded-full object-cover"')
    expect(html).toContain('height="36" width="36"')
    expect(html).toContain('flex items-center gap-2 justify-start')
    expect(html).not.toContain('min-h-9')
    expect(html).toContain('flex items-center justify-between rounded-t-[20px] bg-(--superchat-name-bg) px-6 py-4')
    expect(html).toContain('rounded-b-[20px] bg-(--superchat-comment-bg) px-6 py-4')
    expect(html).toContain('font-inter rounded-full bg-(--superchat-name) px-3 py-2 text-xs leading-none text-(--superchat-name-bg)')
    expect(html).toContain('rounded-t-[20px] bg-(--membership-name-bg) px-6')
    expect(html).toContain('rounded-b-[20px] bg-(--membership-comment-bg) px-6 py-4')
    expect(html.match(/font-sans text-base leading-6 font-medium not-italic/g)).toHaveLength(6)
    expect(html).not.toContain('font-bold')
    expect(html).toContain('tracking-[0.5px]')
    expect(html).not.toContain('tracking-wide')
    expect(html).toContain('rounded-[30px]')
    expect(html).toContain('rounded-[18px]')
    expect(html).toContain('left-[-3px] [transform:rotate(-20deg)_skew(20deg,20deg)]')
    expect(html).toContain('h-[21px] w-[21px] rounded-tl-[7px] rounded-br-[6px]')
    expect(html).toContain('top-[7px] z-0 block size-[18px] rounded-tl-sm rounded-br-[20px]')
    expect(html).toContain('border-0')
  })

  it('右寄せでも吹き出しポインターを生成CSSと同じ位置と変形で表示する', () => {
    const rightConfig = generatorReducer(defaultGeneratorConfig, {
      type: 'directionChanged',
      value: 'right',
    })
    const html = renderToStaticMarkup(<CommentPreview config={rightConfig} />)

    expect(html).toContain('right-[-3px] [transform:rotate(-70deg)_skew(20deg,20deg)]')
    expect(html).toContain('right-px [transform:rotate(110deg)_skew(20deg,20deg)]')
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
