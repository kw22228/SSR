const isWebTarget = (caller) => Boolean(caller && caller.target === 'web');
const isWebpack = (caller) => Boolean(caller && caller.name === 'babel-loader');

module.exports = (api) => {
    const web = api.caller(isWebTarget);
    const webpack = api.caller(isWebpack);

    return {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    useBuiltIns: web ? 'entry' : undefined, //entry로 할시 @core-js모듈로 import을 파싱.
                    targets: !web ? { node: 'current' } : undefined, //node: 'current' -> 현재 node버전에 맞게 최적화해줌.
                    modules: webpack ? false : 'commonjs',
                },
            ],
            '@babel/preset-typescript',
        ],
        plugins: [
            '@loadable/babel-plugin',
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.ts', '.tsx'],
                    alias: {
                        '@src': './src',
                        '@components': './src/components',
                        '@pages': './src/pages',
                        '@store': './src/store',
                        '@reducers': './src/store/reducers',
                        '@actions': './src/store/actions',
                        '@util': './src/util',
                        '@styles': './src/styles',
                    },
                },
            ],
        ],
    };
};
