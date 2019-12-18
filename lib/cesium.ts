import Config = require('webpack-chain')
import path = require('path')
import CopyWebpackPlugin = require('copy-webpack-plugin')
import webpack = require('webpack')
import { pack as glsl } from './glsl'

//cesium资源路径
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

export interface LoadOpts {
  /**
   * 输出目录，默认output.path或者执行目录
   */
  outputDir?: string
  /**
   * 项目目录，确定node_modules,默认当前目录
   */
  projectDir?: string
  cesium_base_url: string
}

const defaultOpts:LoadOpts = {
  projectDir: '',
  outputDir: '',
  cesium_base_url: ''
}

export function pack(config: Config, opts?: LoadOpts) {
    opts = Object.assign({}, defaultOpts, opts || {})

    //glsl
    glsl(config)

    let outputPath = null

    if(opts.outputDir) {
      outputPath = path.resolve(opts.outputDir)
    }else {
      outputPath = config.output.get('path') || ''
    }

    let sourcePath = path.resolve(opts.projectDir || '', cesiumSource)

    //让cesium支持webpack
    config.output.sourcePrefix('')
    //移除警告
    //todo webpack 无法 tree shaking 出不用的代码
    config.module.set('unknownContextCritical', false)

    config.merge({
        //告诉CesiumJS AMD webpack使用不符合标准toUrl
        amd: {
            toUrlUndefined: true
        }
    })

    config
    .plugin('cesium-workers')
        .use(CopyWebpackPlugin, [
        [{ from: path.join(sourcePath, cesiumWorkers), to: path.join(outputPath, 'Workers') }]
    ])

    config
    .plugin('cesium-assets')
    .use(CopyWebpackPlugin, [
      [{ from: path.join(sourcePath, 'Assets'), to: path.join(outputPath, 'Assets') }]
    ])

  config
    .plugin('cesium-widgets')
    .use(CopyWebpackPlugin, [
      [{ from: path.join(sourcePath, 'Widgets'), to: path.join(outputPath, 'Widgets') }]
    ])

  //http加载资源的相对路径的前缀
  config
    .plugin('cesium-base-url')
    .use(webpack.DefinePlugin, [{ CESIUM_BASE_URL: JSON.stringify(opts.cesium_base_url) }])
}
