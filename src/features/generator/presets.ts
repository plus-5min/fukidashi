import type { GeneratorColors } from './generatorConfig'

export type PresetName = 'pink' | 'blue' | 'purple' | 'orange' | 'green' | 'black' | 'yellow'

function createColorPreset(mainColor: string, foregroundColor = '#FFFFFF'): GeneratorColors {
  return {
    'listener-name': foregroundColor,
    'listener-name-bg': mainColor,
    'member-name': foregroundColor,
    'member-name-bg': mainColor,
    'listener-comment': mainColor,
    'listener-comment-bg': '#FFFFFF',
    'listener-comment-border': mainColor,
    'member-comment': mainColor,
    'member-comment-bg': '#FFFFFF',
    'member-comment-border': mainColor,
    'superchat-name': foregroundColor,
    'superchat-name-bg': mainColor,
    'superchat-comment': foregroundColor,
    'superchat-comment-bg': mainColor,
    'membership-name': foregroundColor,
    'membership-name-bg': mainColor,
    'membership-comment': foregroundColor,
    'membership-comment-bg': mainColor,
  }
}

export const colorPresets: Record<PresetName, GeneratorColors> = {
  pink: createColorPreset('#FFA3CB'),
  blue: createColorPreset('#A3E9DD'),
  purple: createColorPreset('#A3B2FF'),
  orange: createColorPreset('#FDC2B3'),
  green: createColorPreset('#A2CEFF'),
  black: createColorPreset('#D2D890'),
  yellow: createColorPreset('#C5C4CC'),
}
