# cesium-webpack

使用webpack打包cesium

暂时只支持 **webpack-chain** 打包方式

# 安装

```
npm i -D cesium-webpack
```

# 使用

## typescript

```
import { cesium } from 'cesium-webpack'
import Config = require('webpack-chain')

const config = new Config()

cesium(config)
```

## javascript

```
import { cesium } from 'cesium-webpack'

const Config = require('webpack-chain')

const config = new Config()

cesium(config)
```