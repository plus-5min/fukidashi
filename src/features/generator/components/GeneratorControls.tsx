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

const presets: Array<{ name: PresetName; backgroundClass: string }> = [
  { name: 'pink', backgroundClass: 'bg-[#fb83ab]' },
  { name: 'blue', backgroundClass: 'bg-[#8ccce3]' },
  { name: 'purple', backgroundClass: 'bg-[#a378ff]' },
  { name: 'orange', backgroundClass: 'bg-[#fda25f]' },
  { name: 'green', backgroundClass: 'bg-[#7ac970]' },
  { name: 'black', backgroundClass: 'bg-[#707070]' },
]

const platformOptions: Array<{ value: Platform; label: string }> = [
  { value: 'youtube', label: 'Youtube' },
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
      { key: 'listener-name', label: '名前' },
      { key: 'listener-name-bg', label: '名前の背景' },
      { key: 'listener-comment', label: 'コメント' },
      { key: 'listener-comment-bg', label: 'コメントの背景' },
      { key: 'listener-comment-border', label: 'コメントの枠線', hiddenOnNormal: true },
    ],
  },
  {
    heading: 'Member',
    fields: [
      { key: 'member-name', label: 'メンバーの名前' },
      { key: 'member-name-bg', label: '名前の背景' },
      { key: 'member-comment', label: 'コメント' },
      { key: 'member-comment-bg', label: 'コメントの背景' },
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
    <div className="flex h-full min-h-0 w-full max-w-md flex-col overflow-hidden rounded-4xl bg-white max-md:h-auto max-md:overflow-visible max-lg:max-w-none">
      <div className="min-h-0 p-8 flex-1 overflow-y-auto overscroll-contain max-md:p-4 max-md:flex-none max-md:overflow-visible">
        <div className="flex flex-col gap-12 p-4">
          <div>
            <h3 id="platform-label" className="font-poppins mb-4 text-base font-semibold text-[#353b3c]">
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
            <h3 id="template-label" className="font-poppins mb-4 text-base font-semibold text-[#353b3c]">
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
                    className={`size-10 transition-opacity ${config.template === option.value ? 'opacity-100' : 'opacity-[0.47]'}`}
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
            <h3 id="direction-label" className="font-poppins mb-4 text-base font-semibold text-[#353b3c]">
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
                    <label htmlFor={`visibility-${key}`} className="font-poppins cursor-pointer text-xs font-medium text-[#c3c3c3]">
                      {label}
                    </label>
                    <Switch id={`visibility-${key}`} checked={config[key]} onCheckedChange={(value) => dispatch({ type: 'visibilityChanged', key, value })} />
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="font-poppins mb-2 text-base font-semibold text-[#353b3c]">Color</h3>
            <div className="grid grid-cols-6 gap-4">
              {presets.map(({ name, backgroundClass }) => (
                <button
                  key={name}
                  type="button"
                  aria-label={`${name} color template`}
                  className={`block aspect-square size-full rounded-full cursor-pointer border-3 transition-opacity duration-300 hover:opacity-70 max-md:hover:opacity-100 ${
                    activePreset === name ? '' : 'border-none'
                  } ${backgroundClass}`}
                  onClick={() => applyPreset(name)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-lg">
          <button
            type="button"
            className="flex w-full cursor-pointer justify-between rounded-lg bg-white p-4 text-left transition-colors duration-300 hover:bg-[#fafafa] max-md:hover:bg-white"
            aria-expanded={detailsOpen}
            onClick={() => setDetailsOpen((open) => !open)}
          >
            <span className="my-auto font-sans text-md font-semibold text-[#353b3c]">詳細</span>
            <span className="my-auto block">
              <img className={`block transition-transform duration-300 ${detailsOpen ? 'rotate-180' : ''}`} src="/assets/arrow.svg" alt="" />
            </span>
          </button>
          <div className={`grid transition-[grid-template-rows] duration-300 p-4 ${detailsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
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

      <div className="shrink-0 p-4 border-t border-[#c3c3c3]">
        <button
          type="button"
          className="font-poppins w-full block cursor-pointer rounded-full max-w-2xs mx-auto bg-[#585858] p-3 text-center text-lg font-bold text-white transition-opacity hover:opacity-70 max-md:hover:opacity-100"
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
    <div className="mt-6 first:mt-0">
      <p className="font-poppins mb-2 text-base font-semibold text-[#353b3c]">{heading}</p>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 max-lg:gap-x-3 max-lg:gap-y-1.5">
        {fields.map(({ key, label }) => {
          const labelId = `${key}-label`

          return (
            <div key={key}>
              <label id={labelId} htmlFor={`${key}-picker`} className="mb-2 block text-xs font-normal text-[#c3c3c3]">
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
    <div className="flex items-center rounded-lg border border-transparent bg-[#f6f6f6] px-2 py-1 transition-colors duration-300 hover:bg-[#f5f5f5] focus-within:border-[#3f3f3f] max-md:hover:bg-[#fafafa]">
      <input
        className="size-6 shrink-0 cursor-pointer appearance-none overflow-hidden rounded-full border-0 bg-transparent p-0 outline-none [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0"
        type="color"
        id={`${colorKey}-picker`}
        aria-labelledby={ariaLabelledBy}
        value={value}
        onChange={(event) => onChange(colorKey, event.target.value)}
      />
      <span className="font-poppins mx-0.5 ml-1 font-medium text-[#c3c3c3]">#</span>
      <input
        key={value}
        type="text"
        aria-labelledby={ariaLabelledBy}
        className="font-poppins w-full p-1 font-normal text-[#353b3c] outline-none"
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
