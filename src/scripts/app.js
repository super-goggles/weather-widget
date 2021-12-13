let lat;
let lon;

const currentConditions = document.getElementById("current-conditions");
const weeksForecast = document.getElementById("forecast");

const currentWeather = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b4e0b0a6c8793504deea892cdf71dab4`
  ).then((response) => response.json());
};

const weatherForecast = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=b4e0b0a6c8793504deea892cdf71dab4`
  ).then((response) => response.json());
};

if (!navigator.geolocation) {
  console.log("Geolocation is not supported by your browser");
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    currentWeather(lat, lon).then((weather) => {
      currentConditions.insertAdjacentHTML(
        "beforeend",
        `<h2>Current Conditions</h2>
        <img src="http://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }@2x.png" />
        <div class="current">
          <div class="temp">${weather.main.temp.toFixed(0)}</div>
          <div class="condition">${weather.weather[0].description}</div>
        </div>`
      );
    });

    weatherForecast(lat, lon).then((forecast) => {
      let fullForecastList = forecast.list;

      while (fullForecastList.length) {
        let dailyForecastList = fullForecastList.splice(0, 8);

        let forecastDate = new Date(dailyForecastList[0].dt_txt);
        let forecastDay = forecastDate.toLocaleDateString('en-CA', {
          weekday: 'long'
        });

        let dailyForcastDescription =
          dailyForecastList[0].weather[0].description;

        let dailyForecastIcon = dailyForecastList[0].weather[0].icon;

        let maximumHourlyTemperature = [
          dailyForecastList[0].main.temp_max,
          dailyForecastList[1].main.temp_max,
          dailyForecastList[2].main.temp_max,
          dailyForecastList[3].main.temp_max,
          dailyForecastList[4].main.temp_max,
          dailyForecastList[5].main.temp_max,
          dailyForecastList[6].main.temp_max,
          dailyForecastList[7].main.temp_max,
        ];

        let maximumDailyTemperature = Math.max(...maximumHourlyTemperature);

        let minimumHourlyTemperature = [
          dailyForecastList[0].main.temp_min,
          dailyForecastList[1].main.temp_min,
          dailyForecastList[2].main.temp_min,
          dailyForecastList[3].main.temp_min,
          dailyForecastList[4].main.temp_min,
          dailyForecastList[5].main.temp_min,
          dailyForecastList[6].main.temp_min,
          dailyForecastList[7].main.temp_min,
        ];

        let minimumDailyTemperature = Math.min(...minimumHourlyTemperature);

        weeksForecast.insertAdjacentHTML(
          "beforeend",
          `<div class="day">
            <h3>${forecastDay}</h3>
            <img src="http://openweathermap.org/img/wn/${dailyForecastIcon}@2x.png" />
            <div class="description">${dailyForcastDescription}</div>
            <div class="temp">
              <span class="high">${maximumDailyTemperature.toFixed(
                0
              )}</span>/<span class="low">${minimumDailyTemperature.toFixed(
            0
          )}</span>
            </div>
          </div>`
        );
      }
    });
  });
}
