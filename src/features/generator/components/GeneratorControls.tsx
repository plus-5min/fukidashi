import { useState, type Dispatch } from 'react'

import { RadioCardGroup } from '../../../components/ui/RadioCardGroup'
import { SegmentedControl } from '../../../components/ui/SegmentedControl'
import { Switch } from '../../../components/ui/Switch'
import type { ColorKey, CommentTemplate, Direction, GeneratorAction, GeneratorConfig, GeneratorColors, Platform } from '../generatorConfig'
import { colorPresets, type PresetName } from '../presets'

type GeneratorControlsProps = {
  config: GeneratorConfig
  activePreset: PresetName | null
  dispatch: Dispatch<GeneratorAction>
  onPresetChange: (preset: PresetName | null) => void
  onCreate: () => void
}

const presets: Array<{ name: PresetName; label: string; backgroundClass: string }> = [
  { name: 'pink', label: 'ピンク', backgroundClass: 'bg-[#fb83ab]' },
  { name: 'blue', label: 'ブルー', backgroundClass: 'bg-[#8ccce3]' },
  { name: 'purple', label: 'パープル', backgroundClass: 'bg-[#a378ff]' },
  { name: 'orange', label: 'オレンジ', backgroundClass: 'bg-[#fda25f]' },
  { name: 'green', label: 'グリーン', backgroundClass: 'bg-[#7ac970]' },
  { name: 'black', label: 'ブラック', backgroundClass: 'bg-[#707070]' },
]

const platformOptions: Array<{ value: Platform; label: string }> = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitch', label: 'Twitch' },
]

const templateOptions: Array<{ value: CommentTemplate; label: string }> = [
  { value: 'fukidashi', label: 'fukidashi' },
  { value: 'card', label: 'card' },
  { value: 'normal', label: 'normal' },
]

const directionOptions: Array<{ value: Direction; label: string }> = [
  { value: 'left', label: '左寄せ' },
  { value: 'right', label: '右寄せ' },
]

type VisibilityKey = 'showProfileImage' | 'showName' | 'showBorder'

const visibilityOptions: Array<{ key: VisibilityKey; label: string; hiddenOnTwitch?: boolean; hiddenOnNormal?: boolean }> = [
  { key: 'showProfileImage', label: 'icon', hiddenOnTwitch: true },
  { key: 'showName', label: 'name' },
  { key: 'showBorder', label: 'border', hiddenOnNormal: true },
]

type ColorField = {
  key: ColorKey
  label: string
  hiddenOnNormal?: boolean
}

type ColorSectionDefinition = {
  heading: string
  fields: ColorField[]
  hiddenOnTwitch?: boolean
}

const colorSections: ColorSectionDefinition[] = [
  {
    heading: 'Listener',
    fields: [
      { key: 'listener-name', label: '名前', hiddenOnNormal: true },
      { key: 'listener-name-bg', label: '名前の背景', hiddenOnNormal: true },
      { key: 'listener-comment', label: 'コメント' },
      { key: 'listener-comment-bg', label: 'コメントの背景', hiddenOnNormal: true },
      { key: 'listener-comment-border', label: 'コメントの枠線', hiddenOnNormal: true },
    ],
  },
  {
    heading: 'Member',
    fields: [
      { key: 'member-name', label: 'メンバーの名前', hiddenOnNormal: true },
      { key: 'member-name-bg', label: '名前の背景', hiddenOnNormal: true },
      { key: 'member-comment', label: 'コメント' },
      { key: 'member-comment-bg', label: 'コメントの背景', hiddenOnNormal: true },
      { key: 'member-comment-border', label: 'コメントの枠線', hiddenOnNormal: true },
    ],
    hiddenOnTwitch: true,
  },
  {
    heading: 'SuperChat',
    fields: [
      { key: 'superchat-name', label: '名前' },
      { key: 'superchat-name-bg', label: '名前の背景' },
      { key: 'superchat-comment', label: 'コメント' },
      { key: 'superchat-comment-bg', label: 'コメントの背景' },
    ],
    hiddenOnTwitch: true,
  },
  {
    heading: 'MemberShip',
    fields: [
      { key: 'membership-name', label: '名前' },
      { key: 'membership-name-bg', label: '名前の背景' },
      { key: 'membership-comment', label: 'コメント' },
      { key: 'membership-comment-bg', label: 'コメントの背景' },
    ],
    hiddenOnTwitch: true,
  },
]

