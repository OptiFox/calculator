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
  displayNumOne.textContent = "";
  displayNumTwo.textContent = "";
  displayOperator.textContent = "";
}

function clearVar() {
  numOne = "";
  numTwo = "";
  operator = "";
}

const displayNumOne = document.querySelector(".num-one");
const displayNumTwo = document.querySelector(".num-two");
const displayOperator = document.querySelector(".operator");

const selectNumOne = document.querySelectorAll(".numbers button");
const selectNumTwo = document.querySelectorAll(".numbers button");
const selectOperator = document.querySelectorAll(".operators button");
const backspace = document.querySelector(".backspace");
const decimal = document.querySelector(".decimal");

const btnOperate = document.querySelector(".btn-operate");
const btnClear = document.querySelector(".clear");

const shouldResetDisplay = () => isFinite(result) && result !== "";
const fixRepetition = "Fix with random value";
const stopDisplayReset = () => (result = fixRepetition);

function getNumOne(num) {
  if (operator === "" && num.textContent !== "<" && num.textContent !== ".") {
    numOne += num.textContent;

    if (shouldResetDisplay()) {
      numOne = num.textContent;
      displayNumOne.textContent = numOne;
      stopDisplayReset();
    } else displayNumOne.textContent = numOne;
  }
}

function getNumTwo(num) {
  if (operator !== "" && num.textContent !== "<" && num.textContent !== ".") {
    numTwo += num.textContent;

    displayNumTwo.textContent = numTwo;
  }
}

let eventKey = "";

let numConditions = (eventKey) => {
  let numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return numKeys[eventKey];
};

selectNumOne.forEach((num) => {
  num.addEventListener("click", () => {
    getNumOne(num);
  });

  document.addEventListener("keydown", (event) => {
    eventKey = event.key;

    if (numConditions(eventKey)) {
      if (document.activeElement !== num && num.textContent == eventKey) {
        num.focus();

        getNumOne(num);

        num.blur();
      }
    }
  });
});

selectNumTwo.forEach((num) => {
  num.addEventListener("click", () => {
    getNumTwo(num);
  });

  document.addEventListener("keydown", (event) => {
    eventKey = event.key;

    if (numConditions(eventKey)) {
      if (document.activeElement !== num && num.textContent == eventKey) {
        num.focus();

        getNumTwo(num);

        num.blur();
      }
    }
  });
});

let division = "";

const displayError = () => (displayNumOne.textContent = "ERROR");

function getOperator(op) {
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
        displayError();
        clearVar();
      } else {
        displayNumOne.textContent = numOne;
        displayOperator.textContent = operator;

        numTwo = "";

        result = operate(numOne, numTwo, operator);
      }
    }
  }
}

selectOperator.forEach((op) => {
  op.addEventListener("click", () => {
    getOperator(op);
  });

  document.addEventListener("keydown", (event) => {
    eventKey = event.key;

    if (
      eventKey == "+" ||
      eventKey == "-" ||
      eventKey == "*" ||
      eventKey == "/"
    ) {
      if (document.activeElement !== op && op.textContent == eventKey) {
        op.focus();

        getOperator(op);

        op.blur();
      }
    }
  });
});

function getBackspace() {
  if (numOne !== "" && numTwo === "" && operator === "") {
    numOne = String(numOne).slice(0, -1);
    displayNumOne.textContent = numOne;

    stopDisplayReset();
  } else if (operator !== "" && numTwo === "") {
    operator = "";
    displayOperator.textContent = operator;
  } else if (numTwo !== "") {
    numTwo = numTwo.slice(0, -1);
    displayNumTwo.textContent = numTwo;
  }
}

function getDecimal() {
  if (!String(numOne).includes(".") && operator === "" && numTwo === "") {
    if (numOne === "") numOne += "0.";
    else numOne += ".";

    stopDisplayReset();

    displayNumOne.textContent = numOne;
  } else if (!numTwo.includes(".") && operator !== "") {
    if (numTwo === "") numTwo += "0.";
    else numTwo += ".";

    displayNumTwo.textContent = numTwo;
  } else return;
}

function getOperate() {
  if (numOne === "" || (numOne !== "" && numTwo === "")) return;
  else {
    result = operate(numOne, numTwo, operator);

    clearDisplay();

    numOne = Math.round(result * 100) / 100;

    if (numTwo == 0 && operator === "/") {
      displayError();
      clearVar();
    } else {
      displayNumOne.textContent = numOne;
      numTwo = "";
      operator = "";
    }
  }
}

function getClear() {
  clearDisplay();
  clearVar();
}

backspace.addEventListener("click", () => {
  getBackspace();
});

decimal.addEventListener("click", () => {
  getDecimal();
});

btnOperate.addEventListener("click", () => {
  getOperate();
});

btnClear.addEventListener("click", () => {
  getClear();
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Backspace") {
    if (document.activeElement !== backspace) {
      backspace.focus();

      getBackspace();

      backspace.blur();
    }
  } else if (event.key == ".") {
    if (document.activeElement !== decimal) {
      decimal.focus();

      getDecimal();

      decimal.blur();
    }
  } else if (event.key == "Enter" || event.key == "=") {
    if (document.activeElement !== btnOperate) {
      btnOperate.focus();

      getOperate();

      btnOperate.blur();
    }
  } else if (event.key == "c" || event.key == "C") {
    if (document.activeElement !== btnClear) {
      btnClear.focus();

      getClear();

      btnClear.blur();
    }
  }
});
