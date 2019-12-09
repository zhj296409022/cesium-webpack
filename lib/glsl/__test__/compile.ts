import webpack = require("webpack")
import Config = require('webpack-chain')
import path = require('path')
//生成文件到内存中，不生成到磁盘上
import memoryfs = require('memory-fs')

export default function(fixture: string, options:any = {}): Promise<webpack.Stats> {

    const config = new Config()
    
    config.context(__dirname)
    config.entry(`./${fixture}`)
    config.output.path(path.resolve(__dirname))
    config.output.filename('bundle.js')
    config.module.rule('glsl').test(/\.glsl$/).use('glsl-loader')
        .loader(path.resolve(__dirname, '../index.ts'))
    
    const compiler = webpack(config.toConfig())

    compiler.outputFileSystem = new memoryfs()

    return new Promise((resolve, reject)=>{
        compiler.run((err, stats) => {
            if(err) {
                reject(err)
            }else {
                resolve(stats)
            }
        })
    })
}