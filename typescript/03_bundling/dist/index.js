#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var program = require("commander");
var fibonacci_1 = require("./fibonacci");
var args = {
    verbose: false,
    n: 0
};
program
    .version('0.1.0')
    .option('-v|--verbose', 'enable verbose logging')
    .arguments('<n>')
    .action(function (n) {
    args.n = parseInt(n);
    if (isNaN(args.n)) {
        console.error(n, 'is not a number');
        program.help();
    }
})
    .parse(process.argv);
args.verbose = program.verbose;
new fibonacci_1.Fibonacci(args.verbose)
    .on('end', function (result) {
    if (result.length == 0) {
        console.log(0);
    }
    else {
        console.log(result[result.length - 1]);
    }
})
    .run(args.n);
