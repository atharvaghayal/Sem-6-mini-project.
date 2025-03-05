function calculateTax() {
    let income = parseFloat(document.getElementById("income").value);
    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }

    const standardDeduction = 75000;
    let taxableIncome = income - standardDeduction;
    
    document.getElementById("taxableIncome").textContent = taxableIncome.toLocaleString();

    let tax = computeStandardTax(taxableIncome);

    // Apply special rules
    if (taxableIncome <= 1200000) {
        tax = 0;
    } else if (taxableIncome <= 1275000) {
        tax = taxableIncome - 1200000;
    } else if (taxableIncome >= 10000000 && taxableIncome <= 14999999) {
        tax += 0.10 * tax;
    } else if (taxableIncome >= 15000000 && taxableIncome <= 19999999) {
        tax += 0.15 * tax;
    } else if (taxableIncome >= 20000000) {
        tax += 0.20 * tax;
    }

    // Apply 4% cess
    let finalTax = tax + 0.04 * tax;

    document.getElementById("calculatedTax").textContent = tax.toLocaleString();
    document.getElementById("finalTax").textContent = finalTax.toLocaleString();
}

// Function to apply standard tax slabs
function computeStandardTax(taxableIncome) {
    let tax = 0;

    if (taxableIncome > 1500000) {
        tax += (taxableIncome - 1500000) * 0.30;
        taxableIncome = 1500000;
    }
    if (taxableIncome > 1200000) {
        tax += (taxableIncome - 1200000) * 0.20;
        taxableIncome = 1200000;
    }
    if (taxableIncome > 900000) {
        tax += (taxableIncome - 900000) * 0.15;
        taxableIncome = 900000;
    }
    if (taxableIncome > 600000) {
        tax += (taxableIncome - 600000) * 0.10;
        taxableIncome = 600000;
    }
    if (taxableIncome > 300000) {
        tax += (taxableIncome - 300000) * 0.05;
    }

    return tax;
}