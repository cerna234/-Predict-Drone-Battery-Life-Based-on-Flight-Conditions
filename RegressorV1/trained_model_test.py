from joblib import load

# Load your saved model or pipeline
model = load(fr'C:\Users\Miguel Cerna\OneDrive\Desktop\-Predict-Drone-Battery-Life-Based-on-Flight-Conditions\RegressorV1\drone-battery-life-regression-pipeline.joblib')  # 


base_life = 60
# Sample input
sample_input = [
    [
        "Wasp AE",     # drone_type
        100,         # temperature (°C)
        1,        # wind_speed (m/s)
        0,            # rain (0=no, 1=yes)
        30.77,        # humidity (%)
        0,            # time_of_day (hour)
        "strike",     # mission
        0.071,        # payload (units)
        1103.0,       # altitude (m)
        1,            # enemy_contact (0=no, 1=yes)
        189.73,       # temp_humidity (temp * humidity)
        base_life,           # base_life (minutes)
        0.0           # wind_rain (wind * rain)
    ]
]

# Predict
predicted_value = model.predict(sample_input)

print(f"Predicted Value: {(predicted_value[0] /100 ) * base_life}")