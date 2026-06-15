\# 開発引き継ぎ（HANDOFF）



> \*\*作業のたびにこのファイルを更新する。\*\*  

> 別 PC・別エージェントは、まずこのファイルを読んで続きを行う。



\---



\## 最終更新



\- \*\*日付:\*\* 2026-06-15

\- \*\*作業 PC / 担当:\*\* 髙橋勇喜（任意）

\- \*\*現在の Phase:\*\* Phase 0（準備・設計）→ \*\*Phase 1（骨組み）が次\*\*

\- \*\*ステータス:\*\* 設計中 / 未実装

\- \*\*設計メモ:\*\* RPG 風コマンド UI。TOP のみコマンド表示。詳細画面では非表示。画像（背景・キャラ・床）は選定済み。



\---



\## いま動いていること（1〜3行）



プロジェクトはリポジトリ作成済み。参考サイト（`AIMade\_Takahashi\_PortfolioSite/`）のみ存在。\*\*本番用の `index.html` / `css` / `js` は未作成。\*\* ブラウザで動く RPG 風 PF はこれから Phase 1 から実装する。



\---



\## 完了したこと（チェックリスト）



\### Phase 0：準備・設計

\- \[x] サイトコンセプト決定（RPG 風・コマンド選択）

\- \[x] 画面フロー方針（TOP → 詳細 → TOP でコマンド再表示）

\- \[x] 使用画像の選定（背景・キャラクター・床）

\- \[x] 参考サイトの配置（AI 作成版）

\- \[ ] フォルダ構成の作成（`css/`, `js/`, `assets/images/`）

\- \[ ] 画像ファイルのリポジトリへの配置

\- \[ ] コマンド項目の最終確定

\- \[ ] 本 HANDOFF / ROADMAP の `docs/` 配置



\### Phase 1：骨組み

\- \[ ] `index.html`

\- \[ ] `css/style.css`

\- \[ ] TOP 画面（背景 + 床 + キャラ）の表示



\### Phase 2：コマンド UI

\- \[ ] 吹き出し風コマンドパネル

\- \[ ] About / Skills / Works / Contact ボタン



\### Phase 3：画面切り替え

\- \[ ] `currentScreen` 状態管理

\- \[ ] `showScreen()` 実装

\- \[ ] 詳細中はコマンド非表示 / TOP で再表示

\- \[ ] 戻るボタン



\### Phase 4〜6

\- \[ ] 各画面コンテンツ

\- \[ ] レスポンシブ

\- \[ ] GitHub Pages 公開



\---



\## 決めたこと・やらないこと



\### 決めたこと

\- \*\*技術:\*\* HTML + CSS + JavaScript（フレームワークなし）

\- \*\*UI:\*\* RPG 風。キャラ 1 体 + 吹き出し風コマンド

\- \*\*コマンド:\*\* About / Skills / Works / Contact（4 項目・暫定）

\- \*\*コマンド表示ルール:\*\* 詳細画面では非表示。TOP に戻ったら再表示

\- \*\*画像:\*\* 背景・キャラ・床は自作/選定済みの素材を使う

\- \*\*参考:\*\* `AIMade\_Takahashi\_PortfolioSite/takahashi\_portfolio\_site/` の文言・配色



\### 未決定（相談中）

\- \[ ] \*\*1 ページ構成 vs 複数 HTML\*\* — 推奨: 1 ページ + JS 切り替え

\- \[ ] \*\*上部ヘッダーナビを付けるか\*\* — 推奨: 初期はコマンドのみ

\- \[ ] \*\*Timeline / GitHub 自動取得を入れるか\*\* — 推奨: Phase 7 へ後回し

\- \[ ] \*\*画像ファイル名と配置パス\*\* — `assets/images/` 想定、要記入

\- \[ ] \*\*コマンドパネルの位置\*\* — キャラの右？ 下？ 画面右端？

\- \[ ] \*\*詳細画面の見た目\*\* — 全画面オーバーレイ？ 右側パネル？ 別シーン風？



\### やらないこと

\- フレームワーク（React 等）導入（初期版）

\- キャラの自由移動・マップ歩行（ポートフォリオの範囲外）

\- バックエンド API の自前実装



\---



\## 画面・状態設計



\### 状態一覧



&#x20;   // main.js で使う画面 ID（想定）

&#x20;   const SCREENS = {

&#x20;     TOP: 'top',

&#x20;     ABOUT: 'about',

&#x20;     SKILLS: 'skills',

&#x20;     WORKS: 'works',

&#x20;     CONTACT: 'contact',

&#x20;   };



\### 表示ルール



| 要素 | top | about 等 |

|------|-----|----------|

| 背景画像 | 表示 | 表示（または暗くする） |

| キャラ + 床 | 表示 | 非表示 or 小さく残す（要相談） |

| コマンドパネル | 表示 | 非表示 |

| 詳細コンテンツ | 非表示 | 表示 |

| 戻るボタン | 非表示 | 表示 |



\### HTML 構造（案）



&#x20;   <div id="app">

&#x20;     <div id="screen-top" class="screen is-active">

&#x20;       <!-- 背景・床・キャラ・コマンドパネル -->

&#x20;     </div>

&#x20;     <div id="screen-about" class="screen">...</div>

&#x20;     <div id="screen-skills" class="screen">...</div>

&#x20;     <div id="screen-works" class="screen">...</div>

