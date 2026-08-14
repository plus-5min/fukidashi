import type { CommentTemplate, GeneratorConfig, Platform } from '../generatorConfig'

type CommentPreviewProps = {
  config: GeneratorConfig
}

type PreviewTextComment = {
  name: string
  message: string
  platform?: Platform
  member?: boolean
  showBadge?: boolean
}

const previewTextComments: PreviewTextComment[] = [
  {
    name: 'リスナー',
    message: 'ここにコメントが入ります。',
  },
  {
    name: 'リスナー',
    message: 'ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。',
    platform: 'twitch',
    showBadge: true,
  },
  {
    name: 'メンバー',
    message: 'ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。',
    platform: 'youtube',
    member: true,
    showBadge: true,
  },
]

export function CommentPreview({ config }: CommentPreviewProps) {
  const isTwitch = config.platform === 'twitch'

  return (
    <div className="relative z-0 min-w-0 flex-1 max-lg:w-full max-lg:max-w-none">
      <div className="relative z-0 rounded-4xl bg-secondary p-8 max-lg:p-4">
        <div className="grid gap-3">
          {previewTextComments.map(({ name, message, platform, member, showBadge }) => (
            <TextComment
              key={`${platform ?? 'all'}-${name}`}
              config={config}
              name={name}
              message={message}
              hidden={platform !== undefined && platform !== config.platform}
              member={member}
              showBadge={showBadge}
            />
          ))}

          <div className={`font-sans text-base leading-6 font-bold tracking-[0.5px] not-italic ${isTwitch ? 'hidden' : ''}`}>
            <div className="relative flex justify-between rounded-t-[10px] bg-[var(--superchat-name-bg)] px-5 py-3 text-[var(--superchat-name)]">
              <p>リスナー </p>
              <p>￥5,000</p>
            </div>
            <div className="rounded-b-[10px] bg-[var(--superchat-comment-bg)] px-5 py-3 font-medium text-[var(--superchat-comment)]">
              <p>
                ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。
              </p>
            </div>
          </div>

          <div className={`font-sans text-base leading-6 font-bold tracking-[0.5px] not-italic ${isTwitch ? 'hidden' : ''}`}>
            <div className="flex gap-2 rounded-t-[10px] bg-[var(--membership-name-bg)] px-5 py-3 text-[var(--membership-name)]">
              <p>リスナー</p>
              <MemberBadge />
            </div>
            <div className="rounded-b-[10px] bg-[var(--membership-name-bg)] px-5 pt-0 pb-3 font-medium text-[var(--membership-name)]">
              <p>メンバーシップ へようこそ！</p>
            </div>
          </div>

          <div className={`font-sans text-base leading-6 font-bold tracking-[0.5px] not-italic ${isTwitch ? 'hidden' : ''}`}>
            <div className="flex gap-2 rounded-t-[10px] bg-[var(--membership-name-bg)] px-5 pt-3 pb-0 text-[var(--membership-name)]">
              <p>リスナー</p>
              <MemberBadge />
            </div>
            <div className="bg-[var(--membership-name-bg)] px-5 text-[var(--membership-name)]">
              <p>メンバー歴 12 か月</p>
            </div>
            <div className="bg-[var(--membership-name-bg)] px-5 pt-1.5 pb-3 font-medium text-[var(--membership-name)]">
              <p>メンバーシップ</p>
            </div>
            <div className="rounded-b-[10px] bg-[var(--membership-comment-bg)] px-5 py-3 text-[var(--membership-comment)]">
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
  hidden?: boolean
  member?: boolean
  showBadge?: boolean
}

function TextComment({ config, name, message, hidden = false, member = false, showBadge = false }: TextCommentProps) {
  const isRight = config.direction === 'right'
  const isFukidashi = config.template === 'fukidashi'
  const showProfileImage = config.platform !== 'twitch' && config.showProfileImage
  const nameTextColor =
    config.template === 'normal'
      ? member
        ? 'text-[var(--member-comment)]'
        : 'text-[var(--listener-comment)]'
      : member
        ? 'text-[var(--member-name)]'
        : 'text-[var(--listener-name)]'
  const nameBackgroundColor = config.template === 'normal' ? 'bg-transparent' : member ? 'bg-[var(--member-name-bg)]' : 'bg-[var(--listener-name-bg)]'
  const nameHorizontalPadding = config.template === 'normal' ? 'px-0' : 'px-3'
  const messageTextColor = member ? 'text-[var(--member-comment)]' : 'text-[var(--listener-comment)]'
  const messageBackgroundColor = member ? 'bg-[var(--member-comment-bg)]' : 'bg-[var(--listener-comment-bg)]'
  const borderColor = member ? 'border-[var(--member-comment-border)]' : 'border-[var(--listener-comment-border)]'
  const pointerOuterColor = member ? 'bg-[var(--member-comment-border)]' : 'bg-[var(--listener-comment-border)]'
  const pointerInnerColor = member ? 'bg-[var(--member-comment-bg)]' : 'bg-[var(--listener-comment-bg)]'
  const outerPointerDirection = isRight
    ? 'right-[-3px] [transform:rotate(-70deg)_skew(20deg,20deg)]'
    : 'left-[-3px] [transform:rotate(-20deg)_skew(20deg,20deg)]'
  const innerPointerDirection = isRight ? 'right-px [transform:rotate(110deg)_skew(20deg,20deg)]' : 'left-px [transform:rotate(-20deg)_skew(20deg,20deg)]'
  const messageTemplateClasses: Record<CommentTemplate, string> = {
    fukidashi: `rounded-[30px] px-5 py-3 ${messageBackgroundColor} ${config.showBorder ? `border-[3px] border-solid ${borderColor}` : 'border-0'}`,
    card: `rounded-[30px] px-5 py-3 ${messageBackgroundColor} ${config.showBorder ? `border-[3px] border-solid ${borderColor}` : 'border-0'}`,
    normal: 'bg-transparent p-0',
  }

  return (
    <div
      className={`gap-3 font-sans text-base leading-6 font-bold tracking-[0.5px] not-italic ${
        hidden ? 'hidden' : 'flex'
      } ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`min-w-[26px] ${showProfileImage ? 'block' : 'hidden'}`}>
        <img className="block size-[26px] rounded-[26px]" src="/assets/avatar.svg" height="24" width="24" alt="アイコン" />
      </div>
      <div className="grid gap-1.5">
        <div className={config.showName ? 'block' : 'hidden'}>
          <div className={`flex gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex w-fit rounded-[18px] py-1 text-xs ${nameHorizontalPadding} ${nameBackgroundColor} ${nameTextColor}`}>{name}</div>
            {showBadge && <MemberBadge />}
          </div>
        </div>
        <div className={`relative block w-fit overflow-visible font-medium ${messageTextColor} ${messageTemplateClasses[config.template]}`}>
          {isFukidashi && (
            <span
              className={`absolute top-1 z-[-1] block h-[21px] w-[21px] rounded-tl-[7px] rounded-br-[6px] ${pointerOuterColor} ${
                config.showBorder ? 'block' : 'hidden'
              } ${outerPointerDirection}`}
            />
          )}
          {message}
          {isFukidashi && (
            <span className={`absolute top-[7px] z-0 block size-[18px] rounded-tl-sm rounded-br-[20px] ${pointerInnerColor} ${innerPointerDirection}`} />
          )}
        </div>
      </div>
    </div>
  )
}

function MemberBadge() {
  return (
    <div className="my-auto size-[18px]">
      <img className="block h-auto w-full object-contain" src="/assets/member-badge.svg" alt="メンバーバッジ" />
    </div>
  )
}
