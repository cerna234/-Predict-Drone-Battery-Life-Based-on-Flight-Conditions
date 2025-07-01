#live_data/routes.py
from flask import Blueprint, request, jsonify
from flask import abort
from datetime import datetime
import csv
import json
from joblib import load
import requests
import pandas as pd
import io
from Weather_helper_functions.weather_helper_functions import live_weather_data_helper
import numpy as np

prediction_bp = Blueprint('prediction_data', __name__)
 

#DATA NEEDED: 
# {
# drone_type,
# temperature,
# wind_speed,
# rain,
# humidity,
# time_of_day,
# mission,
# payload,
# altitude,
# enemy_contact,
# temp_humidity,
# wind_rain
#}


model = load(fr"C:\Users\Miguel Cerna\OneDrive\Desktop\-Predict-Drone-Battery-Life-Based-on-Flight-Conditions\RegressorV1\drone-battery-life-regression-pipeline.joblib")

#Route will have live data with minimal input from user
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

        

        weather_Data = live_weather_data_helper(location,date)

        print(weather_Data)

        predicted_data = []
        for hour in weather_Data:

                time = hour.get("time")
                if hour.get("precip_in") > 0:
                        rain = 1
                else:
                        rain = 0
                time_of_day = int(hour.get("time").split(" ")[1].split(":")[0])
                temp_humidity = round(hour.get("feelslike_f") * hour.get("humidity"), 2)
                wind_rain = round(hour.get("wind_mph") * rain, 2)


                prediction_data = [[
                drone_type,
                hour.get("temp_f"),
                hour.get("wind_mph"),
                rain, #rain
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

        

                prediction = model.predict(prediction_data)
                fromatted_predicted_data = {
                        "model_battery_life_length_prediction":  round(float(prediction[0]),2),
                        "Hour_information": {
                                "time": time,
                                "is_day": hour.get("is_day")
                        },

                        "missionData": {
                                "drone_type": drone_type,
                                "temperature": hour.get("temp_f"),
                                "wind_speed":hour.get("wind_mph"),
                                "rain": rain,
                                "humidity": hour.get("humidity"),
                                "time_of_day":time_of_day,
                                "mission": mission,
                                "payload": payload,
                                "altitude": altitude,
                                "enemy_contact": enemy_contact,
                                "temp_humidity": temp_humidity,
                                "base_life": base_life,
                                "wind_rain" : wind_rain
                        }
                        
                }
                predicted_data.append(fromatted_predicted_data)
                
                
 
      
   
        
        
        return jsonify(predicted_data)


