from flask import Flask, render_template, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate_report", methods=["POST"])
def generate_report():
    data = request.get_json()
    salary = data["salaryData"]
    expenses = data["expenseData"]
    months = data["monthLabels"]

    df = pd.DataFrame({"Month": months, "Salary (₹)": salary, "Expenses (₹)": expenses})
    filename = "reports/Expense_Report.xlsx"

    if not os.path.exists("reports"):
        os.makedirs("reports")

    df.to_excel(filename, index=False)

    return jsonify({"filename": filename})

if __name__ == "__main__":
    app.run(debug=True)