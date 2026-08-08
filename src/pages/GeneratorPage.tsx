import { useMemo, useReducer, useState, type CSSProperties } from 'react'

import { CommentPreview } from '../features/generator/components/CommentPreview'
import { CreateModal } from '../features/generator/components/CreateModal'
import { GeneratorControls } from '../features/generator/components/GeneratorControls'
import { generateCss } from '../features/generator/generateCss'
import { defaultGeneratorConfig, generatorReducer } from '../features/generator/generatorConfig'
import type { PresetName } from '../features/generator/presets'

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
    <div className="h-full" style={colorVariables}>
      <div className="mx-auto h-full p-6 max-[768px]:px-3 max-[768px]:py-8">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-start justify-center gap-16 max-[1080px]:flex-col">
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
  )
}
