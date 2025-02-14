let salaryData = [];
let expenseData = [];
let monthLabels = [];

document.getElementById("budgetForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let income = parseFloat(document.getElementById("income").value);
    let expenses = parseFloat(document.getElementById("expenses").value);
    let month = document.getElementById("month").value;

    salaryData.push(income);
    expenseData.push(expenses);
    monthLabels.push(month);

    updateCharts();
    updateSummary(income, expenses);
});

function updateCharts() {
    let lineCtx = document.getElementById("expenseLineChart").getContext("2d");
    new Chart(lineCtx, {
        type: "line",
        data: {
            labels: monthLabels,
            datasets: [{
                label: "Monthly Expenses",
                data: expenseData,
                borderColor: "#dc3545",
                fill: false
            }]
        }
    });

    let barCtx = document.getElementById("salaryExpenseBarChart").getContext("2d");
    new Chart(barCtx, {
        type: "bar",
        data: {
            labels: monthLabels,
            datasets: [
                {
                    label: "Salary",
                    data: salaryData,
                    backgroundColor: "#28a745"
                },
                {
                    label: "Expenses",
                    data: expenseData,
                    backgroundColor: "#dc3545"
                }
            ]
        }
    });

    document.getElementById("totalEarnings").textContent = salaryData.reduce((a, b) => a + b, 0);
}

function updateSummary(income, expenses) {
    let summary = document.getElementById("summaryList");
    let balance = income - expenses;
    summary.innerHTML = `
        <li>Salary: ₹${income}</li>
        <li>Expenses: ₹${expenses}</li>
        <li>Remaining Balance: ₹${balance}</li>
    `;
}

document.getElementById("generateReport").addEventListener("click", function() {
    fetch('/generate_report', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salaryData, expenseData, monthLabels })
    })
    .then(response => response.json())
    .then(data => {
        alert("Report Generated: " + data.filename);
    });
});