対応バージョン: Node.js 最新版(2026/2/3時点)

追加インストールが必要な依存:
 "node-fetch": "^3.3.2"

 <使い方>
 環境変数の登録が必要です。
ELTRES_USER_NAME：Clip Viewer Liteへのログインメールアドレス
ELTRES_USER_PASS：Clip Viewer Liteへのログインパスワード
ELTRES_API_KEY：Clip Viewer Liteから閲覧可能な「APIキー」
を登録してください。
またnode.jsから編集可能なテキストファイルを用意し、そのパスをコード内の「"パスを入力"」の部分に置換してください。
またそのテキストファイルには「一度でも発行されたAPIキー」を入力してください（期限切れでもOK）

出来たら、適当に用意したメインファイルにインポートし、そこからGET_ELTRESという関数を実行するだけです。引数にはELTRESの機体IDを入れてください。
返り値は「sendDateTime, gps, info」の順に来ます
infoが「undefined」なら成功、「generated」ならキーの有効期限切れで再生成したあと成功、その他なら失敗です（失敗理由が入る）

infoを読み取って分岐させてほかの返り値を取り出してください。

2026/2/3 Genki Miyashita
