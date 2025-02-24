document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let annualInterestRate = parseFloat(document.getElementById("interestRate").value);
    let loanTenure = parseInt(document.getElementById("loanTenure").value);

    if (loanAmount <= 0 || annualInterestRate <= 0 || loanTenure <= 0) {
        alert("Please enter valid positive values.");
        return;
    }

    let monthlyInterestRate = (annualInterestRate / 100) / 12;
    let emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenure)) / 
              (Math.pow(1 + monthlyInterestRate, loanTenure) - 1);

    let totalPayment = emi * loanTenure;
    let totalInterest = totalPayment - loanAmount;

    document.getElementById("emiAmount").textContent = emi.toFixed(2);
    document.getElementById("totalInterest").textContent = totalInterest.toFixed(2);
    document.getElementById("totalPayment").textContent = totalPayment.toFixed(2);
});