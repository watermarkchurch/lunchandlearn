So now that we've looked at [using libraries in TypeScript](../02_library_types),
let's talk about bundling stuff up using modern build tools.  We'll look at two
scenarios, bundling for an NPM package and bundling for the web.

# Bundling for the web (webpack)

[Webpack](https://webpack.js.org/) is a tool for bundling your javascript along with dependencies in order
to be used on the web.  It will scan your dependency tree and write out a single
bundled javascript file containing your code and all dependencies.  It highjacks
the `require('library')` statement to call into the "webpack loader" at runtime,
which loads libraries from the same javascript file.

Webpack can load any type of file and bundle it, through its pluggable system of
loaders.  There exist a couple different loaders for typescript, we'll use
the [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader).

We're going to take our source files in the `src/` directory, compile them as
a module, and output them in the `dist/` directory as a single file.  This
file will get loaded up on the page at runtime.

### Webpack bundled file

the `awesome-typescript-loader` runs the typescript compiler automatically, ensuring
that you've used your library types correctly.  It then passes the typescript-compiled
abstract syntax tree into Webpack core, which resolves the dependencies and splats
them out into the bundled file.  Take a look at the difference between fibonacci.ts
and the version that gets put in the output bundle:

```typescript

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
```

```js
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fibonacci;
function fibonacci(n) {
    return new Promise((resolve, _) => {
        const ret = Array();
        runner(ret, n, resolve);
    });
}
function runner(arr, n, resolve) {
    if (arr.length >= n) {
        resolve(arr);
    }
    else {
        pushNext(arr);
        setTimeout(() => { runner(arr, n, resolve); }, 1000);
    }
}
function pushNext(arr) {
    if (arr.length < 2) {
        arr.push(1);
    }
    else {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    }
}


/***/ }),
```

The whole file gets stripped of all typing definitions, and included as plain
javascript.  Then the `fibonacci` function gets assigned to `__webpack_exports__["a"]`,
which makes it available outside this bundled function's scope.

We require the `fibonacci` function in `web.tsx` like this:

```typescript
import { fibonacci } from './fibonacci'
```

And it's provided in the bundle like this:

```js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fibonacci__ = __webpack_require__(33);
```

And then webpack replaces our call to `fibonacci($(this).val())` with this:

```js
Object(__WEBPACK_IMPORTED_MODULE_3__fibonacci__["a" /* fibonacci */])(__WEBPACK_IMPORTED_MODULE_2_jquery__(this).val())
```

Fortunately we don't need to care about any of that!  Webpack handles it and it's completely opaque.
Webpack also generates sourcemap files which allow Chrome or Mozilla devtools to translate all that
craziness back into our `.ts` and `.tsx` files.