import type { CommentTemplate, GeneratorConfig } from '../generatorConfig'

type CommentPreviewProps = {
  config: GeneratorConfig
}

type PreviewTextComment = {
  name: string
  message: string
  member?: boolean
  showBadge?: boolean
}

const sharedPreviewComment: PreviewTextComment = {
  name: 'リスナー',
  message: 'ここにコメントが入ります。',
}

const twitchPreviewComment: PreviewTextComment = {
  name: 'リスナー',
  message: 'ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。',
  showBadge: true,
}

const youtubePreviewComment: PreviewTextComment = {
  name: 'メンバー',
  message: 'ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。',
  member: true,
  showBadge: true,
}

export function CommentPreview({ config }: CommentPreviewProps) {
  const isTwitch = config.platform === 'twitch'

  return (
    <div className="relative z-0 min-w-0 flex-1 max-lg:w-full max-lg:max-w-none">
      <div className="relative z-0 rounded-4xl bg-background p-8 max-lg:p-4">
        <div className="grid gap-6">
          <TextComment config={config} {...sharedPreviewComment} />

          <div className="grid">
            <div className={`col-start-1 row-start-1 grid gap-6 ${isTwitch ? 'invisible' : ''}`} aria-hidden={isTwitch}>
              <TextComment config={config} {...youtubePreviewComment} />

              <div className="font-sans text-base leading-6 font-bold tracking-wide not-italic">
                <div className="relative flex justify-between rounded-t-lg bg-(--superchat-name-bg) px-5 py-3 text-(--superchat-name)">
                  <p>リスナー </p>
                  <p>￥5,000</p>
                </div>
                <div className="rounded-b-lg bg-(--superchat-comment-bg) px-5 py-3 font-medium text-(--superchat-comment)">
                  <p>
                    ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。
                  </p>
                </div>
              </div>

              <div className="font-sans text-base leading-6 font-bold tracking-wide not-italic">
                <div className="flex gap-2 rounded-t-lg bg-(--membership-name-bg) px-5 py-3 text-(--membership-name)">
                  <p>リスナー</p>
                  <MemberBadge />
                </div>
                <div className="rounded-b-lg bg-(--membership-name-bg) px-5 pt-0 pb-3 font-medium text-(--membership-name)">
                  <p>メンバーシップ へようこそ！</p>
                </div>
              </div>

              <div className="font-sans text-base leading-6 font-bold tracking-wide not-italic">
                <div className="flex gap-2 rounded-t-lg bg-(--membership-name-bg) px-5 pt-3 pb-0 text-(--membership-name)">
                  <p>リスナー</p>
                  <MemberBadge />
                </div>
                <div className="bg-(--membership-name-bg) px-5 text-(--membership-name)">
                  <p>メンバー歴 12 か月</p>
                </div>
                <div className="bg-(--membership-name-bg) px-5 pt-1.5 pb-3 font-medium text-(--membership-name)">
                  <p>メンバーシップ</p>
                </div>
                <div className="rounded-b-lg bg-(--membership-comment-bg) px-5 py-3 text-(--membership-comment)">
                  <p>ここにコメントが入ります。</p>
                </div>
              </div>
            </div>

            <div className={`col-start-1 row-start-1 grid content-start ${isTwitch ? '' : 'invisible'}`} aria-hidden={!isTwitch}>
              <TextComment config={config} {...twitchPreviewComment} />
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
  member?: boolean
  showBadge?: boolean
}

function TextComment({ config, name, message, member = false, showBadge = false }: TextCommentProps) {
  const isRight = config.direction === 'right'
  const isFukidashi = config.template === 'fukidashi'
  const showProfileImage = config.platform !== 'twitch' && config.showProfileImage
  const nameTextColor =
    config.template === 'normal'
      ? member
        ? 'text-(--member-comment)'
        : 'text-(--listener-comment)'
      : member
        ? 'text-(--member-name)'
        : 'text-(--listener-name)'
  const nameBackgroundColor = config.template === 'normal' ? 'bg-transparent' : member ? 'bg-(--member-name-bg)' : 'bg-(--listener-name-bg)'
  const nameHorizontalPadding = config.template === 'normal' ? 'px-0' : 'px-3'
  const messageTextColor = member ? 'text-(--member-comment)' : 'text-(--listener-comment)'
  const messageBackgroundColor = member ? 'bg-(--member-comment-bg)' : 'bg-(--listener-comment-bg)'
  const borderColor = member ? 'border-(--member-comment-border)' : 'border-(--listener-comment-border)'
  const pointerOuterColor = member ? 'bg-(--member-comment-border)' : 'bg-(--listener-comment-border)'
  const pointerInnerColor = member ? 'bg-(--member-comment-bg)' : 'bg-(--listener-comment-bg)'
  const outerPointerDirection = isRight ? '-right-1 -rotate-70 skew-x-20 skew-y-20' : '-left-1 -rotate-20 skew-x-20 skew-y-20'
  const innerPointerDirection = isRight ? 'right-px rotate-110 skew-x-20 skew-y-20' : 'left-px -rotate-20 skew-x-20 skew-y-20'
  const messageTemplateClasses: Record<CommentTemplate, string> = {
    fukidashi: `rounded-4xl px-5 py-3 ${messageBackgroundColor} ${config.showBorder ? `border-3 border-solid ${borderColor}` : 'border-0'}`,
    card: `rounded-4xl px-5 py-3 ${messageBackgroundColor} ${config.showBorder ? `border-3 border-solid ${borderColor}` : 'border-0'}`,
    normal: 'bg-transparent p-0',
  }

  return (
    <div className={`flex gap-3 font-sans text-base leading-6 font-bold not-italic ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`min-w-6 ${showProfileImage ? 'block' : 'hidden'}`}>
        <img className="block size-6 rounded-full object-cover" src="/image/icon.jpg" height="24" width="24" alt="アイコン" />
      </div>
      <div className="grid gap-1.5">
        <div className={config.showName ? 'block' : 'hidden'}>
          <div className={`flex gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex w-fit rounded-2xl py-1 text-xs ${nameHorizontalPadding} ${nameBackgroundColor} ${nameTextColor}`}>{name}</div>
            {showBadge && <MemberBadge />}
          </div>
        </div>
        <div className={`relative block w-fit overflow-visible font-medium ${messageTextColor} ${messageTemplateClasses[config.template]}`}>
          {isFukidashi && (
            <span
              className={`absolute top-1 -z-1 block size-5 rounded-tl-lg rounded-br-lg ${pointerOuterColor} ${
                config.showBorder ? 'block' : 'hidden'
              } ${outerPointerDirection}`}
            />
          )}
          {message}
          {isFukidashi && <span className={`absolute top-2 z-0 block size-4 rounded-tl-sm rounded-br-2xl ${pointerInnerColor} ${innerPointerDirection}`} />}
        </div>
      </div>
    </div>
  )
}

function MemberBadge() {
  return (
    <div className="my-auto size-4.5">
      <img className="block h-auto w-full object-contain" src="/assets/member-badge.svg" alt="メンバーバッジ" />
    </div>
  )
}
