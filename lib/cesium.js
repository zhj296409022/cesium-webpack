"use strict";
exports.__esModule = true;
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");
var glsl_1 = require("./glsl");
//cesium资源路径
var cesiumSource = 'node_modules/cesium/Source';
var cesiumWorkers = '../Build/Cesium/Workers';
var defaultOpts = {
    projectDir: '',
    outputDir: ''
};
function pack(config, opts) {
    opts = Object.assign({}, defaultOpts, opts || {});
    //glsl
    glsl_1.pack(config);
    var outputPath = null;
    if (opts.outputDir) {
        outputPath = path.resolve(opts.outputDir);
    }
    else {
        outputPath = config.output.get('path') || '';
    }
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
        [{ from: path.join(sourcePath, cesiumWorkers), to: path.join(outputPath, 'Workers') }]
    ]);
    config
        .plugin('cesium-assets')
        .use(CopyWebpackPlugin, [
        [{ from: path.join(sourcePath, 'Assets'), to: path.join(outputPath, 'Assets') }]
    ]);
    config
        .plugin('cesium-widgets')
        .use(CopyWebpackPlugin, [
        [{ from: path.join(sourcePath, 'Widgets'), to: path.join(outputPath, 'Widgets') }]
    ]);
    //http加载资源的相对路径的前缀
    config
        .plugin('cesium-base-url')
        .use(webpack.DefinePlugin, [{ CESIUM_BASE_URL: JSON.stringify('') }]);
}
exports.pack = pack;
