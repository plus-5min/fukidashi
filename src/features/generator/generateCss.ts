import { colorKeys, type ColorKey, type GeneratorConfig, type Platform } from './generatorConfig'

const platformColorKeys: Record<Platform, readonly ColorKey[]> = {
  youtube: colorKeys,
  twitch: ['listener-name', 'listener-name-bg', 'listener-comment', 'listener-comment-bg', 'listener-comment-border'],
}

const normalPlatformColorKeys: Record<Platform, readonly ColorKey[]> = {
  youtube: [
    'listener-name',
    'listener-name-bg',
    'listener-comment',
    'member-name',
    'member-name-bg',
    'member-comment',
    'superchat-name',
    'superchat-name-bg',
    'superchat-comment',
    'superchat-comment-bg',
    'membership-name',
    'membership-name-bg',
    'membership-comment',
    'membership-comment-bg',
  ],
  twitch: ['listener-name', 'listener-name-bg', 'listener-comment'],
}

function formatVariables(variables: Readonly<Record<string, string>>): string {
  return Object.entries(variables)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join('\n')
}

export function generateCss(config: GeneratorConfig, stylesheetOrigin: string): string {
  const isLeft = config.direction === 'left'
  const isFukidashi = config.template === 'fukidashi'
  const hasBorder = config.template !== 'normal' && config.showBorder

  const layoutVariables: Record<string, string> = {}

  if (!isLeft) {
    layoutVariables['animation-name'] = 'popInRight'
    layoutVariables['auto-margin-inline'] = 'auto 0'

    if (config.platform === 'youtube') {
      layoutVariables['message-flex-direction'] = 'row-reverse'
      layoutVariables['message-justify-content'] = 'end'
    }
  }

  if (!config.showName) {
    layoutVariables['name-display'] = 'none'
  }

  if (config.platform === 'youtube' && config.showProfileImage) {
    const profileImageSize = config.template === 'normal' ? '24px' : '36px'

    layoutVariables['profile-image-display'] = 'block'

    if (config.showName) {
      layoutVariables['name-row-min-height'] = profileImageSize
    }

  }

  if (!hasBorder && config.template !== 'normal') {
    layoutVariables['comment-border-width'] = '0'

    if (isFukidashi) {
      layoutVariables['pointer-display'] = 'none'
    }
  }

  if (isFukidashi && !isLeft) {
    layoutVariables['pointer-inner-inset-inline'] = 'auto 1px'
    layoutVariables['pointer-inner-transform'] = 'rotate(110deg) skew(20deg, 20deg)'

    if (hasBorder) {
      layoutVariables['pointer-outer-inset-inline'] = 'auto -3px'
      layoutVariables['pointer-outer-transform'] = 'rotate(-70deg) skew(20deg, 20deg)'
    }
  }

  const activeColorKeys = config.template === 'normal' ? normalPlatformColorKeys[config.platform] : platformColorKeys[config.platform]
  const colorVariables = Object.fromEntries(
    activeColorKeys.map((key) => {
      const textCommentColorKey = key === 'listener-name' ? 'listener-comment' : key === 'member-name' ? 'member-comment' : null
      const isTextCommentNameBackground = key === 'listener-name-bg' || key === 'member-name-bg'
      let value = config.colors[key]

      if (config.template === 'normal' && textCommentColorKey) {
        value = config.colors[textCommentColorKey]
      } else if (config.template === 'normal' && isTextCommentNameBackground) {
        value = 'transparent'
      }

      return [key, value]
    }),
  )
  const stylesheetUrl = `${stylesheetOrigin}/css/v1/${config.platform}/${config.template}.css`
  const variables = [layoutVariables, colorVariables].map(formatVariables).filter(Boolean).join('\n\n')

  return `@import url("${stylesheetUrl}");

:root {
${variables}
}`
}
