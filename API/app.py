from flask import Flask


from Model_Prediction_Routes.prediction_routes import prediction_bp
from Weather_helper_functions.weather_helper_functions import live_data_bp

app = Flask(__name__)


app.register_blueprint(prediction_bp)
app.register_blueprint(live_data_bp)

@app.route("/")
def home():
    return "Welcome"
    

if __name__ == '__main__':
    app.run(debug=True)