import { useRef, useState, type Dispatch } from 'react'

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

export function GeneratorControls({ config, activePreset, dispatch, onPresetChange, onCreate }: GeneratorControlsProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [accordionHeight, setAccordionHeight] = useState(0)
  const accordionRef = useRef<HTMLDivElement>(null)
  const isTwitch = config.platform === 'twitch'

  const applyPreset = (preset: PresetName) => {
    dispatch({ type: 'colorsChanged', colors: colorPresets[preset] })
    onPresetChange(preset)
  }

  const changeColor = (key: ColorKey, value: string) => {
    dispatch({ type: 'colorChanged', key, value })
    onPresetChange(null)
  }

  const toggleDetails = () => {
    if (!detailsOpen) {
      setAccordionHeight(accordionRef.current?.scrollHeight ?? 0)
    }
    setDetailsOpen((open) => !open)
  }

  return (
    <div className="custom-contents">
      <div className="custom-inner">
        <div className="custom-category">
          <h2 className="custom-heading">Design</h2>
          <div className="custom-label">
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

        <div className="custom-category">
          <h2 className="custom-heading">Color</h2>
          <div className="custom-color-contents">
            <div className="custom-color-block">
              <p className="custom-color-heading">Template</p>
              <div className="custom-template-column">
                {presetNames.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    aria-label={`${preset} color template`}
                    className={`custom-color-template ${preset}${activePreset === preset ? ' active' : ''}`}
                    onClick={() => applyPreset(preset)}
                  />
                ))}
              </div>
            </div>

            <div className="custom-color-detail">
              <button type="button" className="custom-color-btn" aria-expanded={detailsOpen} onClick={toggleDetails}>
                <span className="custom-color-heading">詳細設定</span>
                <span className={`custom-color-heading custom-detail-arrow${detailsOpen ? ' open' : ''}`}>
                  <img src="/assets/arrow.svg" alt="" />
                </span>
              </button>
              <div
                ref={accordionRef}
                className={`custom-color-accordion${detailsOpen ? ' open' : ''}`}
                style={{
                  maxHeight: detailsOpen ? `${accordionHeight}px` : undefined,
                }}
              >
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

        <div className="custom-create-block">
          <button type="button" className="custom-create-btn create-modal-open" onClick={onCreate}>
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
    <div className={`custom-label-group${hidden ? ' is-twitch' : ''}`}>
      <p className="custom-label-name">{label}</p>
      <div className="custom-label-block">
        {options.map(([optionValue, optionLabel]) => {
          const id = `${name}-${String(optionValue)}`
          return (
            <div className="custom-label-item" key={id}>
              <input type="radio" id={id} name={name} checked={value === optionValue} onChange={() => onChange(optionValue)} />
              <label htmlFor={id} className="custom-label-radio">
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
    <div className={`custom-color-block${hidden ? ' is-twitch' : ''}`}>
      <p className="custom-color-detail-heading">{heading}</p>
      <div className="custom-color-column">
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
    <div className="custom-color-picker">
      <label htmlFor={colorKey} className="custom-color-label">
        {label}
      </label>
      <div className="custom-color-picker-column">
        <input type="color" id={colorKey} value={value} onChange={(event) => onChange(colorKey, event.target.value)} />
        <span className="custom-color-sharp">#</span>
        <input
          type="text"
          className="custom-color-code"
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
