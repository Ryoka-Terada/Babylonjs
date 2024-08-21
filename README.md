## 初回対応

- npm ci

npm のライブラリを入手する。

## 動作確認時

- http-server

ローカルで Web サーバを立てる。サーバを立てた後、以下にアクセスして index.html を表示。
http://localhost:8080/src/

注意：コマンドを打つのはルートディレクトリ。
src まで下がって打つと localhost:8080 直に index.html を表示できるが、webpack の path 系の設定の影響か desc 配下の js ファイルの相対パス参照で失敗する。

## ファイル変更時

- npm run build

ts ファイルに変更を加えたらビルドしないと反映しない。
ブラウザのキャッシュ読み込みを無効にしておくこと。（開発者ツール->ネットワークから選択）

## その他

### static 配下の資材について

以下から取得
<br />
https://dova-s.jp/
<br />
https://free-paper-texture.com/
