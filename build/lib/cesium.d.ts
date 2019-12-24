import Config = require('webpack-chain');
export interface LoadOpts {
    /**
     * 输出目录，默认output.path或者执行目录
     */
    outputDir?: string;
    /**
     * 项目目录，确定node_modules,默认当前目录
     */
    projectDir?: string;
    cesium_base_url: string;
}
export declare function pack(config: Config, opts?: LoadOpts): void;
