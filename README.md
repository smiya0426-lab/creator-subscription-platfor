# Creator Subscription Platform

クリエイター向けサブスクリプション型コンテンツプラットフォーム

## ✨ 特徴

- 🎨 ダークセレスティアルテーマ（超かぐや姫風）
- ✨ ガラスモーフィズム効果
- 🌟 星空アニメーション
- 💳 サブスクリプション決済対応
- 🔐 会員限定コンテンツ

## 🛠 技術スタック

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🚀 セットアップ

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く

## 📁 プロジェクト構造

```
src/
├── app/
│   ├── globals.css      # グローバルスタイル
│   ├── layout.tsx       # ルートレイアウト
│   └── (main)/
│       ├── layout.tsx   # メインレイアウト（ヘッダー・フッター）
│       ├── page.tsx     # ホームページ
│       └── pricing/
│           └── page.tsx # 料金ページ
└── lib/
    └── utils.ts         # ユーティリティ関数
```

## 🌐 デプロイ

Vercelで簡単にデプロイできます：

1. [vercel.com](https://vercel.com) にアクセス
2. このリポジトリをインポート
3. Deployボタンをクリック

## 📄 ライセンス

MIT
