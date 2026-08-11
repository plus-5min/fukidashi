# fukidashi

YouTube / Twitch向けコメントCSSジェネレーターのReact版です。

## Tech stack

- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- Vitest

## Development

```bash
npm install
npm run dev
```

## Commands

```bash
npm run dev       # 開発サーバー
npm run build     # 型チェックと本番ビルド
npm run lint      # ESLint
npm test          # テスト
npm run test:watch
```

Cloudflare Pagesでは、ビルドコマンドに`npm run build`、出力先に`dist`を指定します。

## Hosted CSS

ジェネレーターがコピーするCSSは、設定用の`:root`変数と次の配信CSSへの`@import`で構成します。

- `public/css/v1/youtube.css`
- `public/css/v1/twitch.css`
- `public/css/v1/{youtube,twitch}/{fukidashi,card,normal}.css`

`v1`の内容を変更すると、そのURLを利用中の既存CSSにも反映されます。互換性を壊す変更では新しいバージョンのパスを追加してください。
