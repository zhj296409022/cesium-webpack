"use strict";
exports.__esModule = true;
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");
//cesium资源路径
var cesiumSource = 'node_modules/cesium/Source';
var cesiumWorkers = '../Build/Cesium/Workers';
var defaultOpts = {
    glsl: false,
    projectDir: '',
    outputDir: ''
};
function pack(config, opts) {
    opts = Object.assign(opts || {}, defaultOpts);
    var outputPath = config.output.get('path');
    outputPath = path.resolve(outputPath, opts.outputDir);
    var sourcePath = path.resolve(opts.projectDir, cesiumSource);
    //让cesium支持webpack
    config.output.sourcePrefix('');
    //移除警告
    //todo webpack 无法 tree shaking 出不用的代码
    config.module.set('unknownContextCritical', false);
    config.merge({
        //告诉CesiumJS AMD webpack使用不符合标准toUrl
        amd: {
            toUrlUndefined: true
        }
    });
    config
        .plugin('cesium-workers')
        .use(CopyWebpackPlugin, [
        [{ from: path.join(sourcePath, cesiumWorkers), to: path.resolve(outputPath, 'Workers') }]
    ]);
    config
        .plugin('cesium-assets')
        .use(CopyWebpackPlugin, [
        [{ from: path.join(sourcePath, 'Assets'), to: path.resolve(outputPath, 'Assets') }]
    ]);
    config
        .plugin('cesium-widgets')
        .use(CopyWebpackPlugin, [
        [{ from: path.join(sourcePath, 'Widgets'), to: path.resolve(outputPath, 'Widgets') }]
    ]);
    //http加载资源的相对路径的前缀
    config
        .plugin('cesium-base-url')
        .use(webpack.DefinePlugin, [{ CESIUM_BASE_URL: JSON.stringify('') }]);
}
exports.pack = pack;
