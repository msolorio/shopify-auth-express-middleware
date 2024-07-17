import { add } from '#app/example.mjs'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
