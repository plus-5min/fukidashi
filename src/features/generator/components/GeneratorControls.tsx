import { useEffect, useRef, useState, type Dispatch } from 'react'

import { MaskedIcon } from '../../../components/ui/MaskedIcon'
import { RadioCardGroup } from '../../../components/ui/RadioCardGroup'
import { SegmentedControl } from '../../../components/ui/SegmentedControl'
import { Switch } from '../../../components/ui/Switch'
import {
  type ColorKey,
  type CommentTemplate,
  type Direction,
  type GeneratorAction,
  type GeneratorConfig,
  type GeneratorColors,
  type Platform,
} from '../generatorConfig'
import { colorPresets, type PresetName } from '../presets'
import { ColorIcon, CreateIcon, DesignIcon, PlatformIcon, TemplateIcon } from './GeneratorIcons'

type GeneratorControlsProps = {
  config: GeneratorConfig
  activePreset: PresetName | null
  dispatch: Dispatch<GeneratorAction>
  onPresetChange: (preset: PresetName | null) => void
  onCreate: () => void
}

const presets: Array<{ name: PresetName; label: string }> = [
  { name: 'pink', label: 'ピンク' },
  { name: 'blue', label: 'ミント' },
  { name: 'purple', label: 'パープル' },
  { name: 'orange', label: 'ピーチ' },
  { name: 'green', label: 'ブルー' },
  { name: 'black', label: 'イエローグリーン' },
  { name: 'yellow', label: 'グレー' },
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
  visibleWhen?: Extract<VisibilityKey, 'showName' | 'showBorder'>
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
      { key: 'listener-name', label: '名前', hiddenOnNormal: true, visibleWhen: 'showName' },
      { key: 'listener-name-bg', label: '名前の背景', hiddenOnNormal: true, visibleWhen: 'showName' },
      { key: 'listener-comment', label: 'コメント' },
      { key: 'listener-comment-bg', label: 'コメントの背景', hiddenOnNormal: true },
      { key: 'listener-comment-border', label: 'コメントの枠線', hiddenOnNormal: true, visibleWhen: 'showBorder' },
    ],
  },
  {
    heading: 'Member',
    fields: [
      { key: 'member-name', label: 'メンバーの名前', hiddenOnNormal: true, visibleWhen: 'showName' },
      { key: 'member-name-bg', label: '名前の背景', hiddenOnNormal: true, visibleWhen: 'showName' },
      { key: 'member-comment', label: 'コメント' },
      { key: 'member-comment-bg', label: 'コメントの背景', hiddenOnNormal: true },
      { key: 'member-comment-border', label: 'コメントの枠線', hiddenOnNormal: true, visibleWhen: 'showBorder' },
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
  const primaryColor = config.colors['listener-name-bg']

  const applyPreset = (preset: PresetName) => {
    dispatch({ type: 'colorsChanged', colors: colorPresets[preset] })
    onPresetChange(preset)
  }

  const changeColor = (key: ColorKey, value: string) => {
    dispatch({ type: 'colorChanged', key, value })
    onPresetChange(null)
  }

  const changePrimaryColor = (value: string) => {
    dispatch({ type: 'primaryColorChanged', value })
    onPresetChange(null)
  }

  return (
    <div className="flex h-full min-h-0 w-full max-w-md flex-col overflow-hidden rounded-4xl bg-surface max-lg:h-auto max-lg:max-w-none max-lg:overflow-visible">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-12 max-lg:flex-none max-lg:overflow-visible max-lg:p-4">
        <div className="flex flex-col gap-12 max-lg:gap-4">
          <div>
            <h3 id="platform-label" className="font-poppins mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <PlatformIcon />
              <span>Platform</span>
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
            <h3 id="template-label" className="font-poppins mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <TemplateIcon />
              <span>Template</span>
            </h3>
            <RadioCardGroup<CommentTemplate>
              aria-labelledby="template-label"
              name="comment-template"
              value={config.template}
              options={templateOptions}
              onChange={(value) => dispatch({ type: 'templateChanged', value })}
              renderOption={(option) => (
                <span className="flex flex-col items-center">
                  <MaskedIcon
                    className={`size-10 transition-colors duration-200 motion-reduce:transition-none ${
                      config.template === option.value
                        ? 'bg-primary group-hover:bg-primary'
                        : 'bg-foreground-muted group-hover:bg-foreground max-lg:group-hover:bg-foreground-muted'
                    }`}
                    src={`/assets/template-${option.value}.svg`}
                  />
                  <span className="font-poppins text-xs leading-none">{option.label}</span>
                </span>
              )}
            />
          </div>
          <div>
            <h3 id="direction-label" className="font-poppins mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <DesignIcon />
              <span>Layout</span>
            </h3>
            <SegmentedControl<Direction>
              aria-labelledby="direction-label"
              name="comment-direction"
              value={config.direction}
              options={directionOptions}
              onChange={(value) => dispatch({ type: 'directionChanged', value })}
              renderOption={(option) => (
                <MaskedIcon
                  className={`size-5 transition-colors duration-200 motion-reduce:transition-none ${
                    config.direction === option.value
                      ? 'bg-on-primary group-hover:bg-on-primary'
                      : 'bg-foreground-muted group-hover:bg-foreground max-lg:group-hover:bg-foreground-muted'
                  }`}
                  src={option.value === 'left' ? '/assets/text-left.svg' : '/assets/text-right.svg'}
                />
              )}
            />
            <div className="grid gap-4 mt-4">
              {visibilityOptions.map(({ key, label, hiddenOnTwitch, hiddenOnNormal }) =>
                (hiddenOnTwitch && isTwitch) || (hiddenOnNormal && config.template === 'normal') ? null : (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <label
                      id={`visibility-${key}-label`}
                      htmlFor={`visibility-${key}`}
                      className="font-poppins cursor-pointer text-base font-medium text-foreground-muted transition-colors duration-200 hover:text-foreground motion-reduce:transition-none max-lg:hover:text-foreground-muted"
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
            <h3 className="font-poppins mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <ColorIcon />
              <span>Color</span>
            </h3>
            <div className="grid grid-cols-7 gap-4">
              {presets.map(({ name, label }) => (
                <button
                  key={name}
                  type="button"
                  aria-label={`${label}のカラープリセット`}
                  aria-pressed={activePreset === name}
                  className={`block aspect-square size-full cursor-pointer rounded-full border-3 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:opacity-100 ${
                    activePreset === name ? 'border-primary' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: colorPresets[name]['listener-name-bg'] }}
                  onClick={() => applyPreset(name)}
                />
              ))}
            </div>
            <div className="mt-4">
              <ColorInput
                id="primary-color-picker"
                aria-label="メインカラーを一括変更"
                value={primaryColor}
                onChange={changePrimaryColor}
              />
            </div>
            <div className="mt-4 rounded-lg">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-transparent p-4 text-left transition-colors duration-200 hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:p-2 max-lg:hover:bg-transparent"
                aria-expanded={detailsOpen}
                aria-controls="color-details"
                onClick={() => setDetailsOpen((open) => !open)}
              >
                <span className="font-sans text-base font-semibold text-foreground">Custom</span>
                <span className="flex size-6 items-center justify-center">
                  <MaskedIcon
                    className={`size-4 bg-foreground transition-transform duration-200 motion-reduce:transition-none ${detailsOpen ? 'rotate-180' : ''}`}
                    src="/assets/arrow.svg"
                  />
                </span>
              </button>
              <div id="color-details" className={detailsOpen ? 'block p-4 max-lg:p-2' : 'hidden'} aria-hidden={!detailsOpen} inert={!detailsOpen}>
                <div className="min-h-0 overflow-hidden">
                  {colorSections.map(({ heading, fields, hiddenOnTwitch }) => {
                    if (hiddenOnTwitch && isTwitch) return null

                    const visibleFields = fields.filter(
                      ({ hiddenOnNormal, visibleWhen }) =>
                        (!hiddenOnNormal || config.template !== 'normal') && (!visibleWhen || config[visibleWhen]),
                    )

                    return <ColorSection key={heading} heading={heading} colors={config.colors} fields={visibleFields} onChange={changeColor} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border p-8">
        <button
          type="button"
          className="font-poppins group mx-auto flex min-h-12 w-full max-w-2xs cursor-pointer items-center justify-center gap-2 rounded-full bg-action-surface px-4 py-2 text-center text-lg font-semibold text-foreground transition-colors duration-200 hover:bg-secondary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:hover:bg-action-surface max-lg:hover:text-foreground"
          onClick={onCreate}
        >
          <CreateIcon className="size-6 text-secondary-strong transition duration-300 group-hover:rotate-y-180 group-hover:text-on-primary motion-reduce:transition-none motion-reduce:group-hover:rotate-y-0 max-lg:group-hover:rotate-y-0 max-lg:group-hover:text-secondary-strong" />
          <span>Create</span>
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
      <p className="font-poppins mb-2 text-base font-semibold text-foreground">{heading}</p>
      <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
        {fields.map(({ key, label }) => {
          const labelId = `${key}-label`

          return (
            <div key={key}>
              <label
                id={labelId}
                htmlFor={`${key}-picker`}
                className="mb-1 inline-block cursor-pointer text-xs font-normal text-foreground-muted transition-colors duration-200 hover:text-foreground motion-reduce:transition-none max-lg:hover:text-foreground-muted"
              >
                {label}
              </label>
              <ColorInput id={`${key}-picker`} aria-labelledby={labelId} value={colors[key]} onChange={(value) => onChange(key, value)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

type ColorInputProps = {
  id: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  value: string
  onChange: (value: string) => void
}

function ColorInput({ id, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, 'aria-describedby': ariaDescribedBy, value, onChange }: ColorInputProps) {
  const textInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.value = value.slice(1).toUpperCase()
    }
  }, [value])

  const changeText = (input: HTMLInputElement) => {
    const nextValue = input.value
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 6)
      .toUpperCase()
    input.value = nextValue
    if (/^[0-9A-F]{6}$/.test(nextValue)) {
      onChange(`#${nextValue}`)
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-transparent bg-surface-raised px-2 py-0 transition-colors duration-200 hover:bg-surface-hover focus-within:border-primary motion-reduce:transition-none max-lg:hover:bg-surface-raised">
      <div className="relative size-6 shrink-0">
        <input
          className="absolute inset-0 z-10 size-full cursor-pointer opacity-0 focus-visible:outline-none"
          type="color"
          id={id}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="pointer-events-none block size-6 rounded-full" style={{ backgroundColor: value }} aria-hidden="true" />
      </div>
      <span className="font-poppins font-medium text-foreground-muted" aria-hidden="true">
        #
      </span>
      <input
        ref={textInputRef}
        type="text"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        className="font-poppins min-h-10 w-full p-0 font-normal text-foreground outline-none"
        maxLength={6}
        pattern="[0-9A-Fa-f]{6}"
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
