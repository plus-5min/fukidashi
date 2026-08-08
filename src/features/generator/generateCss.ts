import twitchTemplate from './templates/twitch.txt?raw'
import youtubeTemplate from './templates/youtube.txt?raw'
import { colorKeys, type GeneratorConfig } from './generatorConfig'

export function generateCss(config: GeneratorConfig): string {
  const isLeft = config.direction === 'left'
  const hasBorder = config.showBorder
  const replacements: Record<string, string> = {
    animationName: isLeft ? 'popInLeft' : 'popInRight',
    flexDirection: isLeft ? 'row' : 'row-reverse',
    justifyContent: isLeft ? 'start' : 'end',
    authorDisplay: config.showName ? 'block' : 'none',
    iconDisplay: config.showProfileImage ? 'block' : 'none',
    listenerBorder: hasBorder ? '3px solid var(--listener-comment-border)' : 'none',
    memberBorder: hasBorder ? '3px solid var(--member-comment-border)' : 'none',
    pointerContent: hasBorder ? '""' : 'none',
    autoMarginSide: isLeft ? 'margin-right' : 'margin-left',
    pointerOuterPosition: isLeft ? 'left: -3px; right: auto;' : 'left: auto; right: -3px;',
    pointerOuterTransform: isLeft ? 'rotate(-20deg) skew(20deg, 20deg)' : 'rotate(-70deg) skew(20deg, 20deg)',
    pointerInnerPosition: isLeft ? 'left: 1px; right: auto;' : 'left: auto; right: 1px;',
    pointerInnerTransform: isLeft ? 'rotate(-20deg) skew(20deg, 20deg)' : 'rotate(110deg) skew(20deg, 20deg)',
  }

  for (const key of colorKeys) {
    replacements[key] = config.colors[key]
  }

  const template = config.platform === 'youtube' ? youtubeTemplate : twitchTemplate

  return Object.entries(replacements).reduce((css, [key, value]) => css.replaceAll(`{{${key}}}`, value), template)
}
