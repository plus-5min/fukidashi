import { useMemo, useReducer, useState, type CSSProperties } from 'react'

import { PageMetadata } from '../app/components/PageMetadata'
import { pageMetadata } from '../app/pageMetadata'
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
  const generatedCss = useMemo(() => generateCss(config, location.origin), [config])

  const colorVariables = useMemo(
    () => Object.fromEntries(Object.entries(config.colors).map(([key, value]) => [`--${key}`, value])) as CSSProperties,
    [config.colors],
  )

  return (
    <>
      <PageMetadata {...pageMetadata.home} />
      <div className="flex min-h-0 flex-1 flex-col" style={colorVariables}>
        <div className="mx-auto flex min-h-0 w-full flex-1 p-8 max-lg:block max-lg:p-4">
          <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-stretch justify-center gap-8 max-lg:flex-col max-lg:gap-4">
            <CommentPreview config={config} />
            <div className="relative min-h-0 w-full max-w-md shrink-0 max-lg:max-w-none">
              <div className="absolute inset-0 max-lg:static">
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
            </div>
          </div>
          <CreateModal open={createOpen} css={editableCss} onCssChange={setEditableCss} onClose={() => setCreateOpen(false)} />
        </div>
      </div>
    </>
  )
}
