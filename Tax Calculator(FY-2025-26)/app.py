from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Function to calculate tax
def calculate_tax(income, age):
    STANDARD_DEDUCTION = 75000
    ADDITIONAL_EXEMPTION = 300000 if age >= 60 else 0

    # Calculate taxable income
    taxable_income = max(0, income - STANDARD_DEDUCTION - ADDITIONAL_EXEMPTION)

    # Tax slab calculation
    if taxable_income <= 250000:
        tax = 0
    elif taxable_income <= 500000:
        tax = (taxable_income - 250000) * 0.05
    elif taxable_income <= 1000000:
        tax = (250000 * 0.05) + (taxable_income - 500000) * 0.2
    else:
        tax = (250000 * 0.05) + (500000 * 0.2) + (taxable_income - 1000000) * 0.3

    return taxable_income, tax

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()
    income = int(data["income"])
    age = int(data["age"])

    taxable_income, tax = calculate_tax(income, age)

    return jsonify({"taxable_income": taxable_income, "tax": tax})

if __name__ == "__main__":
    app.run(debug=True)