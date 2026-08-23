import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { GuidePage } from './GuidePage'

describe('GuidePage', () => {
  it('renders the guide markdown with the original structure and images', () => {
    const html = renderToStaticMarkup(<GuidePage />)

    expect(html).toContain('<title>使い方 | fukidashi</title>')
    expect(html).toContain('コメントCSS導入ガイド')
    expect(html).toContain('OBSへのコメントの表示方法')
    expect(html).toContain('よくある質問')
    expect(html).toContain('<blockquote')
    expect(html.match(/<img /g)).toHaveLength(7)
    expect(html).toContain('src="/image/guide/youtube-popout.png"')
    expect(html).toContain('src="/image/guide/obs-refresh-cache.png"')
    expect(html).toContain('alt="YouTubeチャットのメニューから「チャットをポップアウト」を選択する画面"')
    expect(html).toContain('href="https://x.com/asahinapipi_5m"')
  })
})
