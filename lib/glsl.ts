import Config = require('webpack-chain')

export function pack(config: Config) {
    config.module.rule('glsl').test(/\.glsl$/).use('raw-loader').loader('raw-loader')
}
