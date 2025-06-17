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
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()  # Load from .env file
api_key = os.getenv("WEATHER_API_KEY")

live_data_bp= Blueprint('live_data', __name__)
 

#DATA NEEDED: 
# {
# drone_type,
# temperature, YES
# wind_speed, YES
# rain, YES
# humidity, YES 
# time_of_day, YES
# mission, 
# payload,
# altitude,
# enemy_contact,
# temp_humidity, YES
# wind_rain YES
#}

@live_data_bp.route("/live_data", methods=['POST'])
def live_weather_data_helper(location,date):

      
        #url = f'http://api.weatherapi.com/v1/current.json?key={api_key}&q={location}&aqi=no'

        location = "Moreno Valley"
        future_weather_data_url = fr"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={location}&days=5&aqi=no&alerts=no"
        response = requests.get(future_weather_data_url)


       
        if response.status_code != 200:
                return {"error": "Failed to fetch data from OpenWeatherMap"}
        else:

                '''
                data = response.json()
                data = data.get("current")
              
                if data.get("precip_in") > 0:
                        rain = 1
                else:
                        rain = 0
                weather_data = {
                        "temperature": data.get("feelslike_f"),
                        "wind_speed": data.get("wind_mph"),
                        "rain": rain,
                        "humidity": data.get("humidity"),
                        "time_of_day": datetime.now().hour ,
                        "temp_humidity": round(data.get("feelslike_f") * data.get("humidity"), 2),
                        "wind_rain": round(data.get("wind_mph") * rain, 2), 
           
                      

                }
                '''

                data = response.json()
                data = data.get("forecast")
                data = data.get("forecastday")

                target_date = date

                for date in data:
                        if date['date'] == target_date:
                                specific_forecast = date
                                break  # Stop searching once found
                

                               
                                
                specific_forecast = specific_forecast.get("hour")
                
                
           
                
                
        return specific_forecast



