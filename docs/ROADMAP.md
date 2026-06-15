# RPG風ポートフォリオサイト — 開発ロードマップ

> このファイルは「何を作るか」の正本。Phase の定義はここを優先する。
> 進捗の詳細・次の作業は docs/HANDOFF.md を参照。

---

## サイト概要（暫定）

- 形式: HTML + CSS + JavaScript（フレームワークなし・静的サイト）
- コンセプト: RPG のコマンド選択 UI でページを切り替える就活用ポートフォリオ
- 主ゴール: 採用担当者に「ゲームエンジニア志望」「人間味」「制作姿勢」が伝わるサイトを公開する

### 1 回の訪問の流れ（目標 UX）

1. TOP（ホーム） — 背景 + 床 + キャラクターが表示される
2. コマンドメニュー — 吹き出し風パネルに About / Skills / Works / Contact が並ぶ
3. コマンド選択 — 選んだ項目の詳細画面に切り替わる（コマンドは非表示）
4. TOP に戻る — 「戻る」操作で TOP に戻り、コマンドを再表示

### 画面状態（設計の中心）

| 状態 ID | 画面 | コマンド表示 | 備考 |
|---------|------|-------------|------|
| top | TOP（キャラ＋背景） | 表示 | 初期画面 |
| about | 自己紹介 | 非表示 | |
| skills | スキル | 非表示 | |
| works | 制作実績 | 非表示 | |
| contact | 連絡先 | 非表示 | |

※ 追加候補（未決定）: timeline / github

### 技術方針（初心者向け）

- 1 ページ構成 — index.html 1 枚 + JavaScript で画面切り替え
- 状態は 1 変数で管理 — 例: let currentScreen = 'top'
- TOP シーンは 3 レイヤー重ね — 背景（CSS background）/ 床（img）/ キャラ（img）
- 参考実装: AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/（配色・文言・コマンド UI）

### やらないこと（初期版）

- React / Vue などのフレームワーク導入
- バックエンド・データベース
- キャラの自由移動・マップ歩行
- ゲーム本編のような戦闘システム

---

## メインプロジェクト

| 項目 | パス |
|------|------|
| リポジトリルート | Takahashi_Portfolio_WebSite_260615/ |
| 開発対象（本番・現行） | リポジトリ直下（index.html がある場所） |
| 引き継ぎ | docs/HANDOFF.md |
| ロードマップ | docs/ROADMAP.md（このファイル） |
| エントリ | index.html |
| スタイル | css/main_style.css |
| スクリプト | js/main_script.js（未接続・空） |
| 画像 | assets/images/ |
| 参考サイト | AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/ |
| 旧作業フォルダ（重複） | HandMade_Takahashi_PortfolioSite/PortfolioSite/ |

### 画像アセット（配置済み）

| 用途 | ファイル名 | パス |
|------|-----------|------|
| 背景（空） | bg.png | assets/images/bg.png |
| 床 | floor.png | assets/images/floor.png |
| キャラクター | character.png | assets/images/character.png |

---

## 現状の実装状況（2026-06-15・コード基準）

### Phase 0 — 準備・設計（完了）

- [x] サイトコンセプト決定（RPG 風コマンド UI）
- [x] 参考サイトの用意（AI 作成版）
- [x] 使用画像の選定・配置
- [x] フォルダ構成（css/, js/, assets/images/, docs/）
- [x] コマンド項目の暫定確定（About / Skills / Works / Contact）
- [x] ファイル名決定（main_style.css / main_script.js）

### Phase 1 — 骨組み（HTML + 画像表示）（ほぼ完了）

- [x] index.html 作成（#app / #screen-top）
- [x] css/main_style.css 作成（リセット・コメント付き）
- [x] 背景 .scene-bg（CSS background-image）
- [x] 床 .scene-floor（img + translateY で位置調整）
- [x] キャラ .scene-character（img + bottom / width で位置調整）
- [x] 3 レイヤーの z-index 重ね（0: 背景 / 1: 床 / 2: キャラ）
- [ ] 他画面用 .screen の非表示 CSS（.screen { display:none } 等）※HTML に is-active あり、CSS 未定義
- [ ] meta description / OGP タグ（参考サイトにはある）
- [ ] スマホ幅での見え方の最終確認

### Phase 2 — コマンド UI（未着手）

- [ ] 吹き出し風コマンドパネルの HTML / CSS
- [ ] コマンド項目: About / Skills / Works / Contact
- [ ] ホバー・フォーカス時の見た目
- [ ] TOP のときだけコマンドを表示する CSS

### Phase 3 — 画面切り替え（JavaScript）（未着手）