export function GeneratorControls({ config, activePreset, dispatch, onPresetChange, onCreate }: GeneratorControlsProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isTwitch = config.platform === 'twitch'

  const applyPreset = (preset: PresetName) => {
    dispatch({ type: 'colorsChanged', colors: colorPresets[preset] })
    onPresetChange(preset)
  }

  const changeColor = (key: ColorKey, value: string) => {
    dispatch({ type: 'colorChanged', key, value })
    onPresetChange(null)
  }

  return (
    <div className="flex h-full min-h-0 w-full max-w-md flex-col overflow-hidden rounded-4xl bg-white max-lg:h-auto max-lg:max-w-none max-lg:overflow-visible">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-8 max-lg:flex-none max-lg:overflow-visible max-lg:p-4">
        <div className="flex flex-col gap-8 p-4 max-lg:gap-2 max-lg:p-2">
          <div>
            <h3 id="platform-label" className="font-poppins mb-4 text-base font-semibold text-primary">
              Platform
            </h3>
            <SegmentedControl<Platform>
              aria-labelledby="platform-label"
              name="comment-platform"
              value={config.platform}
              options={platformOptions}
              onChange={(value) => dispatch({ type: 'platformChanged', value })}
            />
          </div>
          <div>
            <h3 id="template-label" className="font-poppins mb-4 text-base font-semibold text-primary">
              Template
            </h3>
            <RadioCardGroup<CommentTemplate>
              aria-labelledby="template-label"
              name="comment-template"
              value={config.template}
              options={templateOptions}
              onChange={(value) => dispatch({ type: 'templateChanged', value })}
              renderOption={(option) => (
                <span className="flex flex-col items-center">
                  <img
                    className={`size-10 transition-opacity duration-200 motion-reduce:transition-none ${config.template === option.value ? 'opacity-100' : 'opacity-[0.47]'}`}
                    src={`/assets/template-${option.value}.svg`}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="font-poppins text-xs leading-none">{option.label}</span>
                </span>
              )}
            />
          </div>
          <div>
            <h3 id="direction-label" className="font-poppins mb-4 text-base font-semibold text-primary">
              Layout
            </h3>
            <SegmentedControl<Direction>
              aria-labelledby="direction-label"
              name="comment-direction"
              value={config.direction}
              options={directionOptions}
              onChange={(value) => dispatch({ type: 'directionChanged', value })}
              renderOption={(option) => (
                <img
                  className="size-5 object-contain"
                  src={option.value === 'left' ? '/assets/text-left.svg' : '/assets/text-right.svg'}
                  alt=""
                  aria-hidden="true"
                />
              )}
            />
            <div className="grid gap-2 mt-4">
              {visibilityOptions.map(({ key, label, hiddenOnTwitch, hiddenOnNormal }) =>
                (hiddenOnTwitch && isTwitch) || (hiddenOnNormal && config.template === 'normal') ? null : (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <label
                      id={`visibility-${key}-label`}
                      htmlFor={`visibility-${key}`}
                      className="font-poppins cursor-pointer text-xs font-medium text-primary-muted"
                    >
                      {label}
                    </label>
                    <Switch
                      id={`visibility-${key}`}
                      aria-labelledby={`visibility-${key}-label`}
                      checked={config[key]}
                      onCheckedChange={(value) => dispatch({ type: 'visibilityChanged', key, value })}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="font-poppins mb-2 text-base font-semibold text-primary">Color</h3>
            <div className="grid grid-cols-6 gap-4">
              {presets.map(({ name, label, backgroundClass }) => (
                <button
                  key={name}
                  type="button"
                  aria-label={`${label}のカラープリセット`}
                  className={`block aspect-square size-full cursor-pointer rounded-full border-3 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:opacity-100 ${
                    activePreset === name ? '' : 'border-none'
                  } ${backgroundClass}`}
                  onClick={() => applyPreset(name)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg">
          <button
            type="button"
            className="flex w-full cursor-pointer justify-between rounded-lg bg-white p-4 text-left transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:p-2 max-lg:hover:bg-white"
            aria-expanded={detailsOpen}
            aria-controls="color-details"
            onClick={() => setDetailsOpen((open) => !open)}
          >
            <span className="my-auto font-sans text-base font-semibold text-primary">詳細</span>
            <span className="my-auto block">
              <img
                className={`block transition-transform duration-200 motion-reduce:transition-none ${detailsOpen ? 'rotate-180' : ''}`}
                src="/assets/arrow.svg"
                alt=""
              />
            </span>
          </button>
          <div
            id="color-details"
            className={`grid p-4 transition-[grid-template-rows] duration-200 motion-reduce:transition-none max-lg:p-2 ${detailsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            aria-hidden={!detailsOpen}
            inert={!detailsOpen}
          >
            <div className="min-h-0 overflow-hidden">
              {colorSections.map(({ heading, fields, hiddenOnTwitch }) => {
                if (hiddenOnTwitch && isTwitch) return null

                const visibleFields = fields.filter(({ hiddenOnNormal }) => !hiddenOnNormal || config.template !== 'normal')

                return <ColorSection key={heading} heading={heading} colors={config.colors} fields={visibleFields} onChange={changeColor} />
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-secondary p-4">
        <button
          type="button"
          className="font-poppins mx-auto flex min-h-12 w-full max-w-2xs cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-center text-lg font-bold text-white transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:opacity-100"
          onClick={onCreate}
        >
          Create
        </button>
      </div>
    </div>
  )
}

type ColorSectionProps = {
  heading: string
  colors: GeneratorColors
  fields: ColorField[]
  onChange: (key: ColorKey, value: string) => void
}

function ColorSection({ heading, colors, fields, onChange }: ColorSectionProps) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="font-poppins mb-2 text-base font-semibold text-primary">{heading}</p>
      <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
        {fields.map(({ key, label }) => {
          const labelId = `${key}-label`

          return (
            <div key={key}>
              <label id={labelId} htmlFor={`${key}-picker`} className="mb-1 inline-block text-xs font-normal text-primary-muted">
                {label}
              </label>
              <ColorInput colorKey={key} aria-labelledby={labelId} value={colors[key]} onChange={onChange} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

type ColorInputProps = {
  colorKey: ColorKey
  'aria-labelledby': string
  value: string
  onChange: (key: ColorKey, value: string) => void
}

function ColorInput({ colorKey, 'aria-labelledby': ariaLabelledBy, value, onChange }: ColorInputProps) {
  const changeText = (input: HTMLInputElement) => {
    const nextValue = input.value
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 6)
      .toUpperCase()
    input.value = nextValue
    if (/^[0-9A-F]{6}$/.test(nextValue)) {
      onChange(colorKey, `#${nextValue}`)
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-transparent bg-secondary px-2 py-0 transition-colors duration-200 hover:bg-secondary focus-within:border-primary motion-reduce:transition-none max-lg:hover:bg-secondary">
      <div className="relative size-6 shrink-0">
        <input
          className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
          type="color"
          id={`${colorKey}-picker`}
          aria-labelledby={ariaLabelledBy}
          value={value}
          onChange={(event) => onChange(colorKey, event.target.value)}
        />
        <span className="pointer-events-none block size-6 rounded-full" style={{ backgroundColor: value }} aria-hidden="true" />
      </div>
      <span className="font-poppins font-medium text-primary-subtle" aria-hidden="true">
        #
      </span>
      <input
        key={value}
        type="text"
        aria-labelledby={ariaLabelledBy}
        className="font-poppins min-h-10 w-full p-0 font-normal text-primary outline-none"
        maxLength={6}
        pattern="[a-zA-Z0-9]{6}"
        defaultValue={value.slice(1).toUpperCase()}
        onChange={(event) => changeText(event.currentTarget)}
        onBlur={(event) => {
          if (!/^[0-9A-F]{6}$/.test(event.currentTarget.value)) {
            event.currentTarget.value = value.slice(1).toUpperCase()
          }
        }}
        required
      />
    </div>
  )
}
