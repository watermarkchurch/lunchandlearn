import { expect } from 'chai'

import { Fibonacci } from './fibonacci'

describe('fibonacci', () => {

  it('should return empty array for n = 0', (done) => {
    const instance = new Fibonacci()

    // act
    instance.run(0)
      .on('end', (result) => {
        // assert
        expect(result).to.have.lengthOf(0)

        done()
      })
  })

  it('should return single element array for n = 1', (done) => {
    const instance = new Fibonacci()

    // act
    instance.run(1)
      .on('end', (result) => {
        // assert
        expect(result).to.deep.eq([1])

        done()
      })
  })

  it('should return filled array for n > 1', (done) => {

    const instance = new Fibonacci()
    
    // act
    instance.run(7)
      .on('end', (result) => {
        // assert
        expect(result).to.have.lengthOf(7)
        expect(result).to.deep.eq([1, 1, 2, 3, 5, 8, 13])

        done()
      })
  })
})