/**
 * There's a bunch of way to enumerate a list of
 * acceptible values in Typescript.
 */

import { createInterface } from 'readline'

// Basic enums:

enum Color {
  Red,
  Green,
  Blue
}

enum NumericEnum {
  A = 2,
  B,
  C,
  D // = 5
}

enum FlagsEnum {
  None = 0,
  OptionX = 1 << 0,
  OptionY = 1 << 1,
  OptionZ = 1 << 2
}

function doWithFlags(flags: FlagsEnum) {
  if (flags & FlagsEnum.OptionY) {
    console.log('Y')
  }
}

doWithFlags(FlagsEnum.OptionX | FlagsEnum.OptionY)

// inline enumerated values:

function sortDocuments(order: 'asc' | 'desc' = 'asc'): NodeJS.ReadWriteStream {
  // TODO: implement transform stream!
  return null
}

sortDocuments('decs') // Even though I'm lysdexic, Typescript catches this error!

sortDocuments('asc')
sortDocuments() // default is 'asc'

/**
 * You can also do function overloads!
 */
type PromiseIndicator = true
type Callback = (err: any, result: number) => void

function possiblyDoAsync(cb: Callback): void

function possiblyDoAsync(): number

function possiblyDoAsync(promise: PromiseIndicator): Promise<number>

// here is the implementation
function possiblyDoAsync(promiseOrCb?: PromiseIndicator | Callback) {
  if (!promiseOrCb) {
    // the synchronous path
    var line = require('readline-sync').question('May I have a number?');
    return parseInt(line)
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  if (typeof(promiseOrCb) === 'function') {
    // async callback path
    rl.question('May I have a number?', (answer: string) => {
      promiseOrCb(null, parseInt(answer))
    })
  } else if (typeof(promiseOrCb) === 'boolean') {
    // async with promise path
    return new Promise<number>((resolve, reject) => {
      rl.question('May I have a number?', (answer: string) => {

        //promiseOrCb(null, parseInt(answer)) // does not compile!
        resolve(parseInt(answer))
      })
    })
  }
}

// Now for usage!

console.log('value > 0 ?', possiblyDoAsync() > 0)

possiblyDoAsync(true)
  .then((value) => {
    console.log('value > 0 ?', value > 0)
  })

possiblyDoAsync((err, result) => {
  if (err) {
    console.error('Error!', err)
  } else {
    console.log('value > 0 ?', result > 0)
  }
})

// does not compile!
possiblyDoAsync(false)
possiblyDoAsync('some string')
possiblyDoAsync().then((value) => {})
possiblyDoAsync(true) > 0

