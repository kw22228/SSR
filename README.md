# SSR

To switch react project to ssr

참고: https://minoo.medium.com/react-typescript-ssr-code-splitting-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-d8cec9567871

1. TypeScript 설정

-   yarn add react react-dom typescript
-   yarn add --dev @types/react @types/react-dom tslint

-   packgage.json의 scripts에 tsc 설정 후 npm run tsc

```javascript
   "scripts": {
        "tsc": "tsc --init",
    },
```

2. Webpack 과 Babel

-   webpack-cli: npm script로 webpack을 실행할 수 있게 해줍니다.
-   webpack-dev-server(WDS): 간단한 서버를 만들어 browser에서 우리가 만든 파일을 실행할 수 있게 해줍니다.
-   html-webpack-plugin: Javascript bundling 파일을 html에 연결시켜줍니다.
-   babel-loader ,ts-loader: babel과 typescript 구문을 해석해줄 loader입니다.

-   webpack.config.js 와 webpack.dev.js 두개의 config파일 생성
    webpack을 실행하면 기본적으로 webpack.config.js를 바라본다. (여기서는 router역할로 사용해줌.)
-   HMR : webpack.HotModuleReplacementPlugin은 devServer에 hot: true로 되어있다면 자동으로 추가되니 plugins에 굳이 추가할 필요없음.

3. React-router와 React-Helmet

-   React-helmet이 오류가 떠 react-helmet-async로 사용.

```javascript
<HelmetProvider>
    <Helmet>
        <title>Home</title>
    </Helmet>
</HelmetProvider>
```

5. Server-side rendering (without Code-splitting)

-   express : 다들 아실거라고 믿습니다 :-)
-   webpack-dev-middleware(WDM) : express로 만들어진 서버에서, 파일이 수정될 때마다 변경된 파일과 그 정보를 만들어주는 개발용 서버 도우미입니다.
-   webpack-hot-middleware(WHM) : WDM에서 변경된 파일 정보를 생성하면, 그 파일들을 불러와서 브라우저에 갱신시킵니다. 이름처럼 WDS의 hot 기능을 담당한다고 보면 됩니다. 내부적으로는 EventSource를 써서 작동하는데 WebSocket과 유사한 통신방법입니다. SSR에서 HMR(hot module replacement)를 담당합니다.
-   webpack-node-externals : 번들 파일에 불필요한 node_modules 를 빼주는 역할을 합니다. SSR은 js 파일이 클라이언트에게 전송되어 실행되기 전까지, 초기화면의 html string만 렌더링해 먼저 보여주는 개념입니다. 따라서 서버에서 렌더링된 파일에는 node_modules 이 필요 없게 되는것이지요.
-   @types/webpack-env : HMR을 활성화 시킬때 webpack이 module에 hot 이라는 속성을 주입합니다. 이러한 webpack용 env의 type을 담당합니다.

-   webpack.client.js와 webpack.server.js를 추가해주고 src/폴더에 server.tsx 추가해준다.
