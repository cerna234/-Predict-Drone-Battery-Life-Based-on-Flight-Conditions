import pandas as pd
import random

# Drone specifications
DRONES = {
    "MQ-9 Reaper": {
        "base_life": 2400,
        "max_payload": 1700,
        "wind_sensitivity": 1.4,
        "rain_penalty": 10,
        "payload_factor": 0.5
    },
    "RQ-4 Global Hawk": {
        "base_life": 3600,
        "max_payload": 1360,
        "wind_sensitivity": 1.3,
        "rain_penalty": 8,
        "payload_factor": 0.6
    },
    "ScanEagle": {
        "base_life": 900,
        "max_payload": 3.0,
        "wind_sensitivity": 1.7,
        "rain_penalty": 12,
        "payload_factor": 10
    },
    "Wasp AE": {
        "base_life": 60,
        "max_payload": 0.1,
        "wind_sensitivity": 2.2,
        "rain_penalty": 18,
        "payload_factor": 120
    }
    }



def simulate_flight(drone_type):
    specs = DRONES[drone_type]

    temp = random.uniform(-10, 70)         # °C
    wind = random.uniform(0, 20)           # m/s
    rain = random.choice([0, 1])
    humidity = random.uniform(10, 100)     # %
    time = random.randint(0, 23)           # hour of day
    mission = random.choice(['surveillance', 'strike', 'recon'])
    payload = round(random.uniform(0, specs["max_payload"]), 3)
    enemy_contact = random.choice([0, 1])
    altitude = round(random.uniform(100, 1500), 0)  # limit altitude for all drones

    # Temperature penalty: harsher when colder than 20°C
    if temp < 20:
        temp_penalty = (20 - temp) * 0.5
    else:
        temp_penalty = (temp - 20) * 0.2
    
    # Wind penalty: quadratic with drone-specific sensitivity
    wind_penalty = (wind ** 3) * 0.03 * specs["wind_sensitivity"]

    rain_penalty = specs["rain_penalty"] if rain else 0
    humidity_penalty = humidity * 0.05
    payload_penalty = payload * specs["payload_factor"]
    night_penalty = 5 if time < 6 or time > 20 else 0
    enemy_penalty = 5 if enemy_contact else 0

    total_penalty = (
        temp_penalty +
        wind_penalty +
        rain_penalty +
        humidity_penalty +
        payload_penalty +
        night_penalty +
        enemy_penalty
    )

    life = specs["base_life"] - total_penalty + random.uniform(-2, 2)
    life = max(life, 1)

    return {
        "drone_type": drone_type,
        "temperature": round(temp, 2),
        "wind_speed": round(wind, 2),
        "rain": rain,
        "humidity": round(humidity, 2),
        "time_of_day": time,
        "mission": mission,
        "payload": payload,
        "altitude": altitude,
        "enemy_contact": enemy_contact,
        "temp_humidity": round(temp * humidity, 2),
        "base_life": specs["base_life"],    
        "wind_rain": round(wind * rain, 2),
        "flight_duration_pct": round((life / specs["base_life"]) * 100, 2),
     
    }

def simulate_dataset(n):
    data = []
    drone_types = list(DRONES.keys())
    for _ in range(n):
        drone = random.choice(drone_types)
        sample = simulate_flight(drone)
        data.append(sample)
    return pd.DataFrame(data)

# Simulate and save
df = simulate_dataset(50000)
df.to_csv("simulated_military_drones.csv", index=False)
print(df.head())
