# EN: Use lightweight Node.js image
# JP: 軽量(けいりょう)Node.jsイメージを使用(しよう)
FROM node:20-alpine

# EN: Set working folder inside the container
# JP: コンテナ内(ない)の作業(さぎょう)フォルダを設定(せってい)
WORKDIR /frontend

# EN: Copy package files first for dependency installation
# JP: 依存関係(いぞんかんけい)をインストールするため、先(さき)にpackageファイルをコピー
COPY package*.json ./

# EN: Install frontend dependencies
# JP: フロントエンドの依存関係をインストール
RUN npm install

# EN: Copy the rest of the frontend source code
# JP: 残(のこ)りのフロントエンドソースコードをコピー
COPY . .

# EN: Vite development server uses port 5173
# JP: Vite開発(かいはつ)サーバーはポート5173を使用(しよう)
EXPOSE 5173

# EN: Start Vite server inside the container
# JP: コンテナ内でViteサーバーを起動(きどう)
CMD ["npm", "run", "dev"]