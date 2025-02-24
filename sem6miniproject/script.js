document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const display = document.getElementById("display");

    const pageMap = {
        "home": "<h1>Welcome to BudgetBot</h1><p></p>",
        "advice": "<h1>AI-Advice</h1><p>Get AI-based financial suggestions.</p>",
        "loan": "<h1>Loan Calculator</h1><p>Calculate your loan repayment plans.</p>",
        "tax": '<object type="text/html" data="taxcalc.html" width="100%" height="500px"></object>',
        "reports": "<h1>Reports</h1><p>View all financial reports.</p>"
    };

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            let tabKey = this.getAttribute("data-tab");
            display.innerHTML = pageMap[tabKey];
        });
    });
});

document.getElementById("financialForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let income = document.getElementById("income").value.split(",").map(Number);
    let expenses = document.getElementById("expenses").value.split(",").map(Number);
    let loan = document.getElementById("loan").value;
    let investment = document.getElementById("investment").value;

    fetch('/generate_charts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, email, income, expenses, loan, investment })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("pieChart").src = "data:image/png;base64," + data.pie_chart;
        document.getElementById("pieChart").style.display = "block";

        document.getElementById("lineChart").src = "data:image/png;base64," + data.line_chart;
        document.getElementById("lineChart").style.display = "block";

        document.getElementById("adviceText").textContent = 
            "Your goal limit for next month expense is: ₹" + data.avg_expense.toFixed(2);
    });
});
