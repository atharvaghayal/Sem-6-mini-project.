from flask import Flask, render_template, request, jsonify
import matplotlib.pyplot as plt
import numpy as np
import os

app = Flask(__name__)

# Ensure static directory for images
if not os.path.exists("static"): 
    os.makedirs("static")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_graphs', methods=['POST'])
def generate_graphs():
    data = request.json
    age = data['age']
    email = data['email']
    income = float(data['income'])
    expense = float(data['expense'])
    investment = float(data['investment'])
    loan = float(data['loan'])
    month = data['month']
    
    savings = income - expense

    # Line Graph - Income, Expense, Savings
    months = [month]
    values = {
        'Income': [income],
        'Expense': [expense],
        'Savings': [savings]
    }
    plt.figure(figsize=(12, 7))
    for label, val in values.items():
        plt.plot(months, val, marker='o', label=label)
    plt.legend()
    plt.title("Income vs Expense vs Savings")
    plt.savefig("static/line_graph.png")

    # Joint Bar Graph - Investment, Loan, Expense
    categories = ['Investment', 'Loan', 'Expense']
    values = [investment, loan, expense]
    
    plt.figure(figsize=(12, 7))
    plt.bar(categories, values, color=['green', 'red', 'blue'])
    plt.title("Investment, Loan, Expense Comparison")
    plt.savefig("static/bar_graph.png")

    # Pie Chart - Income Distribution
    labels = ['Income', 'Loan', 'Investment', 'Savings', 'Expenses']
    sizes = [income, loan, investment, savings, expense]
    colors = ['gold', 'red', 'green', 'blue', 'orange']
    
    plt.figure(figsize=(10, 10))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', colors=colors)
    plt.title("Income Distribution")
    plt.savefig("static/pie_chart.png")
    
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)