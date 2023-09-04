const request = require('supertest')
const assert = require('assert')
const Joa = require('../..')

describe('app.use(fn)', () => {
  it('should compose middleware', async () => {
    const sut = new Joa();
    const calls = []

    sut.use((ctx, next) => {
      calls.push(1)

      return next().then(() => {
        calls.push(6)
      })
    })

    sut.use((ctx, next) => {
      calls.push(2)
      return next().then(() => {
        calls.push(5)
      })
    })

    sut.use((ctx, next) => {
      calls.push(3)
      return next().then(() => {
        calls.push(4)
      })
    })

    const server = sut.listen()

    await request(server)
        .get('/')
        .expect(404)

    assert.deepStrictEqual(calls, [1, 2, 3, 4, 5, 6])
  })
});
