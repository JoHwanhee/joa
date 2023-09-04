const compose = require('../../lib/compose')

function wait (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms || 1))
}

function isPromise (x) {
  return x && typeof x.then === 'function'
}

describe('compose', function () {
  it('should work', async ()=> {
    const arr = [];
    const stack = [];

    stack.push(async (ctx, next) => {
      arr.push(1);
      await wait(1);
      await next()
      await wait(1);
      arr.push(6)
    })

    stack.push(async (context, next) => {
      arr.push(2)
      await wait(1)
      await next()
      await wait(1)
      arr.push(5)
    })

    stack.push(async (context, next) => {
      arr.push(3)
      await wait(1)
      await next()
      await wait(1)
      arr.push(4)
    })

    await compose(stack)({})
    expect(arr).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]))
  });
});
