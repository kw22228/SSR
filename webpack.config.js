module.exports = function (env) {
    const name = env.dev ? 'dev' : env.client ? 'client' : env.server ? 'server' : '';
    return require(`./webpack.${name}.js`);
};
