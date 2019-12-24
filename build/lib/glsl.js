"use strict";
exports.__esModule = true;
function pack(config) {
    config.module.rule('glsl').test(/\.glsl$/).use('raw-loader').loader('raw-loader');
}
exports.pack = pack;
