import { useMemo, useReducer, useState, type CSSProperties } from 'react'

import { PageMetadata, type PageMetadataProps } from '../app/components/PageMetadata'
import { CommentPreview } from '../features/generator/components/CommentPreview'
import { CreateModal } from '../features/generator/components/CreateModal'
import { GeneratorControls } from '../features/generator/components/GeneratorControls'
import { generateCss } from '../features/generator/generateCss'
import { defaultGeneratorConfig, generatorReducer } from '../features/generator/generatorConfig'
import type { PresetName } from '../features/generator/presets'

const metadata = {
  title: 'fukidashi | YouTube・TwitchコメントCSSジェネレーター',
  description: 'YouTube・Twitchの配信コメントを、カラーやレイアウト、テンプレートを組み合わせてカスタマイズできるCSSジェネレーターです。',
  path: '/',
  keywords: ['YouTube', 'Twitch', 'コメントCSS', 'カスタムCSS', '配信', 'ライブ配信', 'チャット', '吹き出し', 'fukidashi'],
} satisfies PageMetadataProps

export function GeneratorPage() {
  const [config, dispatch] = useReducer(generatorReducer, defaultGeneratorConfig)
  const [activePreset, setActivePreset] = useState<PresetName | null>('blue')
  const [createOpen, setCreateOpen] = useState(false)
  const [editableCss, setEditableCss] = useState('')
  const generatedCss = useMemo(() => generateCss(config), [config])

  const colorVariables = useMemo(
    () => Object.fromEntries(Object.entries(config.colors).map(([key, value]) => [`--${key}`, value])) as CSSProperties,
    [config.colors],
  )

  return (
    <>
      <PageMetadata {...metadata} />
      <div className="h-full max-md:h-auto" style={colorVariables}>
        <div className="mx-auto h-full p-6 max-md:h-auto max-md:p-4">
          <div className="mx-auto flex h-full w-full max-w-7xl items-start justify-center gap-16 max-md:h-auto max-md:flex-col">
            <CommentPreview config={config} />
            <GeneratorControls
              config={config}
              activePreset={activePreset}
              dispatch={dispatch}
              onPresetChange={setActivePreset}
              onCreate={() => {
                setEditableCss(generatedCss)
                setCreateOpen(true)
              }}
            />
          </div>
          <CreateModal open={createOpen} css={editableCss} onCssChange={setEditableCss} onClose={() => setCreateOpen(false)} />
        </div>
      </div>
    </>
  )
}
