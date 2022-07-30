function getTime() {
  let now = new Date();
  let date = now.getDate();
  let min = now.getMinutes();
  let hour = now.getHours();
  min = min >= 10 ? min : "0" + min;
  hour = hour >= 10 ? hour : "0" + hour;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuthday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  let month = months[now.getMonth()];

  let time = document.querySelector(".date");
  time.innerHTML =
    "Today is " + day + ", " + month + " " + date + ", " + hour + ":" + min;
}

getTime();

//Current Temp
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  let todaysTemp = document.querySelector("#temperature");
  todaysTemp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector(".icon");

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Current Location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ee851cd460968da9db5d8d205ea02042";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getPosition);

//Search function
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "ee851cd460968da9db5d8d205ea02042";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove(".active");
  fahrenheitLink.classList.add(".active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add(".active");
  fahrenheitLink.classList.remove(".active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = 1;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
