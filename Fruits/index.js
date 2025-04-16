// MODULE EXPORTS IN DIRECTORIES
// CREATE INDEX.JS IN A DIRECTORY FROM WHERE WE WANT THE MODULE FILES.
// IMPORT ALL THE FILES IN ONE INDEX.JS FILE

const apple = require("./apple");
const mango = require("./mango");
const kiwi = require("./kiwi");

let fruits = [apple, mango, kiwi];

module.exports = fruits;