import { useMemo, useReducer, useState, type CSSProperties } from 'react'

import { CommentPreview } from '../features/generator/components/CommentPreview'
import { CreateModal } from '../features/generator/components/CreateModal'
import { GeneratorControls } from '../features/generator/components/GeneratorControls'
import { generateCss } from '../features/generator/generateCss'
import { defaultGeneratorConfig, generatorReducer } from '../features/generator/generatorConfig'
import type { PresetName } from '../features/generator/presets'
import { useModalScrollLock } from '../hooks/useModalScrollLock'

export function GeneratorPage() {
  const [config, dispatch] = useReducer(generatorReducer, defaultGeneratorConfig)
  const [activePreset, setActivePreset] = useState<PresetName | null>('blue')
  const [createOpen, setCreateOpen] = useState(false)
  const [editableCss, setEditableCss] = useState('')
  const generatedCss = useMemo(() => generateCss(config), [config])

  useModalScrollLock(createOpen)

  const colorVariables = useMemo(
    () => Object.fromEntries(Object.entries(config.colors).map(([key, value]) => [`--${key}`, value])) as CSSProperties,
    [config.colors],
  )

  return (
    <div style={colorVariables}>
      <main className="l-main">
        <div className="main-inner">
          <div className="main-column">
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
      </main>
    </div>
  )
}
