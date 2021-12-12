//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

let lat;
let lon;

const currentConditions = document.getElementById("current-conditions");

const currentWeather = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b4e0b0a6c8793504deea892cdf71dab4`
  ).then((response) => response.json());
};

if (!navigator.geolocation) {
  console.log("Geolocation is not supported by your browser");
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon);
    currentWeather(lat, lon).then(
      (weather) => {
        currentConditions.insertAdjacentHTML(
          "beforeend",
          `<h2>Current Conditions</h2>
        <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" />
        <div class="current">
          <div class="temp">${weather.main.temp}</div>
          <div class="condition">${weather.weather[0].description}</div>
        </div>`
        );
      }
      //console.log(weather)
    );
  });
}
