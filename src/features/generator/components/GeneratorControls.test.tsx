import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { defaultGeneratorConfig, generatorReducer, type GeneratorConfig } from '../generatorConfig'
import type { PresetName } from '../presets'
import { GeneratorControls } from './GeneratorControls'

function renderControls(config: GeneratorConfig, activePreset: PresetName | null = null): string {
  return renderToStaticMarkup(
    <GeneratorControls config={config} activePreset={activePreset} dispatch={() => undefined} onPresetChange={() => undefined} onCreate={() => undefined} />,
  )
}

describe('GeneratorControls', () => {
  it('normalでは通常コメントの名前背景設定を表示しない', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'normal',
    })
    const html = renderControls(config)

    expect(html).not.toContain('id="listener-name-picker"')
    expect(html).not.toContain('id="listener-name-bg-picker"')
    expect(html).not.toContain('id="listener-comment-bg-picker"')
    expect(html).not.toContain('id="member-name-picker"')
    expect(html).not.toContain('id="member-name-bg-picker"')
    expect(html).not.toContain('id="member-comment-bg-picker"')
    expect(html).toContain('id="superchat-name-bg-picker"')
    expect(html).toContain('id="membership-name-bg-picker"')
  })

  it('cardでは通常コメントの名前背景設定を表示する', () => {
    const config = generatorReducer(defaultGeneratorConfig, {
      type: 'templateChanged',
      value: 'card',
    })
    const html = renderControls(config)

    expect(html).toContain('id="listener-name-picker"')
    expect(html).toContain('id="listener-name-bg-picker"')
    expect(html).toContain('id="listener-comment-bg-picker"')
    expect(html).toContain('id="member-name-picker"')
    expect(html).toContain('id="member-name-bg-picker"')
    expect(html).toContain('id="member-comment-bg-picker"')
  })

  it('選択中のプリセットと実際に適用される色を公開する', () => {
    const html = renderControls(defaultGeneratorConfig, 'purple')

    expect(html).toContain('aria-label="パープルのカラープリセット" aria-pressed="true"')
    expect(html).toContain('style="background-color:#B77CEB"')
    expect(html).toContain('aria-label="ブルーのカラープリセット" aria-pressed="false"')
  })
})
