# Creator Subscription Platform

クリエイター向けサブスクリプション型コンテンツプラットフォーム。有料会員のみが限定コンテンツを閲覧できるクローズドコミュニティを構築できます。

## 🚀 技術スタック

- **Frontend**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend/Auth/DB**: Supabase
- **Payment**: Stripe
- **Hosting**: Vercel

## 📦 機能

### ユーザー機能
- ✅ メールアドレス/パスワード認証
- ✅ Google OAuth ログイン
- ✅ プランに応じたコンテンツ閲覧制限
- ✅ Stripe によるサブスクリプション決済
- ✅ マイページでのプラン管理

### 管理者機能
- ✅ ダッシュボード（統計表示）
- ✅ 投稿作成・編集
- ✅ 画像アップロード
- ✅ 公開範囲設定（無料/プランA/プランB）

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` を `.env.local` にコピーし、以下の値を設定します：

```bash
cp .env.example .env.local
```

#### Supabase
1. [Supabase](https://supabase.com) でプロジェクトを作成
2. Project Settings > API から URL と anon key を取得
3. Project Settings > API から service_role key を取得

#### Stripe
1. [Stripe](https://stripe.com) でアカウントを作成
2. Developers > API Keys から Publishable key と Secret key を取得
3. 商品とプランを作成し、Price ID を取得
4. Webhook を設定し、Webhook Secret を取得

### 3. データベースのセットアップ

Supabase の SQL Editor で `supabase/schema.sql` を実行します。

### 4. Stripe Webhook の設定

Stripe Dashboard で以下のイベントを購読する Webhook を作成：
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

Webhook URL: `https://your-domain.com/api/stripe/webhook`

### 5. 管理者権限の設定

最初にログインした後、Supabase の Table Editor で `profiles` テーブルの該当ユーザーの `is_admin` を `true` に設定します。

### 6. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 で確認できます。

## 📁 ディレクトリ構成

```
src/
├── app/
│   ├── (auth)/           # 認証ページ
│   ├── (main)/           # メインコンテンツ
│   ├── admin/            # 管理画面
│   ├── api/              # API Routes
│   └── auth/             # 認証コールバック
├── components/
│   ├── ui/               # shadcn/ui コンポーネント
│   ├── auth/             # 認証コンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── posts/            # 投稿関連コンポーネント
│   └── subscription/     # サブスクリプションコンポーネント
├── lib/
│   ├── supabase/         # Supabase クライアント
│   ├── stripe/           # Stripe クライアント
│   └── utils.ts          # ユーティリティ関数
└── types/                # TypeScript 型定義
```

## 🔒 セキュリティ

- **Row Level Security (RLS)**: データベースレベルでのアクセス制御
- **Stripe Webhook 署名検証**: 不正なリクエストを防止
- **Server Components**: 認証状態に応じたコンテンツ出し分け

## 📝 プラン設定

デフォルトのプラン構成：

| Tier | プラン名 | 価格 | 説明 |
|------|---------|------|------|
| 0 | 無料会員 | ¥0 | 無料コンテンツのみ |
| 1 | プランA | ¥500/月 | プランA以下のコンテンツ |
| 2 | プランB | ¥1,000/月 | すべてのコンテンツ |

## 🚀 デプロイ

### Vercel へのデプロイ

1. GitHub にリポジトリをプッシュ
2. Vercel でプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

## 📄 ライセンス

MIT
