import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { defaultGeneratorConfig, generatorReducer, type GeneratorConfig } from '../generatorConfig'
import { colorPresets, type PresetName } from '../presets'
import { GeneratorControls } from './GeneratorControls'

function renderControls(config: GeneratorConfig, activePreset: PresetName | null = null): string {
  return renderToStaticMarkup(
    <GeneratorControls config={config} activePreset={activePreset} dispatch={() => undefined} onPresetChange={() => undefined} onCreate={() => undefined} />,
  )
}

describe('GeneratorControls', () => {
  it('メイン見出しをxl、表示設定ラベルをbaseサイズで表示する', () => {
    const html = renderControls(defaultGeneratorConfig)

    expect(html.match(/gap-2 text-xl font-semibold/g)).toHaveLength(4)
    expect(html).toContain('id="visibility-showProfileImage-label"')
    expect(html).toContain('cursor-pointer text-base font-medium')
  })

  it('カラープリセットのmessage文字色を選択色へ揃える', () => {
    expect(Object.values(colorPresets).map((colors) => colors['listener-name-bg'])).toEqual([
      '#FFA3CB',
      '#A3E9DD',
      '#A3B2FF',
      '#FDC2B3',
      '#A2CEFF',
      '#D2D890',
      '#C5C4CC',
    ])

    for (const colors of Object.values(colorPresets)) {
      expect(colors['listener-comment']).toBe(colors['listener-name-bg'])
      expect(colors['member-comment']).toBe(colors['member-name-bg'])
      expect(colors['member-name-bg']).toBe(colors['listener-name-bg'])
      expect(colors['superchat-name-bg']).toBe(colors['listener-name-bg'])
      expect(colors['superchat-comment-bg']).toBe(colors['listener-name-bg'])
      expect(colors['membership-name-bg']).toBe(colors['listener-name-bg'])
      expect(colors['membership-comment-bg']).toBe(colors['listener-name-bg'])
    }

    expect(colorPresets.yellow['listener-name']).toBe('#FFFFFF')
    expect(colorPresets.yellow['member-name']).toBe('#FFFFFF')
    expect(colorPresets.yellow['superchat-name']).toBe('#FFFFFF')
    expect(colorPresets.yellow['superchat-comment']).toBe('#FFFFFF')
    expect(colorPresets.yellow['membership-name']).toBe('#FFFFFF')
    expect(colorPresets.yellow['membership-comment']).toBe('#FFFFFF')
  })

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

  it('未選択のTemplateカードには枠線を表示しない', () => {
    const html = renderControls(defaultGeneratorConfig)

    expect(html).toContain('rounded-2xl border-0 border-primary bg-surface-raised')
    expect(html).toContain('peer-checked:border-3 peer-checked:text-primary')
    expect(html).not.toContain('border-2 border-border bg-surface-raised')
  })

  it('選択中のプリセットと実際に適用される色を公開する', () => {
    const html = renderControls(defaultGeneratorConfig, 'purple')

    expect(html).toContain('aria-label="パープルのカラープリセット" aria-pressed="true"')
    expect(html).toContain('style="background-color:#A3B2FF"')
    expect(html).toContain('aria-label="ミントのカラープリセット" aria-pressed="false"')
    expect(html).toContain('aria-label="グレーのカラープリセット" aria-pressed="false"')
    expect(html).toContain('style="background-color:#C5C4CC"')
  })

  it('プリセットの下にPrimary一括変更用のカラーピッカーを表示する', () => {
    const html = renderControls(defaultGeneratorConfig)

    expect(html).not.toContain('id="primary-color-label"')
    expect(html).toContain('id="primary-color-picker"')
    expect(html).toContain('aria-label="メインカラーを一括変更"')
    expect(html).toContain('value="#5997F2"')
  })

  it('詳細カラー設定をCustomとして表示する', () => {
    const html = renderControls(defaultGeneratorConfig)

    expect(html).toContain('>Custom</span>')
    expect(html).not.toContain('>Details</span>')
    expect(html).toContain('bg-transparent p-4 text-left')
    expect(html).toContain('hover:bg-surface-raised')
  })

  it('Createボタンをhover時にSecondary背景と黒い内容で表示する', () => {
    const html = renderControls(defaultGeneratorConfig)

    expect(html).toContain('hover:bg-secondary hover:text-on-primary')
    expect(html).toContain('group-hover:text-on-primary')
    expect(html).toContain('max-lg:hover:bg-action-surface max-lg:hover:text-foreground')
  })
})