&#x20;     <div id="screen-contact" class="screen">...</div>

&#x20;   </div>



\### CSS のイメージ（案）



&#x20;   .screen { display: none; }

&#x20;   .screen.is-active { display: block; }



\### JavaScript のイメージ（Phase 3 のゴール）



&#x20;   let currentScreen = 'top';



&#x20;   function showScreen(name) {

&#x20;     document.querySelectorAll('.screen').forEach((el) => {

&#x20;       el.classList.remove('is-active');

&#x20;     });

&#x20;     document.getElementById('screen-' + name)?.classList.add('is-active');

&#x20;     currentScreen = name;

&#x20;   }



\---



\## データ設計（コンテンツ）



\*\*正本:\*\* 初期は `index.html` 内のテキスト。のちに `content.json` 化も可（Phase 7）。



| 画面 | 掲載内容（参考サイトから流用可） |

|------|----------------------------------|

| About | 名前、志望、制作で意識していること |

| Skills | C++, DXLib, 3D, Tools |

| Works | シロのマジックトレーニング / 2Dアクション / 3Dシューティング |

| Contact | メールリンク（公開前に実アドレスへ） |



\*\*公開前に必ず差し替え:\*\*

\- `your-email@example.com` → 実メール

\- OGP URL → 実公開 URL



\---



\## 画像アセット



| 用途 | ファイル名（要記入） | パス（予定） |

|------|---------------------|-------------|

| 背景 | （未定） | `assets/images/` |

| キャラクター | （未定） | `assets/images/` |

| 床（足元） | （未定） | `assets/images/` |



\---



\## 次にやること（優先順）



\### Step 0: フォルダと画像（Phase 0 完了）



1\. フォルダを作る: `css/` / `js/` / `assets/images/` / `docs/`

2\. 背景・キャラ・床の画像を `assets/images/` に置く

3\. この HANDOFF の「画像アセット」表を更新する

4\. `docs/ROADMAP.md` も同様に更新



\### Step 1: TOP だけ表示（Phase 1）



1\. `index.html` — 最低限の骨組み + `#screen-top`

2\. `css/style.css` — 背景・床・キャラの位置決め

3\. ブラウザで `index.html` を開いて確認



\### Step 2: コマンド見た目（Phase 2）



1\. 吹き出し風 `.command-panel` を TOP に追加

2\. 参考サイトの `.command-panel` スタイルをベースに調整



\### Step 3: 画面切り替え（Phase 3）



1\. `js/main.js` 作成

2\. 各 `#screen-\*` を HTML に追加（中身は仮テキストで OK）

3\. `showScreen()` + コマンドの click イベント

4\. 戻るボタンで `showScreen('top')`



\### Step 4 以降



\- Phase 4: 参考サイトから本文をコピーして整形

\- Phase 5: スマホ幅で確認

\- Phase 6: GitHub Pages



\---



\## 困っていること・メモ



\- \[i] \*\*JavaScript 歴は超初心者\*\* — Phase 3 は 1 関数ずつ動作確認しながら進める

\- \[i] \*\*参考サイトは「縦スクロール 1 ページ」\*\* — 本プロジェクトは「画面切り替え型」に作り直す

\- \[?] \*\*詳細表示中のキャラ\*\* — 完全に隠す / 半透明で残す / 小さく隅に残す（未決定）

\- \[?] \*\*コマンドの操作感\*\* — クリックのみ / キーボード上下 + Enter（RPG っぽい・後から可）

\- \[i] 画像パスは相対パス `assets/images/xxx.png` 推奨



\---



\## Phase 完了チェック



| Phase | 完了日 | メモ |

|-------|--------|------|

| 0 |  | 設計中 |

| 1 |  |  |

| 2 |  |  |

| 3 |  |  |

| 4 |  |  |

| 5 |  |  |

| 6 |  |  |



\---



\## 別エージェントへの依頼文（コピペ用）



docs/HANDOFF.md と docs/ROADMAP.md を読んでから作業してください。  

メインは Takahashi\_Portfolio\_WebSite\_260615/ です。  

現在 Phase 0（設計）。次は Phase 1（HTML + 画像で TOP 表示）から。



\- RPG 風コマンド UI。TOP のみコマンド表示、詳細では非表示

\- 画像（背景・キャラ・床）は選定済み。パスは HANDOFF 参照

\- 参考: AIMade\_Takahashi\_PortfolioSite/takahashi\_portfolio\_site/（文言・配色のみ。構成は画面切り替え型で新規）

\- JS は初心者向けにシンプルに。showScreen() 中心で実装

\- 未決定項目は勝手に決めず、HANDOFF の「未決定」に追記して相談



\---



\## 触った・参照するファイル（主要）



\### 本番（これから作る）



\- index.html

\- css/style.css

\- js/main.js

\- assets/images/（背景・キャラ・床）

\- docs/HANDOFF.md

\- docs/ROADMAP.md



\### 参考（読むだけ・流用可）



\- AIMade\_Takahashi\_PortfolioSite/takahashi\_portfolio\_site/index.html

\- AIMade\_Takahashi\_PortfolioSite/takahashi\_portfolio\_site/style.css

\- AIMade\_Takahashi\_PortfolioSite/takahashi\_portfolio\_site/script.js

\- AIMade\_Takahashi\_PortfolioSite/takahashi\_portfolio\_site/README.md

