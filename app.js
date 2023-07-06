const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const saving = document.getElementById("saving");
const type = document.getElementById("type-select")
const amount = document.getElementById("amount")
const description = document.getElementById("description")
const displayRecords = document.getElementById('records')
var expenseArray = []
let objstr = localStorage.getItem("expenseArray")
if (objstr != null) {
    expenseArray = JSON.parse(objstr)
}
displayExpense(expenseArray)

let expenseWeek = localStorage.getItem("expenseWeek")
if (expenseWeek === null) {
    localStorage.setItem("expenseWeek", JSON.stringify([0, 0, 0, 0, 0, 0, 0]))
} else {
    expenseWeek = JSON.parse(localStorage.getItem("expenseWeek"))
}

const date = new Date();


const day = date.getDay()
let dayBool = localStorage.getItem("dayBool")
if (dayBool === null) {
    localStorage.setItem("dayBool", JSON.stringify(true))
} else {
    dayBool = JSON.parse(localStorage.getItem("dayBool"))
}

if (day === 0 && dayBool === true) {
    localStorage.setItem("dayBool", JSON.stringify(false))
    localStorage.setItem("expenseWeek", JSON.stringify([0, 0, 0, 0, 0, 0, 0]))
}
if (day === 1) {
    localStorage.setItem("dayBool", JSON.stringify(true))
}

const date1 = date.getDate()
let dateBool = localStorage.getItem("dateBool")
if (dateBool === null) {
    localStorage.setItem("dateBool", JSON.stringify(true))
} else {
    dateBool = JSON.parse(localStorage.getItem("dateBool"))
}

if (date1 === 0 && dateBool === true) {
    localStorage.setItem("dateBool", JSON.stringify(false))
    localStorage.setItem("expense", JSON.stringify(0))
    localStorage.setItem("expenseArray", JSON.stringify([]))
}
if (date1 === 1) {
    localStorage.setItem("dateBool", JSON.stringify(true))
}






let expenseValue = localStorage.getItem("expense")
if (expenseValue === null) {
    localStorage.setItem("expense", JSON.stringify(0))
}
else {
    expenseValue = parseInt(localStorage.getItem("expense"))
}

let incomeValue = localStorage.getItem("income")
if (incomeValue === null) {
    localStorage.setItem("income", JSON.stringify(0))
}
else {
    incomeValue = parseInt(localStorage.getItem("income"))
}

let balanceValue = localStorage.getItem("balance")
if (balanceValue === null) {
    localStorage.setItem("balance", JSON.stringify(0))
}
else {
    balanceValue = parseInt(localStorage.getItem("balance"))
}

let savingValue = localStorage.getItem("saving")
if (savingValue === null) {
    localStorage.setItem("saving", JSON.stringify(0))
}
else {
    savingValue = parseInt(localStorage.getItem("saving"))
}

display()


function calculate() {

    expenseArray.unshift({
        "descriptionTable": description.value,
        "amountTable": amount.value,
        "typeTable": type.value
    })
    localStorage.setItem("expenseArray", JSON.stringify(expenseArray))
    displayExpense(expenseArray)

    if (type.value === "Expense") {


        expenseValue = expenseValue + parseInt(amount.value)
        balanceValue = balanceValue - parseInt(amount.value)
        expenseWeek[day] = expenseWeek[day] + parseInt(amount.value)

        display()
        localStorage.setItem("expense", JSON.stringify(expenseValue))
        localStorage.setItem('balance', JSON.stringify(balanceValue))
        localStorage.setItem("expenseWeek", JSON.stringify(expenseWeek))
        clear();
        location.reload();



    } else if (type.value === "Saving") {

        savingValue = savingValue + parseInt(amount.value)
        balanceValue = balanceValue - parseInt(amount.value)

        display()
        clear()
        localStorage.setItem("saving", JSON.stringify(savingValue))
        localStorage.setItem('balance', JSON.stringify(balanceValue))

    } else if (type.value === "Income") {

        incomeValue = incomeValue + parseInt(amount.value)
        balanceValue = balanceValue + parseInt(amount.value)

        display()
        clear()
        localStorage.setItem("income", JSON.stringify(incomeValue))
        localStorage.setItem('balance', JSON.stringify(balanceValue))

    }



}


function displayExpense(expenseArray) {
    const date = new Date();
    let statement = ''
    expenseArray.forEach((user, i) => {
        statement = statement + `<tr>
        <td>${i + 1}</td>
        <td>${user.descriptionTable}</td>
        <td>${user.amountTable}</td>
        <td>${user.typeTable}</td>
        <td>${date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</td>
    </tr>`
        displayRecords.innerHTML = statement;
    })

}

function display() {
    income.innerHTML = incomeValue
    balance.innerHTML = balanceValue
    saving.innerHTML = savingValue
    expense.innerHTML = expenseValue
}

function clear() {
    description.value = ''
    amount.value = ''
}



function home() {
    document.getElementsByClassName("expense-tracker")[0].style.display = 'block'

    document.getElementsByClassName("history")[0].style.display = 'none'


}

function history() {
    document.getElementsByClassName("expense-tracker")[0].style.display = 'none'

    document.getElementsByClassName("history")[0].style.display = 'block'


}









































let myChart = document.getElementById('myChart').getContext('2d');

Chart.defaults.font.size = 16;
Chart.defaults.font.family = 'Lato';
Chart.defaults.color = '#fff';



let expenseChart = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: ["Sunday", 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Expense',
            data: expenseWeek,
            backgroundColor: '#D60D0D',
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: true,
        showScale: false,
    }
})