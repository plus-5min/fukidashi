import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { defaultGeneratorConfig, generatorReducer, type GeneratorConfig } from '../generatorConfig'
import { GeneratorControls } from './GeneratorControls'

function renderControls(config: GeneratorConfig): string {
  return renderToStaticMarkup(
    <GeneratorControls config={config} activePreset={null} dispatch={() => undefined} onPresetChange={() => undefined} onCreate={() => undefined} />,
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
})
