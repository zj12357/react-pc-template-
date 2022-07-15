const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
const autoprefixer = require('autoprefixer');
const WebpackBar = require('webpackbar');
const CracoLessPlugin = require('craco-less');
const { REACT_APP_API_URL } = process.env;

module.exports = {
    reactScriptsVersion: 'react-scripts' /* (default value) */,
    style: {
        modules: {
            localIdentName: '',
        },
        sass: {
            loaderOptions: {
                additionalData: `@import '@/assets/scss/index.scss';`, //设置公共scss
            },
        },
        postcss: {
            mode: 'extends' /* (default value) */ || 'file',
            plugins: [require('tailwindcss'), autoprefixer],

            loaderOptions: {},
        },
    },
    eslint: {
        enable: true /* (default value) */,
        mode: 'extends' /* (default value) */ || 'file',
        configure: {
            /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */
        },
        configure: (eslintConfig, { env, paths }) => {
            return eslintConfig;
        },
        pluginOptions: {
            /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */
        },
        pluginOptions: (eslintOptions, { env, paths }) => {
            return eslintOptions;
        },
    },
    typescript: {
        enableTypeChecking: true /* (default value)  */,
    },
    babel: {
        presets: [['@babel/preset-env'], ['@babel/preset-react']],
        plugins: [
            [
                '@babel/plugin-proposal-decorators',
                {
                    legacy: true,
                },
            ], // 用来支持装饰器
            [
                '@babel/plugin-transform-runtime',
                {
                    useESModules: true,
                    regenerator: true,
                },
            ],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            ['@babel/plugin-proposal-private-methods', { loose: true }],
            [
                '@babel/plugin-proposal-private-property-in-object',
                { loose: true },
            ],
        ],
        loaderOptions: {
            /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */
        },
    },
    devServer: {
        publicPath: '/',
        port: 8000,
        hot: true,
        overlay: true,
        proxy: {
            '/excuse': {
                target: REACT_APP_API_URL,
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: '',
                },
                pathRewrite: {
                    '^': '',
                },
            },
        },
    },
    //配置别名
    webpack: {
        extensions: [
            '.js',
            '.ts',
            '.jsx',
            '.tsx',
            '.json',
            '.css',
            '.less',
            '.scss',
            '.png',
            '.svg',
            '.jpg',
            '.webp',
        ],
        alias: {
            '@': resolve('src'),
        },
        configure: (webpackConfig, { env, paths }) => {
            // 修改build的生成文件名称
            paths.appBuild = 'dist';
            webpackConfig.output = {
                ...webpackConfig.output,
                path: resolve('dist'),
                publicPath: '/',
            };
            return webpackConfig;
        },
        plugins: [
            new WebpackBar({
                profile: true,
                name: 'webpack',
                color: 'green',
            }),
        ],
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {},
        },
        {
            plugin: require('craco-plugin-scoped-css'),
        },
    ],
};
