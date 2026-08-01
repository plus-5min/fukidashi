import type { CSSProperties } from 'react'

import type {
  Direction,
  GeneratorConfig,
} from '../generatorConfig'

type CommentPreviewProps = {
  config: GeneratorConfig
}

export function CommentPreview({ config }: CommentPreviewProps) {
  const isTwitch = config.platform === 'twitch'

  return (
    <div className="comment-contents">
      <div className="comment-inner">
        <div className="comment-column">
          <TextComment
            config={config}
            name="リスナー"
            message="ここにコメントが入ります。"
          />

          <TextComment
            config={config}
            name="リスナー"
            message="ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。"
            className={`twitch-member${isTwitch ? '' : ' is-twitch'}`}
            showBadge
          />

          <TextComment
            config={config}
            name="メンバー"
            message="ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。"
            className={isTwitch ? 'is-twitch' : undefined}
            member
            showBadge
          />

          <div className={`superchat-contents${isTwitch ? ' is-twitch' : ''}`}>
            <div className="superchat-header">
              <p>リスナー </p>
              <p>￥5,000</p>
            </div>
            <div className="superchat-message">
              <p>
                ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。
              </p>
            </div>
          </div>

          <div className={`membership-contents${isTwitch ? ' is-twitch' : ''}`}>
            <div className="membership-channel">
              <p>リスナー</p>
              <MemberBadge />
            </div>
            <div className="membership-text">
              <p>メンバーシップ へようこそ！</p>
            </div>
          </div>

          <div
            className={`membership-comment-contents${isTwitch ? ' is-twitch' : ''}`}
          >
            <div className="membership-comment-channel">
              <p>リスナー</p>
              <MemberBadge />
            </div>
            <div className="membership-history">
              <p>メンバー歴 12 か月</p>
            </div>
            <div className="membership-name">
              <p>メンバーシップ</p>
            </div>
            <div className="membership-comment">
              <p>ここにコメントが入ります。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type TextCommentProps = {
  config: GeneratorConfig
  name: string
  message: string
  className?: string
  member?: boolean
  showBadge?: boolean
}

function TextComment({
  config,
  name,
  message,
  className,
  member = false,
  showBadge = false,
}: TextCommentProps) {
  const isRight = config.direction === 'right'
  const baseClass = member ? 'member-contents' : 'listener-contents'
  const borderColor = member
    ? 'var(--member-comment-border)'
    : 'var(--listener-comment-border)'

  return (
    <div
      className={`${baseClass}${className ? ` ${className}` : ''}`}
      style={{ flexDirection: isRight ? 'row-reverse' : 'row' }}
    >
      <div
        className={`comment-icon${config.platform === 'twitch' ? ' is-twitch' : ''}`}
        style={{ display: config.showProfileImage ? 'block' : 'none' }}
      >
        <img src="/assets/avatar.svg" height="24" width="24" alt="アイコン" />
      </div>
      <div className="comment-container">
        <div
          className="comment-channel"
          style={{ display: config.showName ? 'block' : 'none' }}
        >
          <div
            className="comment-channel-block"
            style={{ justifyContent: isRight ? 'end' : 'start' }}
          >
            <div className="comment-name">{name}</div>
            {showBadge && <MemberBadge />}
          </div>
        </div>
        <div
          className="comment-message"
          style={{
            border: config.showBorder ? `3px solid ${borderColor}` : 'none',
          }}
        >
          <span
            className="comment-before"
            style={pointerStyle(config.direction, true, config.showBorder)}
          />
          {message}
          <span
            className="comment-after"
            style={pointerStyle(config.direction, false, true)}
          />
        </div>
      </div>
    </div>
  )
}

function pointerStyle(
  direction: Direction,
  outer: boolean,
  visible: boolean,
): CSSProperties {
  const isLeft = direction === 'left'
  const offset = outer ? (isLeft ? '-3px' : '-3px') : '1px'

  return {
    display: visible ? 'block' : 'none',
    left: isLeft ? offset : 'auto',
    right: isLeft ? 'auto' : offset,
    transform: outer
      ? isLeft
        ? 'rotate(-20deg) skew(20deg, 20deg)'
        : 'rotate(-70deg) skew(20deg, 20deg)'
      : isLeft
        ? 'rotate(-20deg) skew(20deg, 20deg)'
        : 'rotate(110deg) skew(20deg, 20deg)',
  }
}

function MemberBadge() {
  return (
    <div className="member-bagde">
      <img src="/assets/member-badge.svg" alt="メンバーバッジ" />
    </div>
  )
}
