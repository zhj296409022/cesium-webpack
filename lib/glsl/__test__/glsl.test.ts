import compile from './compile'
import { expect } from 'chai'

test('glsl loader', async () => {
    const stats = await compile('example.glsl')

    const output = stats.toJson().modules[0].source

    expect(output).equal(`export default "void main(){}"`)
})
