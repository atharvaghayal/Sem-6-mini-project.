document.getElementById("adviceForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let annualIncome = parseFloat(document.getElementById("annualIncome").value);
    let annualExpenses = parseFloat(document.getElementById("annualExpenses").value);
    let age = parseInt(document.getElementById("age").value);
    let investment = parseFloat(document.getElementById("investment").value);
    let loan = parseFloat(document.getElementById("loan").value);

    let adviceList = document.getElementById("adviceList");
    adviceList.innerHTML = "";  // Clear previous advice

    // 1. Expense Control Advice
    if (annualExpenses > (0.7 * annualIncome)) {
        adviceList.innerHTML += "<li><strong>Expense Control:</strong> Your expenses exceed 70% of your income. Consider budgeting more effectively.</li>";
    } else {
        adviceList.innerHTML += "<li><strong>Expense Control:</strong> Your expense management is good, but keep tracking your spending habits.</li>";
    }

    // 2. Loan Management Advice
    if (loan > (annualIncome * 0.5)) {
        adviceList.innerHTML += "<li><strong>Loan Management:</strong> Your loan is more than 50% of your annual income. Prioritize repayment to reduce financial burden.</li>";
    } else {
        adviceList.innerHTML += "<li><strong>Loan Management:</strong> Your loan is within a manageable limit. Keep making regular payments.</li>";
    }

    // 3. Goal Setting Based on Age
    if (age < 30) {
        adviceList.innerHTML += "<li><strong>Future Goals:</strong> Focus on building savings and long-term investments for financial stability.</li>";
    } else if (age < 50) {
        adviceList.innerHTML += "<li><strong>Future Goals:</strong> Plan for retirement by increasing investments in secure assets.</li>";
    } else {
        adviceList.innerHTML += "<li><strong>Future Goals:</strong> Ensure you have a stable retirement plan and reduce unnecessary expenses.</li>";
    }

    // 4. Income Advice
    if (annualIncome < 100000) {
        adviceList.innerHTML += "<li><strong>Increase Income:</strong> Your income is below ₹1,00,000 per year. Consider upskilling or finding alternative income sources.</li>";
    } else {
        adviceList.innerHTML += "<li><strong>Income Status:</strong> Your income is stable, but continuous growth should be a goal.</li>";
    }

    // 5. Future Expense Prediction
    let predictedExpense = annualExpenses * 1.1; // 10% increase prediction
    adviceList.innerHTML += `<li><strong>Future Expense Prediction:</strong> Next year's estimated expenses: ₹${predictedExpense.toFixed(2)}. Plan accordingly.</li>`;

    // 6. Investment Advice
    if (investment < (0.2 * annualIncome)) {
        adviceList.innerHTML += "<li><strong>Investment Advice:</strong> Your investment is less than 20% of your income. Consider increasing investments for better future security.</li>";
    } else {
        adviceList.innerHTML += "<li><strong>Investment Advice:</strong> Your investment ratio is good. Maintain a balanced portfolio.</li>";
    }
});