- [ ] js/main_script.js に showScreen() 等を実装（現状: 空ファイル）
- [ ] index.html から script を読み込む（現状: コメントアウト）
- [ ] currentScreen を 1 変数で管理
- [ ] コマンドクリック → 詳細画面へ
- [ ] 「戻る」ボタン → top へ（コマンド再表示）
- [ ] 詳細表示中はコマンドパネルを非表示
- [ ] #screen-about 等の HTML 箱を追加

### Phase 4 — 各画面の中身（未着手）

- [ ] About — 自己紹介・制作姿勢
- [ ] Skills — C++ / DXLib / Tools など
- [ ] Works — 制作実績カード
- [ ] Contact — メールリンク
- [ ] 参考サイトから文言流用・整形

### Phase 5 — 見た目・UX 調整（未着手）

- [ ] スマホ対応（キャラサイズ・コマンド位置）
- [ ] 画面切り替え時のフェード（任意）
- [ ] prefers-reduced-motion 対応
- [ ] アクセシビリティ（aria-label、キーボード操作）

### Phase 6 — 公開準備（未着手）

- [ ] メールアドレス・OGP URL の実データ化
- [ ] ogp.png 追加（任意）
- [ ] GitHub Pages で公開
- [ ] スマホ・PC で最終確認

### Phase 7 — 拡張（任意・後回し）

- [ ] Timeline 画面
- [ ] GitHub API でリポジトリ一覧
- [ ] キャラの待機アニメーション（CSS）
- [ ] BGM / SE

---

## Phase 実装ステップ（詳細は HANDOFF 参照）

| Step | 内容 | 主なファイル | 状態 |
|------|------|-------------|------|
| 0 | フォルダ・画像 | assets/images/ | 完了 |
| 1 | HTML + 3 レイヤー表示 | index.html, main_style.css | ほぼ完了 |
| 2 | コマンド UI | index.html, main_style.css | 次 |
| 3 | 画面切り替え | main_script.js | 未着手 |
| 4 | コンテンツ | index.html | 未着手 |
| 5 | レスポンシブ | main_style.css | 未着手 |
| 6 | 公開 | GitHub Pages | 未着手 |

---

## 参考サイトから借りられるもの

| 参考元 | 借りるもの | 借りないもの |
|--------|-----------|-------------|
| index.html | About / Skills / Works / Contact の文言、meta タグ | ヘッダーナビ・縦スクロール 1 ページ構成 |
| style.css | 色変数、カード・ボタン、.command-panel | ヒーロー＋全セクション縦並び |
| script.js | GitHub API 部分（Phase 7） | スクロール連動ナビ |

---

## 注意メモ（食い違い・不具合になりそうな点）

- [!] docs/ROADMAP.md が 2D アクションゲーム（DxLib）の内容になっていた — 本ファイルで差し替え必要（ポートフォリオ用が正本）。
- [!] 開発パスの食い違い — 旧計画は HandMade_Takahashi_PortfolioSite/PortfolioSite/。現行コードはリポジトリ直下。作業は直下に統一推奨。
- [!] JS ファイル名の食い違い — 実ファイルは js/main_script.js。index.html のコメントは js/main.js と記載。
- [!] main_script.js は空で、index.html からも未読み込み（コメントアウト）。
- [!] HTML に class="screen is-active" があるが、.screen の display 切替 CSS が main_style.css に未定義（他画面追加前に足すと安全）。
- [!] CSS コメントと実値のズレ — .scene-floor のコメントは translateY(8%) だが実装は 16%。.scene-character のコメントは bottom 28%〜34% だが実装は 8%。
- [i] 床・キャラ位置は微調整済み（translateY 16%、bottom 8%、width min(16vw,140px)）。
- [i] JavaScript 歴は超初心者 — Phase 3 は showScreen() から 1 関数ずつ。
- [i] HandMade_Takahashi_PortfolioSite/PortfolioSite/ に同名画像・空 CSS/JS が残存（重複）。

---

## 開発 Phase 定義

| Phase | 状態 | 概要 |
|-------|------|------|
| 0 | 完了 | 準備・設計・画像配置 |
| 1 | ほぼ完了 | HTML + 3 レイヤー TOP 表示 |
| 2 | 未着手 | コマンド UI |
| 3 | 未着手 | JS 画面切り替え |
| 4 | 未着手 | コンテンツ |
| 5 | 未着手 | 見た目・UX |
| 6 | 未着手 | 公開 |
| 7 | 未着手 | 拡張（任意） |

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-06-15 | 初版作成 |
| 2026-06-15 | 現行コード調査。Phase 1 ほぼ完了。開発パスはリポジトリ直下に移行。 |