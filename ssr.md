### Server Side Rendering

-   동작방식

    -   js파일이 클라이언트에 전송되어 실행되기 전까지, 초기화면의 html string만 먼저 만들어 렌더링해서 보여주는 개념 (pre-rendering)

-   라이브러리

    -   express : 웹서버

    -   webpack-dev-middleware(WDM) : express로 만들어진 서버에서, 파일이 수정될 때 변경된 파일과 그 정보를 만들어주는 개발용 서버 도우미.

    -   webpack-hot-middleware(WHM) : WDM에서 변경된 파일정보를 생성하면 그 정보를 불러와서 브라우저에 갱신시킴 (WDS의 HMR같은 기능... 내부적으로는 EventSource(WebSocket과 유사한 통신방법)을 써서 동작한다고함.)

    -   webpack-node-externals : SSR동작 방식으로 보아 html string만 먼저 렌더링해주는 개념이기 때문에 용량이 큰 node_modules가 필요없다. 때문에, 이 미들웨어를 써서 node_modules를 제거해준다.

    -   @types/webpack-env : HMR을 활성화 시킬 때, webpack이 module에 hot이라는 속성을 주입한다. (잘 이해안됨.)

-   메소드

    -   renderToString(react-dom/server) : 보류

    -   helmet(react-helmet) : 클라이언트 사이드에서 사용한 react-helmet정보를 가져온다. (꼭 renderToString으로 html을 추출한 후에 사용하여야 한다.)

    -   StaticRouter(react-router-dom/server) : BrowserRouter 대신에 SSR에서 사용하는 React-Router이다. 접속 URL의 router정보를 클라이언트 사이드 파일에 전달해준다.

    -   res.send: body태그에 html string을 넣어준다. 그리고 script tag로 번들된 파일의 uri를 넣어준다.

    -   if(process.env.NODE_ENV !== 'production') : WDM과 WHM설정을 해준다.
        webpack.client.js파일을 webpack으로 실행시켜주면 컴파일러가 된다.

---

##### Code Splitting

-   webpack.client.js

    -   getConfig : webpack의 multi-compiler방식이다. 하나의 config로 여러개의 설정을 할 수 있음.

    -   target: web 또는 node

    -   name: 컴파일된 파일에 이름을 붙임. @loadable과 WHM이 알수 있게 web과 node로 구분해줌.
        그리고 hotMiddlewareScript에도 name=web 쿼리스트링을 추가해준다.

    -   getEntryPoint: SSR용 string만 뽑는 node환경에서는 WHM필요없으니 빼준다.

    -   output: SSR과 CSR에 필요한 파일을 나누기위해 target이름에 따라 폴더를 나눠줌.

    -   externals: SSR은 노드환경에서 실행되므로 webpack-node-externals를 추가해주되, 코드 스플리팅된 파일은 읽어야되므로 @loadable/component는 추가 시켜준다.

-   babel.config.js

    -   useBuiltIns: babel follyfill 설정이다. 'entry'를 해줄경우 @corejs모듈로 import함.

    -   target: {node: 'current'}설정은 현재 node버전에 맞게 최적화 해줌.

    -   plugins: 코드 스플리팅을 인식하기 위해 @loadable/babel-plugin을 사용(트랜스파일링을 tsc로 하게되면 plugin이 적상작동하지 않는다.)

-   server.tsx

    -   webpackDevMiddleware: webpack에서 멀티 컴파일을 해주기때문에 배열로 되어있는 config의 'web'(0번째) 부분을 넣어준다.

    -   webExtractor: @loadable-component가 제공하는 서버사이드 렌더링 api이다. splitting된 정보를 취합하고, 각 메소드(getLinkTag, getStyleTag, getScriptTag)로 파일정보 전달한다.
