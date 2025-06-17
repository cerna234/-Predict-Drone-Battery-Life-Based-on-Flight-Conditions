from joblib import load

# Load your saved model or pipeline
model = load(fr'C:\Users\Miguel Cerna\OneDrive\Desktop\-Predict-Drone-Battery-Life-Based-on-Flight-Conditions\RegressorV1\drone-battery-life-regression-pipeline.joblib')  # 



# Sample input
#drone_type,temperature,wind_speed,rain,humidity,time_of_day,mission,payload,altitude,enemy_contact,temp_humidity,wind_rain
sample_input = [['RQ-11 Raven',40,3,0,37.4,8,'surveillance',0.3,3,0,0,3]] 

# Predict
predicted_value = model.predict(sample_input)

print(f"Predicted Value: {predicted_value[0]}")