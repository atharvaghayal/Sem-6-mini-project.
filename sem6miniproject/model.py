import numpy as np
from sklearn.neural_network import MLPRegressor

# Sample training data for accuracy prediction
X_train = np.array([[100000, 5, 10], [200000, 7, 5], [500000, 8, 7], [300000, 6, 8]])
y_train = np.array([95, 92, 90, 93])  # Accuracy in percentage

# Train the model
model = MLPRegressor(hidden_layer_sizes=(5, 5), max_iter=1000, random_state=42)
model.fit(X_train, y_train)

def predict_accuracy(investment, rate, period):
    X_test = np.array([[investment, rate, period]])
    accuracy = model.predict(X_test)[0]
    return round(accuracy, 2)