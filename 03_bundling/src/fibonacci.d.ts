/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class Fibonacci extends EventEmitter {
    private verbose;
    constructor(verbose?: boolean);
    private runner(arr, n);
    private pushNext(arr);
    run(n: number): this;
}
