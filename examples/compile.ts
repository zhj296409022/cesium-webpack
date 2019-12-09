import Config = require('webpack-chain')
import path = require('path')
import { cesium } from '../index'

const config = new Config()

;['.js', '.ts', '.tsx'].forEach(ext=> {
    config.resolve.extensions.add(ext)
})

config.context(path.resolve( __dirname))
config.entry('index').add(path.resolve(__dirname, 'index.ts'))
config.output.filename('bundle.js')
config.output.path(path.resolve(__dirname, '..', 'dist'))

config.mode('production')

cesium(config)

module.exports = config.toConfig()
