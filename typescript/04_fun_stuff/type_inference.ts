/*
 * Basic type inference
 */

enum MyEnum {
  One = 2,  // numeric
  Two,
  Three
}

let h = {
  some_str: "A String",
  some_bool: false,
  some_array: ["combo string and int", 1, 2],
  some_union_type: <boolean | number> false
}

let numval = 7
let strval = "A string";
let enumval = MyEnum.One

// compiles

h.some_str = "whats up"
h.some_bool = true
h.some_array.push(7)
h.some_array.push("hello world") 
h.some_array = ["1", "2"]
h.some_union_type = 15

numval = 1
strval = "Another string"

enumval = 2  // enum is numeric

// doesn't compile

h.some_str = 9
h.some_bool = "False"
h.some_array.push(false)
h.some_union_type = { is: 'object' }

numval = "2"
strval = 9
enumval = "two"

/*
 * Function return value inference
 */

function sort(a, b) {
  return a - b;
}

let lambdaSort = (a, b) => ( 
  a - b
)

let forgotReturnStatement = (a, b) => {
  a - b
}

// compiles

numval = sort(1, "s")
numval = lambdaSort("a", { is: "object" })

// doesn't compile

strval = sort(1, "s")
strval = lambdaSort("a", { is: "object" })

numval = forgotReturnStatement(1, 2)