//RUNNING THIS FILE ON TERMINAL THROUGH node fileName.js
// let n = 5;
// for (let i=0; i<n; i++) {
//     console.log("hello, ", i);
// }

//TAKING ARGS THROUGH TERMINAL AND PRINTING IT
// console.log(process.argv);

// let args = process.argv;
// for(let i=2; i<args.length; i++) {
//     console.log("Hello to ", args[i]);
// }

//USING module.exports & require TO IMPORT FUNC FROM MATH.JS IN SCRIPT.JS
// const math = require("./math");
// console.log(math.PI);
// console.log(math.g);
// console.log(math.sum(2, 5));
// console.log(math.mul(6, 2));

// IMPORTING A DIRECTORY USING module.exports
// const info = require("./Fruits");
// console.log(info);

// TYPE 5 USING IMPORTS
import {sum, PI} from "./math.js"
console.log(sum(2,6));