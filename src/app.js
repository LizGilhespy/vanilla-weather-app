function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hours >= 12) {
    var timeOfDay = "pm";
  } else {
    var timeOfDay = "am";
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}${timeOfDay}`;
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
   
              <div class="col-2">
                <div class="weather-date">${formatDays(forecastDay.dt)}</div> 
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="40"/>
                <div class="weather-temp">
                  <span class="weather-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}° </span> <span class="weather-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span></div> 
              </div>
            
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "be60748992fab0f5da8162563fb21245";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsius = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsius);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let currentConditions = document.querySelector("#current-weather-condition");
  currentConditions.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "be60748992fab0f5da8162563fb21245";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function convertFahrenheitTemp(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let fahrenheitTemperature = (celsius * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsius);
}

function pageData(response) {
  let currentCity = document.querySelector("#city");
  let city = response.data.name;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  let temperature = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind-speed");
  let windspeed = Math.round(response.data.wind.speed);
  let currentConditions = document.querySelector("#current-weather-condition");
  currentConditions.innerHTML = response.data.weather[0].description;
  currentCity.innerHTML = `${city}`;
  humidity.innerHTML = `${currentHumidity}`;
  temperature.innerHTML = `${currentTemperature}`;
  wind.innerHTML = `${windspeed}`;
  getForecast(response.data.coord);
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "be60748992fab0f5da8162563fb21245";

  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${geoUrl}`).then(pageData);
}

function showCity(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${response.data[0].name}`;
}

function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let currentButton = document.querySelector("#my-location");
currentButton.addEventListener("click", buttonClick);

let celsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", convertFahrenheitTemp);

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", convertCelsiusTemp);

search("London");
