import twitchTemplate from './templates/twitch.txt?raw'
import youtubeTemplate from './templates/youtube.txt?raw'
import { colorKeys, type GeneratorConfig } from './generatorConfig'

export function generateCss(config: GeneratorConfig): string {
  const isLeft = config.direction === 'left'
  const isFukidashi = config.template === 'fukidashi'
  const hasBorder = config.template !== 'normal' && config.showBorder
  const commentBorderRadius = config.template === 'normal' ? '0' : '30px'
  const commentPadding = config.template === 'normal' ? '0' : '12px 20px'
  const replacements: Record<string, string> = {
    animationName: isLeft ? 'popInLeft' : 'popInRight',
    flexDirection: isLeft ? 'row' : 'row-reverse',
    justifyContent: isLeft ? 'start' : 'end',
    authorDisplay: config.showName ? 'block' : 'none',
    iconDisplay: config.showProfileImage ? 'block' : 'none',
    listenerCommentBackground: config.template === 'normal' ? 'transparent' : 'var(--listener-comment-bg)',
    memberCommentBackground: config.template === 'normal' ? 'transparent' : 'var(--member-comment-bg)',
    commentBorderRadius,
    commentPadding,
    listenerBorder: hasBorder ? '3px solid var(--listener-comment-border)' : 'none',
    memberBorder: hasBorder ? '3px solid var(--member-comment-border)' : 'none',
    pointerContent: isFukidashi && hasBorder ? '""' : 'none',
    pointerInnerContent: isFukidashi ? '""' : 'none',
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
