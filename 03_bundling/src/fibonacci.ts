
type resolver = (value?: number[] | PromiseLike<number[]>) => void

export function fibonacci(n: number): Promise<number[]> {
  return new Promise<number[]>((resolve, _) => {
    const ret = Array<number>()
    runner(ret, n, resolve)
  })
}

function runner(arr: number[], n: number, resolve: resolver) {
  if (arr.length >= n) {
    resolve(arr)
  } else {
    pushNext(arr)
    setTimeout(
      () => { runner(arr, n, resolve) },
      250
    )
  }
}

function pushNext(arr: number[]) {
  if (arr.length < 2) {
    arr.push(1)
  } else {
    arr.push(arr[arr.length -1] + arr[arr.length -2])
  }
}