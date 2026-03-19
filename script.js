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
  return a / b;
}

let numOne = "";
let numTwo = "";
let operator = "";
let result = "";

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function clearDisplay() {
  //   display.textContent = "";
  displayNumOne.textContent = "";
  displayNumTwo.textContent = "";
  displayOperator.textContent = "";
}

function clearVar() {
  numOne = "";
  numTwo = "";
  operator = "";
}

// const display = document.querySelector(".display");
const displayNumOne = document.querySelector(".num-one");
const displayNumTwo = document.querySelector(".num-two");
const displayOperator = document.querySelector(".operator");

const selectNumOne = document.querySelectorAll(".numbers button");
const selectNumTwo = document.querySelectorAll(".numbers button");
const selectOperator = document.querySelectorAll(".operators button");

const btnOperate = document.querySelector(".btn-operate");
const btnClear = document.querySelector(".clear");

selectNumOne.forEach((num) => {
  num.addEventListener("click", () => {
    if (operator === "") {
      numOne += num.textContent;

      console.log("#1 " + numOne);

      // Clear display if pressing input when only numOne exist
      if (isFinite(result) && result !== "") {
        numOne = num.textContent;
        displayNumOne.textContent = numOne;
        result = "Fix"; // Random string value to make sure typeof result != number
      } else displayNumOne.textContent = numOne;
    }
  });
});

selectNumTwo.forEach((num) => {
  num.addEventListener("click", () => {
    if (operator !== "") {
      numTwo += num.textContent;

      console.log("#2 " + numTwo);

      displayNumTwo.textContent = numTwo;
    }
  });
});

let division = "";

selectOperator.forEach((op) => {
  op.addEventListener("click", () => {
    if (numOne !== "") {
      operator = op.textContent;

      if (operator === "/") division = operator;

      if (
        !displayOperator.textContent.includes("/") &&
        !displayOperator.textContent.includes("*") &&
        !displayOperator.textContent.includes("-") &&
        !displayOperator.textContent.includes("+")
      ) {
        displayOperator.textContent = operator;
      }

      if (operator !== "" && numOne !== "" && numTwo !== "") {
        result = operate(numOne, numTwo, displayOperator.textContent);

        clearDisplay();

        numOne = Math.round(result * 100) / 100;

        if (numTwo == 0 && division === "/") {
          displayNumOne.textContent = "ERROR";
          clearVar();
        } else {
          displayNumOne.textContent = numOne;
          displayOperator.textContent = operator;

          numTwo = "";

          result = operate(numOne, numTwo, operator);
        }

        console.log(result);
      }
    }
  });
});

btnOperate.addEventListener("click", () => {
  if (numOne === "" || (numOne !== "" && numTwo === "")) return;
  else {
    result = operate(numOne, numTwo, operator);

    clearDisplay();

    numOne = Math.round(result * 100) / 100;

    if (numTwo == 0 && operator === "/") {
      displayNumOne.textContent = "ERROR";
      clearVar();
    } else {
      displayNumOne.textContent = numOne;
      numTwo = "";
      operator = "";
    }

    console.log(result);
  }
});

btnClear.addEventListener("click", () => {
  clearDisplay();
  clearVar();
});
