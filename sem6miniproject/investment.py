from flask import Flask, render_template, request
import numpy as np
from model import predict_accuracy  # Import deep learning model

app = Flask(__name__)

# Tax Calculation Function
def calculate_tax(investment_type, returns):
    tax_rates = {
        "Stocks": 10,
        "Mutual Funds": 15,
        "FD": 20,
        "Real Estate": 30,
        "Gold": 25
    }
    tax_rate = tax_rates.get(investment_type, 10)
    tax = (tax_rate / 100) * returns
    return round(tax, 2)

# Investment Calculation Function
def calculate_investment(investment, rate, period):
    expected_return = investment * ((1 + (rate / 100)) ** period)
    profit_loss = ((expected_return - investment) / investment) * 100
    return round(expected_return, 2), round(profit_loss, 2)

@app.route("/", methods=["GET"])
def index():
    return render_template("investment.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    name = request.form["name"]
    age = int(request.form["age"])
    investment = float(request.form["investment"])
    rate = float(request.form["rate"])
    period = int(request.form["period"])
    investment_type = request.form["investment_type"]

    # Perform Calculations
    expected_return, profit_loss = calculate_investment(investment, rate, period)
    tax_payable = calculate_tax(investment_type, expected_return)
    
    # Predict Accuracy using Deep Learning
    accuracy = predict_accuracy(investment, rate, period)

    return render_template("investment.html", 
                           result=True, name=name, 
                           expected_return=expected_return, 
                           profit_loss=profit_loss, 
                           tax_payable=tax_payable, 
                           accuracy=accuracy)

if __name__ == "__main__":
    app.run(debug=True)