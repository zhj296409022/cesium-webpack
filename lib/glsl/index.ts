/**
 * 以字符串的方式返回glsl文件内容
 * 语法为es6
 */
module.exports = function(source): string {
    this.cacheable()

    return `export default ${ JSON.stringify(source) }`
}
