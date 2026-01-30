# Creator Subscription Platform

> 🎨 クリエイター向けサブスクリプション型コンテンツ配信プラットフォーム

[![Live Demo](https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge)](https://YOUR_USERNAME.github.io/polar-rocket/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blue?style=flat-square&logo=stripe)](https://stripe.com/)

![Homepage Screenshot](docs/screenshots/homepage.png)

## 📖 概要

クリエイターが有料会員向けに限定コンテンツを配信できるサブスクリプション型プラットフォームです。
**PixivFanbox** や **Patreon** のようなサービスをイメージして設計しました。

## ✨ 主な機能

### 🔐 認証システム
- メールアドレス/パスワード認証
- Google OAuth ログイン
- セッション管理（JWT）

### 📝 コンテンツ管理
- 投稿の作成・編集・削除
- 画像ギャラリー対応
- **ティア別アクセス制御**（無料/プランA/プランB）

### 💳 サブスクリプション決済
- Stripe Checkout による安全な決済
- Customer Portal による自動更新管理
- Webhook によるリアルタイムステータス同期

### 📊 管理画面
- ダッシュボード（収益・会員数・閲覧数）
- 投稿一覧と公開状態管理
- 画像アップロード機能

## 🛠️ 技術スタック

| カテゴリ | 技術 |
|---------|------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Backend** | Supabase (PostgreSQL, Auth, Storage) |
| **Payment** | Stripe (Checkout, Webhooks, Customer Portal) |
| **Hosting** | Vercel |

## 📁 プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証ページ（ログイン/登録）
│   ├── (main)/            # メインコンテンツ
│   ├── admin/             # 管理画面
│   └── api/               # API Routes
├── components/
│   ├── ui/                # shadcn/ui コンポーネント
│   ├── auth/              # 認証コンポーネント
│   ├── posts/             # 投稿関連
│   └── subscription/      # サブスクリプション
├── lib/
│   ├── supabase/          # Supabase クライアント
│   └── stripe/            # Stripe クライアント
└── types/                 # TypeScript 型定義
```

## 🔒 セキュリティ

- **Row Level Security (RLS)**: Supabase のポリシーによるデータアクセス制御
- **Stripe Webhook 署名検証**: 決済イベントの正当性を確認
- **Server Components**: 認証状態に応じたコンテンツ出し分け

## 📸 スクリーンショット

<details>
<summary>ホームページ</summary>

限定コンテンツはぼかし表示され、鍵アイコンでロック状態を示します。

</details>

<details>
<summary>プラン選択ページ</summary>

3つの料金プラン（無料、プランA、プランB）から選択できます。

</details>

<details>
<summary>管理画面</summary>

収益や会員数の統計、投稿の管理が行えます。

</details>

## 🚀 ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/polar-rocket.git
cd polar-rocket

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env.local

# 開発サーバーを起動
npm run dev
```

詳細なセットアップ手順は [README.md](README.md) を参照してください。

## 📄 ライセンス

MIT License

---

<p align="center">
  Made with ❤️ for creators
</p>
