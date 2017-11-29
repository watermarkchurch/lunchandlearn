So now that we've looked at [using libraries in TypeScript](../02_library_types),
let's talk about bundling stuff up using modern build tools.  We'll look at two
scenarios, bundling for an NPM package and bundling for the web.

# Building for nodejs (gulp)

We can incorporate typescript into our build process for nodejs using gulp.
Check out the [gulpfile.js](gulpfile.js).  It compiles all .ts files to the `dist/`
folder.  `dist/fibonacci.js` will be the entry point of our library, which defines
the module that you load up if you `require("fibonacci")`.  We'll also have a CLI,
which we'll package as an executable, called `dist/index.js`.

```json
  "name": "fibonacci",
  "main": "dist/fibonacci.js",
  "bin": {
    "fibonacci": "dist/index.js"
  },
```

## Gulpfile

The gulpfile is very straightforward.  It has only one task, that finds all non-test
files in the `src/` directory and compiles them using `gulp-typescript`.  It then
pipes the compiled javascripts and the resulting typescript definition files to
`dist/`.

The `.d.ts` files are important in case someone requires our library in their own
typescript project.  The typescript compiler reads these in order to figure out
the types of everything in our `.js` files.  So none of the type info is lost.

We can now run the command line with node:

```
chmod +x dist/index.js
dist/index.js
```

Try it with various command line options!

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
```

```js
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var events_1 = __webpack_require__(34);
var Fibonacci = (function (_super) {
    __extends(Fibonacci, _super);
    function Fibonacci(verbose) {
        var _this = _super.call(this) || this;
        _this.verbose = verbose || false;
        if (_this.verbose) {
            _this.on('data', function (data) {
                console.error('next:', data);
            });
            _this.on('error', function (err) {
                console.error('err :', err);
            });
        }
        return _this;
    }
    Fibonacci.prototype.runner = function (arr, n) {
        var _this = this;
        if (arr.length >= n) {
            if (this.verbose) {
                console.error('done:', arr);
            }
            this.emit('end', arr);
        }
        else {
            this.pushNext(arr);
            setTimeout(function () { _this.runner(arr, n); }, 250);
        }
    };
    Fibonacci.prototype.pushNext = function (arr) {
        if (arr.length < 2) {
            this.emit('data', 1);
            arr.push(1);
        }
        else {
            var next = arr[arr.length - 1] + arr[arr.length - 2];
            this.emit('data', next);
            arr.push(next);
        }
    };
    Fibonacci.prototype.run = function (n) {
        var _this = this;
        setTimeout(function () { _this.runner([], n); }, 0);
        return this;
    };
    return Fibonacci;
}(events_1.EventEmitter));
exports.Fibonacci = Fibonacci;


/***/ }),
```

The whole file gets stripped of all typing definitions, and included as plain
javascript.  Then the `fibonacci` function gets assigned to `__webpack_exports__["a"]`,
which makes it available outside this bundled function's scope.

We require the `fibonacci` function in `web.tsx` like this:

```typescript
import { Fibonacci } from './fibonacci'
```

And it's bundled up by webpack and translated to this:

```js
var fibonacci_1 = __webpack_require__(33);
```

And then webpack replaces our constructor `new Fibonacci` with this:

```js
var f = new fibonacci_1.Fibonacci();
```

Fortunately we don't need to care about any of that!  Webpack handles it and it's completely opaque.
Webpack also generates sourcemap files which allow Chrome or Mozilla devtools to translate all that
craziness back into our `.ts` and `.tsx` files.

# Running Tests

[Mocha](https://mochajs.org/) can run our tests using the `ts-node` library.  We can write tests as
typescript files and use typescript to assist us in building our tests!  Check out
[fibonacci.test.ts](src/fibonacci.test.ts)

Running our tests requires us simply to `--require ts-node/register`.  This library automatically
compiles any typescript files before passing them to mocha.  Here's the full command to run tests:

```
mocha --require ts-node/register src/**/*.test.ts
```

[Go to the next step -->](../04_fun_stuff)