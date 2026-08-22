export type Platform = 'youtube' | 'twitch'
export type Direction = 'left' | 'right'
export type CommentTemplate = 'fukidashi' | 'card' | 'normal'

export const colorKeys = [
  'listener-name',
  'listener-name-bg',
  'member-name',
  'member-name-bg',
  'listener-comment',
  'listener-comment-bg',
  'listener-comment-border',
  'member-comment',
  'member-comment-bg',
  'member-comment-border',
  'superchat-name',
  'superchat-name-bg',
  'superchat-comment',
  'superchat-comment-bg',
  'membership-name',
  'membership-name-bg',
  'membership-comment',
  'membership-comment-bg',
] as const

export type ColorKey = (typeof colorKeys)[number]
export type GeneratorColors = Record<ColorKey, string>

export const primaryColorKeys = [
  'listener-name-bg',
  'listener-comment',
  'listener-comment-border',
  'member-name-bg',
  'member-comment',
  'member-comment-border',
  'superchat-name-bg',
  'superchat-comment-bg',
  'membership-name-bg',
  'membership-comment-bg',
] as const satisfies readonly ColorKey[]

export type GeneratorConfig = {
  platform: Platform
  template: CommentTemplate
  direction: Direction
  showProfileImage: boolean
  showName: boolean
  showBorder: boolean
  colors: GeneratorColors
}

const defaultPrimary = '#5997F2'
const defaultSecondary = '#FFA3CB'

export const defaultColors: GeneratorColors = {
  'listener-name': '#FFFFFF',
  'listener-name-bg': defaultPrimary,
  'member-name': '#FFFFFF',
  'member-name-bg': defaultSecondary,
  'listener-comment': defaultPrimary,
  'listener-comment-bg': '#FFFFFF',
  'listener-comment-border': defaultPrimary,
  'member-comment': defaultSecondary,
  'member-comment-bg': '#FFFFFF',
  'member-comment-border': defaultSecondary,
  'superchat-name': '#FFFFFF',
  'superchat-name-bg': defaultPrimary,
  'superchat-comment': '#FFFFFF',
  'superchat-comment-bg': defaultPrimary,
  'membership-name': '#FFFFFF',
  'membership-name-bg': defaultSecondary,
  'membership-comment': '#FFFFFF',
  'membership-comment-bg': defaultSecondary,
}

export const defaultGeneratorConfig: GeneratorConfig = {
  platform: 'youtube',
  template: 'fukidashi',
  direction: 'left',
  showProfileImage: true,
  showName: true,
  showBorder: false,
  colors: defaultColors,
}

export type GeneratorAction =
  | { type: 'platformChanged'; value: Platform }
  | { type: 'templateChanged'; value: CommentTemplate }
  | { type: 'directionChanged'; value: Direction }
  | {
      type: 'visibilityChanged'
      key: 'showProfileImage' | 'showName' | 'showBorder'
      value: boolean
    }
  | { type: 'colorChanged'; key: ColorKey; value: string }
  | { type: 'primaryColorChanged'; value: string }
  | { type: 'colorsChanged'; colors: GeneratorColors }

export function generatorReducer(state: GeneratorConfig, action: GeneratorAction): GeneratorConfig {
  switch (action.type) {
    case 'platformChanged':
      return { ...state, platform: action.value }
    case 'templateChanged':
      return { ...state, template: action.value }
    case 'directionChanged':
      return { ...state, direction: action.value }
    case 'visibilityChanged':
      return { ...state, [action.key]: action.value }
    case 'colorChanged':
      return {
        ...state,
        colors: { ...state.colors, [action.key]: action.value.toUpperCase() },
      }
    case 'primaryColorChanged': {
      const colors = { ...state.colors }

      for (const key of primaryColorKeys) {
        colors[key] = action.value.toUpperCase()
      }

      return { ...state, colors }
    }
    case 'colorsChanged':
      return { ...state, colors: action.colors }
  }
}
