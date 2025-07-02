# Model_Prediction_Routes/prediction_routes.py
from flask import Blueprint, request, jsonify
from Weather_helper_functions.weather_helper_functions import live_weather_data_helper
import boto3
import joblib
import os
import tempfile

prediction_bp = Blueprint('prediction_data', __name__)

def load_model_from_s3(bucket_name, object_key):
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    local_path = os.path.join(tempfile.gettempdir(), object_key.split('/')[-1])
    s3.download_file(bucket_name, object_key, local_path)
    return joblib.load(local_path)

# Lazy load model variable
model = None

def get_model():
    global model
    if model is None:
        model = load_model_from_s3("drone-predictor-model", "drone-battery-life-regression-pipeline.joblib")
    return model

@prediction_bp.route("/live_data_prediction", methods=['POST'])
def live_prediction_data():
    input_data = request.get_json()

    drone_type = input_data.get("drone_type")
    mission = input_data.get("mission")
    payload = input_data.get("payload")
    altitude = input_data.get("altitude")
    enemy_contact = input_data.get("enemy_contact")
    location = input_data.get("Location")
    date = input_data.get("date")
    base_life = input_data.get("base_life")

    weather_Data = live_weather_data_helper(location, date)

    predicted_data = []
    for hour in weather_Data:
        time = hour.get("time")
        rain = 1 if hour.get("precip_in") > 0 else 0
        time_of_day = int(hour.get("time").split(" ")[1].split(":")[0])
        temp_humidity = round(hour.get("feelslike_f") * hour.get("humidity"), 2)
        wind_rain = round(hour.get("wind_mph") * rain, 2)

        prediction_data = [[
            drone_type,
            hour.get("temp_f"),
            hour.get("wind_mph"),
            rain,
            hour.get("humidity"),
            time_of_day,
            mission,
            payload,
            altitude,
            enemy_contact,
            temp_humidity,
            base_life,
            wind_rain
        ]]

        model_instance = get_model()
        prediction = model_instance.predict(prediction_data)

        formatted_predicted_data = {
            "model_battery_life_length_prediction": round(float(prediction[0]), 2),
            "Hour_information": {
                "time": time,
                "is_day": hour.get("is_day")
            },
            "missionData": {
                "drone_type": drone_type,
                "temperature": hour.get("temp_f"),
                "wind_speed": hour.get("wind_mph"),
                "rain": rain,
                "humidity": hour.get("humidity"),
                "time_of_day": time_of_day,
                "mission": mission,
                "payload": payload,
                "altitude": altitude,
                "enemy_contact": enemy_contact,
                "temp_humidity": temp_humidity,
                "base_life": base_life,
                "wind_rain": wind_rain
            }
        }
        predicted_data.append(formatted_predicted_data)

    return jsonify(predicted_data)
