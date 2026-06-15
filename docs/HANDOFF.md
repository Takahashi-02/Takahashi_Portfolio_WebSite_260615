# 開発引き継ぎ（HANDOFF）

> 作業のたびにこのファイルを更新する。
> 別 PC・別エージェントは、まずこのファイルを読んで続きを行う。

---

## 最終更新

- 日付: 2026-06-15
- 作業 PC / 担当: 髙橋勇喜（任意）
- 現在の Phase: Phase 1 ほぼ完了 → Phase 2（コマンド UI）が次
- ステータス: TOP 画面（背景・床・キャラ）表示まで動作。コマンド・画面切り替えは未実装
- 設計メモ: 本番はリポジトリ直下。3 レイヤー構成。JS は main_script.js（未接続）

---

## いま動いていること（1〜3行）

index.html をブラウザで開くと、背景（bg.png）・床（floor.png）・キャラ（character.png）が重なって TOP 画面が表示される。コマンドメニュー・詳細画面・JavaScript の画面切り替えはまだない。

---

## 完了したこと（チェックリスト）

### Phase 0：準備・設計
- [x] サイトコンセプト決定（RPG 風・コマンド選択）
- [x] 画面フロー方針（TOP → 詳細 → TOP でコマンド再表示）
- [x] 使用画像の選定・配置
- [x] 参考サイトの配置（AIMade_Takahashi_PortfolioSite/）
- [x] フォルダ構成（css/, js/, assets/images/, docs/）
- [x] コマンド項目の暫定確定（About / Skills / Works / Contact）
- [x] ファイル名決定（main_style.css, main_script.js）

### Phase 1：骨組み
- [x] index.html（#app, #screen-top, 3 レイヤー）
- [x] css/main_style.css（リセット + レイヤー配置）
- [x] 背景 .scene-bg
- [x] 床 .scene-floor
- [x] キャラ .scene-character
- [ ] .screen 切替用 CSS（他画面追加前の準備）
- [ ] meta / OGP タグ

### Phase 2：コマンド UI
- [ ] 吹き出し風 .command-panel
- [ ] About / Skills / Works / Contact ボタン
- [ ] TOP のときだけコマンド表示

### Phase 3：画面切り替え
- [ ] main_script.js に showScreen() 等
- [ ] index.html から script 読み込み
- [ ] #screen-about 等の HTML 追加
- [ ] 戻るボタン
- [ ] 詳細中はコマンド非表示

### Phase 4〜6
- [ ] 各画面コンテンツ
- [ ] レスポンシブ
- [ ] GitHub Pages 公開

---

## 決めたこと・やらないこと

### 決めたこと
- 技術: HTML + CSS + JavaScript（フレームワークなし）
- 本番パス: リポジトリ直下（index.html がある場所）
- UI: RPG 風。キャラ 1 体 + 吹き出し風コマンド（これから）
- TOP レイアウト: 3 レイヤー（背景 CSS / 床 img / キャラ img）
- コマンド: About / Skills / Works / Contact（4 項目）
- コマンド表示ルール: 詳細画面では非表示。TOP に戻ったら再表示
- 画像: bg.png / floor.png / character.png
- CSS / JS: main_style.css / main_script.js
- 参考: AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/

### 未決定（相談中）
- [ ] 詳細表示中のキャラ — 消す / 半透明 / 小さく残す
- [ ] コマンドパネルの位置 — キャラの右 / 下 / 画面右端
- [ ] 詳細画面の見た目 — 全画面オーバーレイ / 右パネル / 別シーン風
- [ ] HandMade_Takahashi_PortfolioSite/ を削除 or アーカイブするか
- [ ] Timeline / GitHub 自動取得 — Phase 7 へ後回しでよいか

### やらないこと
- フレームワーク導入（初期版）
- キャラの自由移動・マップ歩行
- バックエンド API の自前実装

---

## 画面・状態設計

### 現行 HTML 構造（index.html）

    <div id="app">
      <div id="screen-top" class="screen is-active">
        <div class="scene-bg" role="img" aria-label="背景"></div>
        <img class="scene-floor" src="assets/images/floor.png" alt="" />
        <img class="scene-character" src="assets/images/character.png" alt="キャラクター" />
      </div>
    </div>

### レイヤー（main_style.css）

| クラス | 手段 | z-index | 備考 |
|--------|------|---------|------|
| .scene-bg | CSS background url(../assets/images/bg.png) | 0 | cover |
| .scene-floor | img | 1 | translateY(16%) |
| .scene-character | img | 2 | bottom 8%, width min(16vw,140px) |

### 状態一覧（Phase 3 で実装予定）

    let currentScreen = 'top';

    function showScreen(name) {
      document.querySelectorAll('.screen').forEach((el) => {
        el.classList.remove('is-active');
      });
      document.getElementById('screen-' + name)?.classList.add('is-active');
      currentScreen = name;
    }

### 表示ルール（目標）

