# Development environment

**Install node.js**  
推奨：v15.8.0

Windowsなら[nodist](https://qiita.com/satoyan419/items/56e0b5f35912b9374305)
Macなら[nodebrew](https://qiita.com/mame_daifuku/items/373daf5f49ee585ea498)か[nodenv](https://qiita.com/1000ch/items/41ea7caffe8c42c5211c)などでインストール

**Setup**  
`npm install` or `yarn install`


**develop**
`npm run start` or `yarn start`


## frontendディレクトリ
```
├── /html 
│   ├── index.html rootのhtmlファイル
│   ├── /assets 画像、fontなど
├── js webpackで扱うファイル
└── scss webpackで扱うファイル
```
- scss(dart-sass)とJavaScript(ES6)のコンパイルはwebpackを利用しています。

## build後ディレクトリ
```
├── /public フロントエンド公開フォルダ
│   ├── index.html rootのhtmlファイル
│   ├── /assets 画像、font、build後のcss、js
├── app.js バックエンドソース(node.js)
```
