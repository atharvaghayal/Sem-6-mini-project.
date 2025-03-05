document.addEventListener("DOMContentLoaded", function () {
    // Fetch Data from Local Storage
    let income = JSON.parse(localStorage.getItem("monthlyIncome")) || {};
    let expenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || {};
    let investments = parseFloat(localStorage.getItem("investmentAmount")) || 0;
    let loans = parseFloat(localStorage.getItem("loanAmount")) || 0;

    // Calculate Total Values
    let totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);
    let totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    let savings = totalIncome - (totalExpenses + investments + loans);

    // Update Expense Table
    let tableBody = document.getElementById("expenseTableBody");
    let categories = { "Income": totalIncome, "Expenses": totalExpenses, "Investments": investments, "Loans": loans, "Savings": savings };

    Object.keys(categories).forEach(category => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${category}</td><td>₹${categories[category].toFixed(2)}</td>`;
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
                backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f1c40f"],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // This keeps it proportional
        }        
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Fetch Data from Local Storage
    let income = JSON.parse(localStorage.getItem("monthlyIncome")) || {};
    let expenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || {};
    let investments = parseFloat(localStorage.getItem("investmentAmount")) || 0;
    let loans = parseFloat(localStorage.getItem("loanAmount")) || 0;
    let email = localStorage.getItem("userEmail") || "Not Provided"; // Fetch Email
    let aiAdvice = localStorage.getItem("aiAdvice") || "No Advice Available"; // AI Advice
    let taxAmount = localStorage.getItem("calculatedTax") || "Not Calculated"; // Tax Data

    // Calculate Totals
    let totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);
    let totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    let savings = totalIncome - (totalExpenses + investments + loans);

    // Update Report Form
    document.getElementById("email").value = email;
    document.getElementById("totalIncome").textContent = `₹${totalIncome.toFixed(2)}`;
    document.getElementById("totalExpenses").textContent = `₹${totalExpenses.toFixed(2)}`;
    document.getElementById("investments").textContent = `₹${investments.toFixed(2)}`;
    document.getElementById("loans").textContent = `₹${loans.toFixed(2)}`;
    document.getElementById("savings").textContent = `₹${savings.toFixed(2)}`;
    document.getElementById("aiAdvice").textContent = aiAdvice;
    document.getElementById("taxAmount").textContent = `₹${taxAmount}`;
});

document.getElementById("sendReport").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let reportData = {
        email: email,
        totalIncome: document.getElementById("totalIncome").textContent,
        totalExpenses: document.getElementById("totalExpenses").textContent,
        investments: document.getElementById("investments").textContent,
        loans: document.getElementById("loans").textContent,
        savings: document.getElementById("savings").textContent,
        taxAmount: document.getElementById("taxAmount").textContent,
        aiAdvice: document.getElementById("aiAdvice").textContent
    };

    fetch("/send_report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        alert("Error sending email!");
        console.error(error);
    });
});