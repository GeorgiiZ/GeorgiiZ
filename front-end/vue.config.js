module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'monuments-front'
        : '',
    devServer: {
        proxy: {
            '': {
                target: 'http://localhost:4000/',
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
