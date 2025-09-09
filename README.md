1. Difference between var, let, and const

var → Old way, function-scoped, can be re-declared & updated.

let → New way, block-scoped, can be updated but not re-declared in the same scope.

const → Block-scoped, cannot be updated or re-declared.

2. Difference between map(), forEach(), and filter()

@forEach() → Loops through array, just executes something, doesn’t return a new array.

@map() → Loops through array, returns a new array with modified values.

@filter() → Loops through array, returns a new array with only elements that pass a condition.

3. Arrow Functions in ES6

A shorter way to write functions.
Example:

@Normal function
function add(a, b) {
return a + b;
}

@Arrow function
const add = (a, b) => a + b;

4. Destructuring Assignment in ES6

It lets you easily take values from arrays or objects into variables.
Example:

@Array
const nums = [1, 2, 3];
const [a, b] = nums;
// a=1, b=2

@Object
const person = { name: "Mira", age: 20 };
const { name, age } = person;

5. Template Literals in ES6

Use backticks (`) instead of quotes.

You can add variables directly with ${}.

Example:

let name = "Gargi";
let msg = `Hello, ${name}!`;

Difference from string concatenation:

Concatenation: "Hello, " + name + "!"

Template literal: `Hello, ${name}!` → easier & cleaner.
