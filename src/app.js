function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let currentConditions = document.querySelector("#current-weather-condition");
  currentConditions.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "be60748992fab0f5da8162563fb21245";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
