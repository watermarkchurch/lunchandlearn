
import { EventEmitter } from 'events'

type resolver = (value?: number[] | PromiseLike<number[]>) => void

export class Fibonacci 
    extends EventEmitter {

  private verbose: boolean

  constructor(verbose?: boolean) {
    super()

    this.verbose = verbose || false
    if (this.verbose) {
      this.on('data', (data) => {
        console.error('next:', data)
      })
      this.on('error', (err) => {
        console.error('err :', err)
      })
    }
  }

  private runner(arr: number[], n: number) {
    if (arr.length >= n) {
      if (this.verbose) { console.error('done:', arr) }
      this.emit('end', arr)
    } else {
      this.pushNext(arr)
      setTimeout(
        () => { this.runner(arr, n) },
        250
      )
    }
  }

  private pushNext(arr: number[]) {
    if (arr.length < 2) {
      this.emit('data', 1)
      arr.push(1)
    } else {
      const next = arr[arr.length -1] + arr[arr.length -2]
      this.emit('data', next)
      arr.push(next)
    }
  }

  run(n: number) {
    setTimeout(() => { this.runner([], n) }, 0)
    return this
  }
}