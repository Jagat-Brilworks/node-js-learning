const operations = require('./mathOperations');

const addition = operations.addition(18, 3);
console.log('Addition -> Result of 18 + 3 is ', addition);

const subtraction = operations.subtraction(18, 3);
console.log('Subtraction -> Result of 18 - 3 is ', subtraction);

const multiplication = operations.multiplication(18, 3);
console.log('Multiplication -> Result of 18 * 3 is ', multiplication);

const division = operations.division(18, 3);
console.log('Division -> Result of 18 / 3 is ', division);
