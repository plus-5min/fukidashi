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
      <div className="relative z-0 rounded-4xl tracking-[0.5px] bg-background p-8 max-lg:p-4">
        <div className="grid gap-6">
          <TextComment config={config} {...sharedPreviewComment} />

          <div className="grid">
            <div className={`col-start-1 row-start-1 grid gap-6 ${isTwitch ? 'invisible' : ''}`} aria-hidden={isTwitch}>
              <TextComment config={config} {...youtubePreviewComment} />

              <div className="font-sans text-base leading-6 font-medium not-italic">
                <div className="relative flex items-center justify-between rounded-t-[20px] bg-(--superchat-name-bg) px-6 py-4 text-(--superchat-name)">
                  <p>リスナー </p>
                  <p className="font-inter rounded-full bg-(--superchat-name) px-3 py-2 text-xs leading-none text-(--superchat-name-bg)">￥5,000</p>
                </div>
                <div className="rounded-b-[20px] bg-(--superchat-comment-bg) px-6 py-4 font-medium text-(--superchat-comment)">
                  <p>
                    ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。
                  </p>
                </div>
              </div>

              <div className="font-sans text-base leading-6 font-medium not-italic">
                <div className="flex gap-2 rounded-t-[20px] bg-(--membership-name-bg) px-6 py-4 text-(--membership-name)">
                  <p>リスナー</p>
                  <MemberBadge />
                </div>
                <div className="rounded-b-[20px] bg-(--membership-name-bg) px-6 pt-0 pb-4 font-medium text-(--membership-name)">
                  <p>メンバーシップ へようこそ！</p>
                </div>
              </div>

              <div className="font-sans text-base leading-6 font-medium not-italic">
                <div className="flex gap-2 rounded-t-[20px] bg-(--membership-name-bg) px-6 pt-4 pb-0 text-(--membership-name)">
                  <p>リスナー</p>
                  <MemberBadge />
                </div>
                <div className="bg-(--membership-name-bg) px-6 text-(--membership-name)">
                  <p>メンバー歴 12 か月</p>
                </div>
                <div className="bg-(--membership-name-bg) px-6 pt-1.5 pb-4 font-medium text-(--membership-name)">
                  <p>メンバーシップ</p>
                </div>
                <div className="rounded-b-[20px] bg-(--membership-comment-bg) px-6 py-4 text-(--membership-comment)">
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
  const isNormal = config.template === 'normal'
  const profileImageMinWidth = isNormal ? 'min-w-6' : 'min-w-9'
  const profileImageClass = isNormal ? 'size-6' : 'size-9'
  const profileImageSize = isNormal ? 24 : 36
  const nameFontSize = isNormal ? 'text-base' : 'text-xs'
  const nameVerticalPadding = isNormal ? 'py-0' : 'py-1'
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
  const outerPointerDirection = isRight
    ? 'right-[-3px] [transform:rotate(-70deg)_skew(20deg,20deg)]'
    : 'left-[-3px] [transform:rotate(-20deg)_skew(20deg,20deg)]'
  const innerPointerDirection = isRight ? 'right-px [transform:rotate(110deg)_skew(20deg,20deg)]' : 'left-px [transform:rotate(-20deg)_skew(20deg,20deg)]'
  const messageTemplateClasses: Record<CommentTemplate, string> = {
    fukidashi: `rounded-[30px] px-5 py-3 ${messageBackgroundColor} ${config.showBorder ? `border-[3px] border-solid ${borderColor}` : 'border-0'}`,
    card: `rounded-[20px] px-6 py-4 text-left ${messageBackgroundColor} ${config.showBorder ? `border-[3px] border-solid ${borderColor}` : 'border-0'}`,
    normal: 'bg-transparent p-0',
  }

  return (
    <div className={`flex gap-2 font-sans text-base leading-6 font-medium not-italic ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`${profileImageMinWidth} ${showProfileImage ? 'block' : 'hidden'}`}>
        <img
          className={`block ${profileImageClass} rounded-full object-cover`}
          src="/image/icon.jpg"
          height={profileImageSize}
          width={profileImageSize}
          alt="アイコン"
        />
      </div>
      <div className="grid gap-1.5">
        <div className={config.showName ? 'block' : 'hidden'}>
          <div className={`flex items-center gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`flex w-fit rounded-[18px] ${nameVerticalPadding} ${nameFontSize} ${nameHorizontalPadding} ${nameBackgroundColor} ${nameTextColor}`}
            >
              {name}
            </div>
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
    <div className="my-auto size-4.5">
      <img className="block h-auto w-full object-contain" src="/assets/member-badge.svg" alt="メンバーバッジ" />
    </div>
  )
}