| 要素 | top | about 等 |
|------|-----|----------|
| 背景 | 表示 | 表示 or 暗くする |
| キャラ + 床 | 表示 | 要相談 |
| コマンドパネル | 表示 | 非表示 |
| 詳細コンテンツ | 非表示 | 表示 |
| 戻るボタン | 非表示 | 表示 |

---

## データ設計（コンテンツ）

正本（予定）: index.html 内のテキスト。

| 画面 | 掲載内容（参考サイトから流用可） |
|------|----------------------------------|
| About | 名前、志望、制作で意識していること |
| Skills | C++, DXLib, 3D, Tools |
| Works | シロのマジックトレーニング / 2Dアクション / 3Dシューティング |
| Contact | メールリンク（公開前に実アドレスへ） |

公開前に必ず差し替え:
- your-email@example.com → 実メール
- OGP URL → 実公開 URL

---

## 画像アセット

| 用途 | ファイル名 | パス | 状態 |
|------|-----------|------|------|
| 背景 | bg.png | assets/images/bg.png | 配置済み・使用中 |
| 床 | floor.png | assets/images/floor.png | 配置済み・使用中 |
| キャラ | character.png | assets/images/character.png | 配置済み・使用中 |

---

## 次にやること（優先順）

### Step 1: コマンド UI の HTML（Phase 2）

1. #screen-top 内に .command-panel を追加
2. About / Skills / Works / Contact のボタン（または a タグ）を並べる
3. 参考サイトの .command-panel デザインを main_style.css に移植

### Step 2: コマンドの見た目調整（Phase 2 続き）

1. パネル位置（キャラの右など）を CSS で決める
2. ホバー・フォーカス時のスタイル

### Step 3: 画面切り替えの準備（Phase 3）

1. main_style.css に .screen { display: none; } .screen.is-active { display: block; } を追加
2. #screen-about 等を HTML に追加（仮テキストで可）
3. main_script.js に showScreen() を書く
4. index.html の script を有効化（src="js/main_script.js" に修正）
5. 戻るボタンで showScreen('top')

### Step 4 以降

- Phase 4: 参考サイトから本文を入れる
- Phase 5: スマホ幅で確認
- Phase 6: GitHub Pages

---

## 困っていること・メモ

- [!] docs/ROADMAP.md がゲームプロジェクトの内容に上書きされていた — ポートフォリオ用に差し替えすること。
- [!] index.html の script コメントは js/main.js だが、実ファイル名は main_script.js。
- [!] main_script.js は空。script タグもコメントアウトのまま。
- [!] .screen / .is-active の CSS が未定義（HTML には is-active あり）。
- [!] CSS コメントと数値が不一致（floor translateY、character bottom）。
- [!] HandMade_Takahashi_PortfolioSite/PortfolioSite/ とリポジトリ直下でファイルが二重。正本は直下。
- [i] Phase 1 で床・キャラ位置は手動微調整済み。
- [i] JavaScript 超初心者 — showScreen() から始める。
- [?] GitHub Pages 公開時、ルートをリポジトリ直下のままにするか要確認。

---

## Phase 完了チェック

| Phase | 完了日 | メモ |
|-------|--------|------|
| 0 | 2026-06-15 | |
| 1 |  | ほぼ完了（.screen CSS と meta 残） |
| 2 |  | 次 |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |
| 6 |  |  |

---

## 別エージェントへの依頼文（コピペ用）

docs/HANDOFF.md と docs/ROADMAP.md を読んでから作業してください。
メインは Takahashi_Portfolio_WebSite_260615/ リポジトリ直下です。
Phase 1（TOP 3 レイヤー表示）はほぼ完了。次は Phase 2（コマンド UI）から。

- index.html + css/main_style.css で背景・床・キャラは表示済み
- コマンドパネル未実装。参考: AIMade の .command-panel
- JS は js/main_script.js（空・未読み込み）。Phase 3 で showScreen()
- 画像: assets/images/bg.png, floor.png, character.png
- HandMade_Takahashi_PortfolioSite/ は旧フォルダ。直下が正本

---

## 触った・参照するファイル（主要）

### 本番（リポジトリ直下）
- index.html
- css/main_style.css
- js/main_script.js（空）
- assets/images/bg.png
- assets/images/floor.png
- assets/images/character.png

### ドキュメント
- docs/HANDOFF.md
- docs/ROADMAP.md

### 参考
- AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/index.html
- AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/style.css
- AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/script.js

### 重複注意
- HandMade_Takahashi_PortfolioSite/PortfolioSite/（同名画像・空 CSS/JS）

---

## 参照した主なファイル一覧

- index.html
- css/main_style.css
- js/main_script.js
- assets/images/bg.png
- assets/images/floor.png
- assets/images/character.png
- docs/ROADMAP.md（誤ってゲーム用内容が入っていた）
- docs/HANDOFF.md（旧版・エスケープ混在）
- AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/index.html
- AIMade_Takahashi_PortfolioSite/takahashi_portfolio_site/style.css