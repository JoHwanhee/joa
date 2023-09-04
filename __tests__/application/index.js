const assert = require('assert')
const Joa = require('../..')

describe('app', () => {

  it('should set development env when NODE_ENV missing', () => {
    const NODE_ENV = process.env.NODE_ENV
    process.env.NODE_ENV = ''
    const sut = new Joa()
    process.env.NODE_ENV = NODE_ENV

    const actual = sut.env

    assert.strictEqual(actual, 'development')
  })

  it('should set env from the constructor', () => {
    const env = 'custom'
    const sut = new Joa( { env })

    const actual = sut.env

    assert.strictEqual(actual, env)
  })

  it('should set proxy flag from the constructor', () => {
    const proxy = true
    const sut = new Joa( { proxy })

    const actual = sut.proxy

    assert.strictEqual(actual, proxy)

  })

  it('should set sigend cookie keys from the constructor', () => {
    const keys = ['customkey']
    const sut = new Joa( { keys })

    const actual = sut.keys

    assert.strictEqual(actual, keys)
  })

  it('should set subdomainOffset from the constructor', () => {
    const subdomainOffset = 3
    const sut = new Joa({ subdomainOffset })

    const actual = sut.subdomainOffset

    assert.strictEqual(actual, subdomainOffset)
  })


  it('should set compose from the constructor', () => {
    const compose = () => (ctx) => {}
    const sut = new Joa({ compose })

    const actual = sut.compose

    assert.strictEqual(actual, compose)
  })

});
