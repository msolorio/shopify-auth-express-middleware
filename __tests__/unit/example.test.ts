import { add } from '#app/example.js'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
