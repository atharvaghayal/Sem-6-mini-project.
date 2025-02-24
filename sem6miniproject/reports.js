document.addEventListener("DOMContentLoaded", function () {
    // Fetch Data from Local Storage
    let income = JSON.parse(localStorage.getItem("monthlyIncome")) || {};
    let expenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || {};
    let investments = JSON.parse(localStorage.getItem("investmentAmount")) || 0;
    let loans = JSON.parse(localStorage.getItem("loanAmount")) || 0;

    // Calculate Total Values
    let totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);
    let totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    let savings = totalIncome - (totalExpenses + investments + loans);

    // Update Expense Table
    let tableBody = document.getElementById("expenseTableBody");
    let categories = { "Income": totalIncome, "Expenses": totalExpenses, "Investments": investments, "Loans": loans, "Savings": savings };

    Object.keys(categories).forEach(category => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${category}</td><td>₹${categories[category]}</td>`;
        tableBody.appendChild(row);
    });

    // Display Expense Chart
    let ctx = document.getElementById("expenseChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Income", "Expenses", "Investments", "Loans", "Savings"],
            datasets: [{
                data: [totalIncome, totalExpenses, investments, loans, savings],
                backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f1c40f"]
            }]
        }
    });
});