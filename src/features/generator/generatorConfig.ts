export type Platform = 'youtube' | 'twitch'
export type Direction = 'left' | 'right'

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

export type GeneratorConfig = {
  platform: Platform
  direction: Direction
  showProfileImage: boolean
  showName: boolean
  showBorder: boolean
  colors: GeneratorColors
}

export const blueColors: GeneratorColors = {
  'listener-name': '#FFFFFF',
  'listener-name-bg': '#8CCCE3',
  'member-name': '#FFFFFF',
  'member-name-bg': '#8CCCE3',
  'listener-comment': '#333333',
  'listener-comment-bg': '#FFFFFF',
  'listener-comment-border': '#8CCCE3',
  'member-comment': '#333333',
  'member-comment-bg': '#FFFFFF',
  'member-comment-border': '#8CCCE3',
  'superchat-name': '#FFFFFF',
  'superchat-name-bg': '#9ED9EF',
  'superchat-comment': '#FFFFFF',
  'superchat-comment-bg': '#8CCCE3',
  'membership-name': '#FFFFFF',
  'membership-name-bg': '#9ED9EF',
  'membership-comment': '#FFFFFF',
  'membership-comment-bg': '#8CCCE3',
}

export const defaultGeneratorConfig: GeneratorConfig = {
  platform: 'youtube',
  direction: 'left',
  showProfileImage: false,
  showName: true,
  showBorder: true,
  colors: blueColors,
}

export type GeneratorAction =
  | { type: 'platformChanged'; value: Platform }
  | { type: 'directionChanged'; value: Direction }
  | {
      type: 'visibilityChanged'
      key: 'showProfileImage' | 'showName' | 'showBorder'
      value: boolean
    }
  | { type: 'colorChanged'; key: ColorKey; value: string }
  | { type: 'colorsChanged'; colors: GeneratorColors }

export function generatorReducer(state: GeneratorConfig, action: GeneratorAction): GeneratorConfig {
  switch (action.type) {
    case 'platformChanged':
      return { ...state, platform: action.value }
    case 'directionChanged':
      return { ...state, direction: action.value }
    case 'visibilityChanged':
      return { ...state, [action.key]: action.value }
    case 'colorChanged':
      return {
        ...state,
        colors: { ...state.colors, [action.key]: action.value.toUpperCase() },
      }
    case 'colorsChanged':
      return { ...state, colors: action.colors }
  }
}
