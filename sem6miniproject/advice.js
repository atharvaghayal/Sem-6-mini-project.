document.getElementById("adviceForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let annualIncome = parseFloat(document.getElementById("annualIncome").value) || 0;
    let annualExpenses = parseFloat(document.getElementById("annualExpenses").value) || 0;
    let age = parseInt(document.getElementById("age").value) || 0;
    let investment = parseFloat(document.getElementById("investment").value) || 0;
    let loan = parseFloat(document.getElementById("loan").value) || 0;

    let adviceList = document.getElementById("adviceList");
    adviceList.innerHTML = ""; // Clear previous advice

    function addAdvice(text) {
        let li = document.createElement("li");
        li.innerHTML = text;
        adviceList.appendChild(li);
    }

    // 1. Expense Control Advice
    if (annualExpenses > (0.7 * annualIncome)) {
        addAdvice("<strong>Expense Control:</strong> Your expenses exceed 70% of your income. Consider budgeting more effectively.");
    } else {
        addAdvice("<strong>Expense Control:</strong> Your expense management is good, but keep tracking your spending habits.");
    }

    // 2. Loan Management Advice
    if (loan > (annualIncome * 0.5)) {
        addAdvice("<strong>Loan Management:</strong> Your loan is more than 50% of your annual income. Prioritize repayment to reduce financial burden.");
    } else {
        addAdvice("<strong>Loan Management:</strong> Your loan is within a manageable limit. Keep making regular payments.");
    }

    // 3. Goal Setting Based on Age
    if (age < 30) {
        addAdvice("<strong>Future Goals:</strong> Focus on building savings and long-term investments for financial stability.");
    } else if (age < 50) {
        addAdvice("<strong>Future Goals:</strong> Plan for retirement by increasing investments in secure assets.");
    } else {
        addAdvice("<strong>Future Goals:</strong> Ensure you have a stable retirement plan and reduce unnecessary expenses.");
    }

    // 4. Income Advice
    if (annualIncome < 100000) {
        addAdvice("<strong>Increase Income:</strong> Your income is below ₹1,00,000 per year. Consider upskilling or finding alternative income sources.");
    } else {
        addAdvice("<strong>Income Status:</strong> Your income is stable, but continuous growth should be a goal.");
    }

    // 5. Future Expense Prediction
    let predictedExpense = annualExpenses * 1.1; // 10% increase prediction
    addAdvice(`<strong>Future Expense Prediction:</strong> Next year's estimated expenses: ₹${predictedExpense.toFixed(2)}. Plan accordingly.`);

    // 6. Investment Advice
    if (investment < (0.2 * annualIncome)) {
        addAdvice("<strong>Investment Advice:</strong> Your investment is less than 20% of your income. Consider increasing investments for better future security.");
    } else {
        addAdvice("<strong>Investment Advice:</strong> Your investment ratio is good. Maintain a balanced portfolio.");
    }
});