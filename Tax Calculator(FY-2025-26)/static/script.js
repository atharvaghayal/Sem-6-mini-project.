function calculateTax() {
    let income = document.getElementById("income").value;
    let age = document.getElementById("age").value;

    if (!income || !age) {
        alert("Please enter both income and age.");
        return;
    }

    fetch("/calculate", {
        method: "POST",
        body: JSON.stringify({ income: parseInt(income), age: parseInt(age) }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("taxable_income").innerHTML = "Taxable Income: ₹" + data.taxable_income;
        document.getElementById("final_tax").innerHTML = "Final Tax: ₹" + data.tax;
    })
    .catch(error => console.error("Error:", error));
}
