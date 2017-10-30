# Typescript is just Javascript.

It's officially a "superset of javascript".  But any (correct) javascript file
is also a compileable typescript file.

Take a look at the examples in this directory.  Notice the difference between
[jquery.js](jquery.js) and [jquery.ts](jquery.ts).  The only difference is 
that we had to tell the Typescript compiler that the `$` symbol exists and is
defined elsewhere.

## Compiling Typescript

You'll need the Typescript compiler, which you can install using node: 
```
npm install -g tsc
```

Then you run it on the typescript file to produce a javascript file:

```
tsc jquery.ts --out jquery_compiled.js
```

If you have errors, the compiler will show them to you.  For example, what if
we had forgotten the declaration at the top of the typescript file?

```
$ tsc jquery.ts --out jquery_compiled.js
jquery.ts(1,1): error TS2304: Cannot find name '$'.
jquery.ts(3,7): error TS2304: Cannot find name '$'.
jquery.ts(4,13): error TS2304: Cannot find name '$'.
jquery.ts(16,7): error TS2304: Cannot find name '$'.
jquery.ts(19,24): error TS2304: Cannot find name '$'.
jquery.ts(21,17): error TS2304: Cannot find name '$'.
```

However, *tsc will still try it's best to compile the file*.  And in this case
it will succeed.  Try it yourself!

## Compiled javascript files

Look into [jquery_compiled.js](jquery_compiled.js) to see what it looks like
once it's compiled.  Open up your diff tool to compare it to [jquery.js](jquery.js).
It's practically the same file.  Typescript just fixed our semicolons and 
removed extra spaces.

## Example

![tsc example](tsc.gif)