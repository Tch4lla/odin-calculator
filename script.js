let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = 0;
let stack = [];

const display = document.getElementById('display');
const numbers = document.querySelectorAll('.number');
numbers.forEach(
  (number) =>
    (number.onclick = (e) => {
      if (stack.length == 0) {
        firstNumber += e.target.id;
        display.innerText = firstNumber;
      } else {
        secondNumber += e.target.id;
        display.innerText = secondNumber;
      }
    })
);

const operators = document.querySelectorAll('.operator');

operators.forEach((op) => {
  op.onclick = (e) => {
    operator = e.target.innerText;
    operators.forEach((operator) => operator.classList.remove('selected'));
    op.classList.add('selected');
    if (firstNumber && !secondNumber) {
      stack.push(firstNumber);
      display.innerText = '';
    }
  };
});

const equals = document.getElementById('equals');
equals.onclick = () => {
  stack.push(secondNumber);
  const operand2 = stack.pop();
  const operand1 = stack.pop();
  result = operate(operator, operand2, operand1);
  display.innerText = result;
  stack.push(result);
  firstNumber = '';
  secondNumber = '';
  operators.forEach((operator) => operator.classList.remove('selected'));
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, firstNumber, secondNumber) => {
  switch (operator) {
    case '+':
      result = add(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case '-':
      result = subtract(parseFloat(secondNumber), parseFloat(firstNumber));
      break;
    case '*':
      result = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case '/':
      result = divide(parseFloat(secondNumber), parseFloat(firstNumber));
      break;
  }
  return result.toFixed(2);
};

const clear = document.getElementById('clear');
clear.onclick = () => {
  display.innerText = '';
  firstNumber = '';
  secondNumber = '';
  operators.forEach((operator) => operator.classList.remove('selected'));
  stack.length = 0;
};
