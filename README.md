# class-web-programming

## frontend 
フロントエンドのファイル群が./frontend/以下にviteで作成してある。
依存パッケージはyarn.lockを参照。サーバーではコンパイルしたファイルが、erb内で読み込まれている。

自分で導入したパッケージ  
- ky : ポストaxiosなhttp client  

## backend
MIME Typeをapplication/jsonで返すことで、APIエンドポイントとして機能するようになっているRuby CGI。

エンドポイントのルートは、https://cgi.u.tsukuba.ac.jp/~s2111609/wp/final/api/

### API設計
それぞれのpathに対して、有効なURLは以下。  
https://cgi.tsukuba.ac.jp/~s2111609/wp/final/api/{path}.rb

GET /memos
param = {
q?: string
}
メモを返す。パラメータ無しでは期限切れ以外のメモを全部を返す。
qはタイトルを部分一致で検索する。

return
{
status: "ok"|"failed",
message?: string
data: [
memo1:Memo,
memo2:Memo,
…
]
}
interface Memo{
    id: string
    title: string
    expireDate: string
    content: string
}

POST /post
Param = {
title: string 
expires: string
content: string 
}
新しいメモを作る。
expiresには以下のフォーマットを指定 month-week-day
return {status: string}

POST /delete
Param ={
id: string
}
idに指定されたメモを消去

POST /update 
Param = {
id
title
expires
content
}

### DB設計
memos(id:integer, title:text, expire_date:text, content:text)



## TODO
- firebase auth  
- form handle