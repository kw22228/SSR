const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    target: 'node', //server는 node의 express환경으로 실행하니 'node' / 보통 프론트 환경은 'web'

    node: false, // it enables '__dirname' in files. If is not, '__dirname' always return '/'.

    entry: {
        server: './src/server.tsx', // react코드가 아니라 express코드를 컴파일하기 때문에 server.tsx 입력
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    externals: [nodeExternals()], //서버에 필요없는 node_modules를 제외하기 위해 nodeExternals() 사용
};
