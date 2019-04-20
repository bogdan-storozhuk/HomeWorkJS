let start = document.getElementById('start');
console.log(start);
let valueArr = [],
    count = 0,
    resultTable = document.querySelectorAll('.result-table')[0];
for (let i = 0; i < resultTable.childElementCount; i++) {
    if (resultTable.children[i].classList.value.includes("value")) {
        valueArr[count++] = resultTable.children[i];
    }
}
console.log(valueArr);
let ExpensesItems = document.getElementsByClassName('expenses-item');
console.log(ExpensesItems);
let buttons = document.getElementsByTagName('button'),
    button0 = buttons[0],
    button1 = buttons[1],
    button2 = buttons[2];
console.log(buttons);
let optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item');
console.log(optionalExpensesItems);
let chooseIncome = document.querySelector('.choose-income'),
    savings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
console.log(dayValue);