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
var events_1 = require("events");
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
