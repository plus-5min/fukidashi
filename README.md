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
