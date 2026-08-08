import { useState, type Dispatch } from 'react'

import type { ColorKey, Direction, GeneratorAction, GeneratorConfig, GeneratorColors, Platform } from '../generatorConfig'
import { colorPresets, type PresetName } from '../presets'

type GeneratorControlsProps = {
  config: GeneratorConfig
  activePreset: PresetName | null
  dispatch: Dispatch<GeneratorAction>
  onPresetChange: (preset: PresetName | null) => void
  onCreate: () => void
}

const presetNames: PresetName[] = ['pink', 'blue', 'purple', 'orange', 'green', 'black']
const presetBackgroundClasses: Record<PresetName, string> = {
  pink: 'bg-[#fb83ab]',
  blue: 'bg-[#8ccce3]',
  purple: 'bg-[#a378ff]',
  orange: 'bg-[#fda25f]',
  green: 'bg-[#7ac970]',
  black: 'bg-[#707070]',
}

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
    <div className="w-full max-w-[488px] max-[1080px]:max-w-none">
      <div>
        <div>
          <h2 className="mb-8 font-['Poppins'] text-2xl leading-9 font-bold tracking-[1.2px] text-[#353b3c]">Design</h2>
          <div>
            <RadioGroup<Platform>
              label="Platform"
              name="comment-platform"
              value={config.platform}
              options={[
                ['youtube', 'Youtube'],
                ['twitch', 'Twitch'],
              ]}
              onChange={(value) => dispatch({ type: 'platformChanged', value })}
            />
            <RadioGroup<Direction>
              label="Direction"
              name="comment-direction"
              value={config.direction}
              options={[
                ['left', '左寄せ'],
                ['right', '右寄せ'],
              ]}
              onChange={(value) => dispatch({ type: 'directionChanged', value })}
            />
            <RadioGroup<boolean>
              label="ProfileImage"
              name="icon-display"
              value={config.showProfileImage}
              options={[
                [true, 'プロフィール画像あり'],
                [false, 'プロフィール画像なし'],
              ]}
              onChange={(value) =>
                dispatch({
                  type: 'visibilityChanged',
                  key: 'showProfileImage',
                  value,
                })
              }
              hidden={isTwitch}
            />
            <RadioGroup<boolean>
              label="Name"
              name="author-name-display"
              value={config.showName}
              options={[
                [true, 'ユーザー名あり'],
                [false, 'ユーザー名なし'],
              ]}
              onChange={(value) =>
                dispatch({
                  type: 'visibilityChanged',
                  key: 'showName',
                  value,
                })
              }
            />
            <RadioGroup<boolean>
              label="Border"
              name="border-block"
              value={config.showBorder}
              options={[
                [true, '枠線あり'],
                [false, '枠線なし'],
              ]}
              onChange={(value) =>
                dispatch({
                  type: 'visibilityChanged',
                  key: 'showBorder',
                  value,
                })
              }
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 font-['Poppins'] text-2xl leading-9 font-bold tracking-[1.2px] text-[#353b3c]">Color</h2>
          <div className="grid gap-6">
            <div>
              <p className="mb-2 font-['Poppins'] text-xl font-semibold text-[#353b3c]">Template</p>
              <div className="grid grid-cols-6 gap-x-6 gap-y-3">
                {presetNames.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    aria-label={`${preset} color template`}
                    className={`block aspect-square h-full w-full rounded-lg border-4 transition-opacity duration-300 hover:opacity-70 max-[768px]:hover:opacity-100 ${
                      activePreset === preset ? 'border-[#585858]' : 'border-[#e8e8e8]'
                    } ${presetBackgroundClasses[preset]}`}
                    onClick={() => applyPreset(preset)}
                  />
                ))}
              </div>
            </div>

            <div className="my-2.5 rounded-lg">
              <button
                type="button"
                className="flex w-full cursor-pointer justify-between rounded-lg bg-white py-2 text-left transition-colors duration-300 hover:bg-[#fafafa] max-[768px]:hover:bg-white"
                aria-expanded={detailsOpen}
                onClick={() => setDetailsOpen((open) => !open)}
              >
                <span className="my-auto font-['Noto_Sans_JP'] text-xl font-semibold tracking-[0.05em] text-[#353b3c]">詳細設定</span>
                <span className="my-auto block">
                  <img className={`block transition-transform duration-300 ${detailsOpen ? 'rotate-180' : ''}`} src="/assets/arrow.svg" alt="" />
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${detailsOpen ? 'my-2 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="min-h-0 overflow-hidden px-4">
                  <ColorSection
                    heading="Listener"
                    colors={config.colors}
                    fields={[
                      ['listener-name', '名前'],
                      ['listener-name-bg', '名前の背景'],
                      ['listener-comment', 'コメント'],
                      ['listener-comment-bg', 'コメントの背景'],
                      ['listener-comment-border', 'コメントの枠線'],
                    ]}
                    onChange={changeColor}
                  />
                  <ColorSection
                    heading="Member"
                    colors={config.colors}
                    fields={[
                      ['member-name', 'メンバーの名前'],
                      ['member-name-bg', '名前の背景'],
                      ['member-comment', 'コメント'],
                      ['member-comment-bg', 'コメントの背景'],
                      ['member-comment-border', 'コメントの枠線'],
                    ]}
                    onChange={changeColor}
                    hidden={isTwitch}
                  />
                  <ColorSection
                    heading="SuperChat"
                    colors={config.colors}
                    fields={[
                      ['superchat-name', '名前'],
                      ['superchat-name-bg', '名前の背景'],
                      ['superchat-comment', 'コメント'],
                      ['superchat-comment-bg', 'コメントの背景'],
                    ]}
                    onChange={changeColor}
                    hidden={isTwitch}
                  />
                  <ColorSection
                    heading="MemberShip"
                    colors={config.colors}
                    fields={[
                      ['membership-name', '名前'],
                      ['membership-name-bg', '名前の背景'],
                      ['membership-comment', 'コメント'],
                      ['membership-comment-bg', 'コメントの背景'],
                    ]}
                    onChange={changeColor}
                    hidden={isTwitch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <button
            type="button"
            className="w-full cursor-pointer rounded-lg bg-[#585858] p-3 text-center font-['Poppins'] text-xl font-bold text-white transition-opacity duration-300 hover:opacity-70 max-[768px]:hover:opacity-100"
            onClick={onCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

type RadioGroupProps<T extends string | boolean> = {
  label: string
  name: string
  value: T
  options: Array<[T, string]>
  onChange: (value: T) => void
  hidden?: boolean
}

function RadioGroup<T extends string | boolean>({ label, name, value, options, onChange, hidden = false }: RadioGroupProps<T>) {
  return (
    <div className={`mt-6 first:mt-[30px] ${hidden ? 'hidden' : ''}`}>
      <p className="mb-2 font-['Poppins'] text-xs font-medium text-[#c3c3c3]">{label}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {options.map(([optionValue, optionLabel]) => {
          const id = `${name}-${String(optionValue)}`
          return (
            <div key={id}>
              <input className="peer sr-only" type="radio" id={id} name={name} checked={value === optionValue} onChange={() => onChange(optionValue)} />
              <label
                htmlFor={id}
                className="relative cursor-pointer pb-px pl-5 text-xs before:absolute before:top-1/2 before:left-0 before:block before:size-4 before:-translate-y-1/2 before:rounded-full before:border before:border-[#d8d8d8] before:bg-white before:content-[''] after:absolute after:top-1/2 after:left-[3px] after:block after:size-2.5 after:-translate-y-1/2 after:rounded-full after:bg-[#9ed9ef] after:opacity-0 after:content-[''] peer-checked:after:opacity-100"
              >
                {optionLabel}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type ColorSectionProps = {
  heading: string
  colors: GeneratorColors
  fields: Array<[ColorKey, string]>
  onChange: (key: ColorKey, value: string) => void
  hidden?: boolean
}

function ColorSection({ heading, colors, fields, onChange, hidden = false }: ColorSectionProps) {
  return (
    <div className={`mt-6 first:mt-0 ${hidden ? 'hidden' : ''}`}>
      <p className="mb-2 font-['Poppins'] text-base font-semibold text-[#353b3c]">{heading}</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 max-[1080px]:gap-x-3 max-[1080px]:gap-y-1.5">
        {fields.map(([key, label]) => (
          <ColorInput key={`${key}-${colors[key]}`} colorKey={key} label={label} value={colors[key]} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

type ColorInputProps = {
  colorKey: ColorKey
  label: string
  value: string
  onChange: (key: ColorKey, value: string) => void
}

function ColorInput({ colorKey, label, value, onChange }: ColorInputProps) {
  const [textValue, setTextValue] = useState(value.slice(1))

  const changeText = (input: string) => {
    const nextValue = input
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 6)
      .toUpperCase()
    setTextValue(nextValue)
    if (/^[0-9A-F]{6}$/.test(nextValue)) {
      onChange(colorKey, `#${nextValue}`)
    }
  }

  return (
    <div>
      <label htmlFor={colorKey} className="mb-2 block text-xs font-normal text-[#c3c3c3]">
        {label}
      </label>
      <div className="flex items-center rounded-[10px] bg-[#fafafa] px-2 py-1 transition-colors duration-300 hover:bg-[#f5f5f5] max-[768px]:hover:bg-[#fafafa]">
        <input
          className="h-7 w-6 min-w-6 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 outline-none max-[768px]:h-6 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0"
          type="color"
          id={colorKey}
          value={value}
          onChange={(event) => onChange(colorKey, event.target.value)}
        />
        <span className="mx-0.5 ml-1 font-['Poppins'] font-medium text-[#c3c3c3]">#</span>
        <input
          type="text"
          className="w-full p-1 font-['Poppins'] font-normal text-[#353b3c]"
          maxLength={6}
          pattern="[a-zA-Z0-9]{6}"
          value={textValue}
          onChange={(event) => changeText(event.target.value)}
          onBlur={() => {
            if (!/^[0-9A-F]{6}$/.test(textValue)) {
              setTextValue(value.slice(1))
            }
          }}
          required
        />
      </div>
    </div>
  )
}
