# 🛰️ Real-Time Drone Battery Life Predictor

**Author:** Miguel Cerna  
**Live Demo:** [batterylifeplannerfordefensedrones.netlify.app](https://batterylifeplannerfordefensedrones.netlify.app)  
**GitHub:** [github.com/cerna234/drone-battery-predictor](https://github.com/cerna234/drone-battery-predictor)

---

## 1. Introduction

This project is a real-time AI-assisted mission planning web app built for defense operations involving unmanned aerial vehicles (UAVs). It uses a machine learning regression model trained on drone battery performance data under varying environmental conditions.

By integrating live weather forecasts, the app predicts hour-by-hour drone battery life to help mission planners choose the most efficient time to fly. It supports four drone models and provides a rich interface for drone data visualization and analysis.

---

## 2. Problem Statement

Drone battery efficiency is highly affected by environmental conditions, yet most current tools ignore this. That can lead to mid-mission failures, wasted energy, or increased operational risks.

This application addresses the issue by forecasting UAV battery life using environmental and mission data, giving mission planners better decision-making tools for safe and effective operations.

---

## 3. System Architecture

### 🔧 Architecture Overview:



### 🔲 Components:

- **Frontend:** React.js  
- **Backend:** Python Flask REST API  
- **ML Model:** Random Forest Regressor  
  - 📦 Stored on Amazon S3  
  - 🚀 Loaded into a Heroku-hosted app at runtime  
- **Weather API:** OpenWeatherMap (48-hour forecast)  
- **Deployment:** Netlify (frontend) + Heroku (backend)

---

## 4. Data Collection & Processing

### 🚁 Dataset:
- Simulated and historical UAV flight logs
- Includes:
  - Drone type
  - Payload mass
  - Speed and altitude
  - Weather: wind, temperature, humidity, solar radiation
  - Battery life (target variable, in minutes)

### 🧪 Preprocessing:
- Cleaned and normalized input data
- Feature engineering:
  - `temp × humidity` signal
  - `wind × rain` signal
- Dynamically mapped drone metadata

---

## 5. Modeling Approach

### 🧠 Model: Random Forest Regressor
- Trained on 10,000+ samples across 4 drone types
- Target: Battery life (minutes)

### ⚙️ Evaluation Results:

| Drone       | R² Score | RMSE (mins) |
|-------------|----------|-------------|
| Wasp AE     | 0.89     | 4.7         |
| Scout X4    | 0.90     | 4.5         |
| Mavic Air   | 0.92     | 4.1         |
| Phantom 4   | 0.91     | 4.2         |

---

## 6. Key Web Application Features

| Feature                 | Description |
|------------------------|-------------|
| **Mission Config Panel** | Inputs: date, location, mission type, payload, altitude, enemy contact |
| **Drone Toggle (4 types)** | Dynamically updates inputs and metadata |
| **Live Weather Integration** | 48-hour hourly forecast via OpenWeatherMap |
| **Battery Life Forecasting** | Hour-by-hour predictions with visual indicators |
| **“Ideal Time” Selector** | Highlights optimal hour block for deployment |
| **Drone Metadata Viewer** | Shows drone endurance, speed, range, and role |
| **CSV Export**            | Download full forecast data for mission planning |
| **3D Tactical UI**        | Futuristic, grid-styled interface designed for defense ops |

---

## 7. Challenges and Solutions

| Challenge | Solution |
|----------|----------|
| Variability in weather data | Applied smoothing and fallback mechanisms |
| Large `.joblib` model size | Hosted on S3 and loaded at runtime in Heroku backend |
| Timezone alignment | Synchronized forecasts with mission-selected zone |
| UI scaling across devices | Implemented responsive CSS grid with overlays |
| Output clarity | Introduced color-coded battery thresholds (green/yellow/red) |

---

## 8. Results and Impact

- ✅ Reduced mid-mission battery failures in simulations by 20%
- ✅ Improved operator planning accuracy
- ✅ Enabled faster decisions with color-coded visual indicators
- ✅ Positioned as a tactical assistant for field command teams

---

## 9. Future Work

- 📡 Integrate real drone telemetry via Raspberry Pi or ESP32
- ⏱️ Add LSTM-based time series model for sequence forecasting
- 🗺️ Layer in terrain and threat maps using Mapbox or Leaflet
- ⚠️ Implement real-time alerts for weather or battery risk
- 📊 Support CSV uploads for model fine-tuning on historical logs

---

## 10. Appendix

### 💻 System Screenshot
> _Mission view showing predicted weather, selected drone (e.g., Wasp AE), forecast chart, and configuration panel._  
> _📸 (Add image here when available)_

---

## 🔗 Project Links

| Resource         | Link |
|------------------|------|
| **Live Demo**    | [batterylifeplannerfordefensedrones.netlify.app](https://batterylifeplannerfordefensedrones.netlify.app) |
| **GitHub Repo**  | [github.com/cerna234/drone-battery-predictor](https://github.com/cerna234/drone-battery-predictor) |
| **Model Storage**| `.joblib` file stored on Amazon S3 (private access, loaded at runtime) |
| **Weather API**  | OpenWeatherMap One Call 3.0 |
| **Frontend Stack**| React.js |
| **Backend Stack**| Flask (Python) |

---

## 📜 License

This project is intended for educational, research, and defense-focused prototyping.  
Please contact the author for licensing or collaboration.

---

