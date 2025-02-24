from flask import Flask, render_template, request, jsonify
import matplotlib.pyplot as plt
import pandas as pd
import os
import base64
from io import BytesIO

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate_charts", methods=["POST"])
def generate_charts():
    data = request.get_json()
    
    age = data["age"]
    email = data["email"]
    income = list(map(float, data["income"]))
    expenses = list(map(float, data["expenses"]))
    loan_amount = float(data["loan"])
    investment = float(data["investment"])

    # Calculate Savings
    savings = [income[i] - expenses[i] for i in range(12)]
    
    # Calculate Average Monthly Expense
    avg_expense = sum(expenses) / 12

    # Generate Pie Chart
    total_income = sum(income)
    total_expenses = sum(expenses)
    total_savings = sum(savings)

    labels = ["Total Income", "Total Expenses", "Loan Amount", "Investment", "Savings"]
    values = [total_income, total_expenses, loan_amount, investment, total_savings]
    colors = ["#28a745", "#dc3545", "#ffc107", "#007bff", "#6c757d"]

    plt.figure(figsize=(8, 8))
    plt.pie(values, labels=labels, autopct="%1.1f%%", colors=colors, startangle=140)
    plt.title("Financial Breakdown")
    
    pie_buffer = BytesIO()
    plt.savefig(pie_buffer, format="png")
    pie_buffer.seek(0)
    pie_chart_data = base64.b64encode(pie_buffer.read()).decode("utf-8")
    plt.close()

    # Generate Line Graph
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    plt.figure(figsize=(10, 5))

    plt.plot(months, income, marker="o", label="Income", color="green")
    plt.plot(months, expenses, marker="s", label="Expenses", color="red")
    plt.plot(months, [investment]*12, marker="^", label="Investment", color="blue")
    plt.plot(months, savings, marker="d", label="Savings", color="black")

    plt.xlabel("Months")
    plt.ylabel("Amount (₹)")
    plt.title("Financial Overview")
    plt.legend()
    plt.grid(True)

    line_buffer = BytesIO()
    plt.savefig(line_buffer, format="png")
    line_buffer.seek(0)
    line_chart_data = base64.b64encode(line_buffer.read()).decode("utf-8")
    plt.close()

    return jsonify({
        "pie_chart": pie_chart_data,
        "line_chart": line_chart_data,
        "avg_expense": avg_expense
    })

if __name__ == "__main__":
    app.run(debug=True)