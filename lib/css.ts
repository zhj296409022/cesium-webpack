import Config = require("webpack-chain")
import MiniCssExtractPlugin = require('mini-css-extract-plugin')
import OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

export function pack(config: Config) {
    ;['.css', '.scss'].forEach(ext=> {
        config.resolve.extensions.add(ext)
    })

    const cssRule = config.module.rule('css').test(/\.s?css$/)

    cssRule.use('css-loader').loader('css-loader')

    const mode = config.get('mode')

    if(mode !== 'production') {
        cssRule.use('style-loader')
            .loader('style-loader')
            .before('css-loader')    
    }else {
        cssRule.use('mini-css-extract')
            .loader(MiniCssExtractPlugin.loader)
            .options({
                hmr: true
            })
            .before('css-loader')

        config.plugin('mini-css-extract').use(MiniCssExtractPlugin,[
            {
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
                ignoreOrder: false,
            }
        ])

        config.plugin('optimize-css-assets').use(OptimizeCSSAssetsPlugin)
    }

    cssRule.use('sass-loader').loader('sass-loader')

    config.module.rule('static').test(/\.(png|gif|jpg|jpeg|svg|xml|json)$/)
        .use('url-loader').loader('url-loader')
}