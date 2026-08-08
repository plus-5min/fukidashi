import type { GeneratorConfig, Platform } from '../generatorConfig'

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
    <div className="relative z-0 w-full max-w-[536px] max-[1080px]:max-w-none">
      <div className="sticky top-16 z-0 rounded-[20px] bg-[#f5f5f5] p-10 max-[768px]:p-5">
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
  const showProfileImage = config.platform !== 'twitch' && config.showProfileImage
  const nameColors = member ? 'bg-[var(--member-name-bg)] text-[var(--member-name)]' : 'bg-[var(--listener-name-bg)] text-[var(--listener-name)]'
  const messageColors = member ? 'bg-[var(--member-comment-bg)] text-[var(--member-comment)]' : 'bg-[var(--listener-comment-bg)] text-[var(--listener-comment)]'
  const borderColor = member ? 'border-[var(--member-comment-border)]' : 'border-[var(--listener-comment-border)]'
  const pointerOuterColor = member ? 'bg-[var(--member-comment-border)]' : 'bg-[var(--listener-comment-border)]'
  const pointerInnerColor = member ? 'bg-[var(--member-comment-bg)]' : 'bg-[var(--listener-comment-bg)]'
  const outerPointerDirection = isRight
    ? 'right-[-3px] [transform:rotate(-70deg)_skew(20deg,20deg)]'
    : 'left-[-3px] [transform:rotate(-20deg)_skew(20deg,20deg)]'
  const innerPointerDirection = isRight ? 'right-px [transform:rotate(110deg)_skew(20deg,20deg)]' : 'left-px [transform:rotate(-20deg)_skew(20deg,20deg)]'

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
            <div className={`flex w-fit rounded-[18px] px-3 py-1 text-xs ${nameColors}`}>{name}</div>
            {showBadge && <MemberBadge />}
          </div>
        </div>
        <div
          className={`relative block w-fit overflow-visible rounded-[30px] px-5 py-3 font-medium ${messageColors} ${config.showBorder ? `border-[3px] border-solid ${borderColor}` : 'border-0'}`}
        >
          <span
            className={`absolute top-1 z-[-1] block h-[21px] w-[21px] rounded-tl-[7px] rounded-br-[6px] ${pointerOuterColor} ${
              config.showBorder ? 'block' : 'hidden'
            } ${outerPointerDirection}`}
          />
          {message}
          <span className={`absolute top-[7px] z-0 block size-[18px] rounded-tl-sm rounded-br-[20px] ${pointerInnerColor} ${innerPointerDirection}`} />
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
