import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import matplotlib.pyplot as plt

# Load dataset
dataset = pd.read_csv(fr'C:\Users\Miguel Cerna\OneDrive\Desktop\-Predict-Drone-Battery-Life-Based-on-Flight-Conditions\Simulator\simulated_military_drones.csv')

# Define feature indexes
categorical_features = [0, 6]   # e.g., 'drone_type', 'mission'
numeric_features = [1, 2, 4, 7, 8, 10, 11]  # e.g., temp, wind, etc.

# Split features and target
X = dataset.iloc[:, :-1]  # All columns except last
y = dataset.iloc[:, -1]   # Last column

# Define preprocessor
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
])

# Build pipeline with preprocessor + model
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train pipeline
pipeline.fit(X_train, y_train)

# Predict and evaluate
y_pred = pipeline.predict(X_test)

# Save full pipeline (not just model)
joblib.dump(pipeline, "drone-battery-life-regression-pipeline.joblib")

plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.3, color="purple")
plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], 'r--', label="Perfect Prediction")
plt.xlabel("Actual Flight Duration (minutes)")
plt.ylabel("Predicted Flight Duration (minutes)")
plt.title("Actual vs Predicted Flight Duration")
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()