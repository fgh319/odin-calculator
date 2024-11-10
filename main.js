"use strict";

const resultElem = document.querySelector(".result");
const expressionElem = document.querySelector(".expression");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const deleteBtn = document.querySelector(".delete");
const dotBtn = document.querySelector(".dot");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");

const MAX_LENGTH = 13;

let firstNumber = "";
let secondNumber = "";
let currentInput = "0";
let lastStep = "";
let operator = null;

document.addEventListener("keydown", handleKeyboard);
clearBtn.addEventListener("click", handleClear);
deleteBtn.addEventListener("click", handleDelete);
equalBtn.addEventListener("click", handleEqual);
dotBtn.addEventListener("click", handleDot);

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    handleOperator(operatorBtn.textContent);
  });
});

numberBtns.forEach((numberBtn) => {
  numberBtn.addEventListener("click", () => {
    handleNumber(numberBtn.textContent);
  });
});

function handleKeyboard(e) {
  const key = e.key;

  if (isFinite(key)) {
    handleNumber(key);
  } else if (key === ".") {
    handleDot();
  } else if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "%"
  ) {
    handleOperator(changeOperator(key));
  } else if (key === "Enter" || key === "=") {
    handleEqual();
  } else if (key === "C" || key === "c" || key === "Escape") {
    handleClear();
  } else if (key === "Backspace") {
    handleDelete();
  }
}

function changeOperator(key) {
  switch (key) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "×";
    case "/":
      return "÷";
    case "%":
      return "%";
  }
}

function handleNumber(value) {
  if (currentInput.length < MAX_LENGTH) {
    if (currentInput === "0") {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateResult(currentInput);
  }
}

function handleDot() {
  if (currentInput.length < MAX_LENGTH) {
    if (currentInput.includes(".")) {
      return null;
    } else if (currentInput === "") {
      currentInput = "0.";
    } else {
      currentInput += ".";
    }
    updateResult(currentInput);
  }
}

function handleOperator(value) {
  if (currentInput !== "") {
    if (firstNumber !== "") {
      firstNumber = operate(firstNumber, parseFloat(currentInput), operator);
    } else {
      firstNumber = parseFloat(currentInput);
    }
    operator = value;
    updateResult(firstNumber);
    lastStep = `${firstNumber} ${operator}`;
    updateLastStep(lastStep);
    currentInput = "";
  }
}

function handleEqual() {
  if (firstNumber !== "" && currentInput !== "" && operator) {
    secondNumber = parseFloat(currentInput);
    if (operator === "÷" && secondNumber === 0) {
      alert("错误！请不要除以0！");
      return;
    }
    const resultNumber = operate(firstNumber, secondNumber, operator);
    currentInput = limitResultLength(resultNumber, MAX_LENGTH);
    updateResult(currentInput);
    lastStep += ` ${secondNumber} =`;
    updateLastStep(lastStep);
    operator = null;
    firstNumber = "";
    secondNumber = "";
  }
}

function handleClear() {
  firstNumber = "";
  secondNumber = "";
  currentInput = "0";
  lastStep = "";
  operator = null;
  updateResult(currentInput);
  updateLastStep(lastStep);
}

function handleDelete() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
    updateResult(currentInput);
  } else {
    currentInput = "0";
    updateResult(currentInput);
  }
}

function limitResultLength(result, maxLength) {
  let resultStr = result.toString();

  // 如果结果字符长度超过限制
  if (resultStr.length > maxLength) {
    resultStr = resultStr.slice(0, maxLength);
  }

  return resultStr;
}

function updateLastStep(value) {
  expressionElem.textContent = value;
}

function updateResult(value) {
  resultElem.textContent = value;
}

function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "×":
      return multiply(firstNumber, secondNumber);
    case "÷":
      return divide(firstNumber, secondNumber);
    case "%":
      return remainder(firstNumber, secondNumber);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b !== 0 ? a / b : "Error";
}

function remainder(a, b) {
  return a % b;
}
