function updateWeatherData(response){
let updateTemperature=document.querySelector("#update-temperature");
let temperature = response.data.temperature.current;
let cityElement=document.querySelector("#weather-city");
let descriptionElement=document.querySelector("#weather-current-condition");
let feelsLike=document.querySelector("#feels-like");
let windSpeed=document.querySelector("#wind-speed");
let humidity=document.querySelector("#humidity");
let timeStamp=document.querySelector("#current-time");
let date = new Date(response.data.time *1000);
let iconElement = document.querySelector("#icon");

cityElement.innerHTML=response.data.city
timeStamp.innerHTML= formatTimeStamp(date);
descriptionElement.innerHTML = response.data.condition.description;
updateTemperature.innerHTML = Math.round(temperature);
feelsLike.innerHTML=Math.round(response.data.temperature.feels_like);
windSpeed.innerHTML=Math.round(response.data.wind.speed);
humidity.innerHTML=response.data.temperature.humidity;
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

getForecast(response.data.city);
}

function formatTimeStamp(date){
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey="9f6b8bcf34c1t0b4fa7o41dfc57380a8"
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric
`
axios.get(apiUrl).then(updateWeatherData);
}

function handleSearchSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp){
let date = new Date(timestamp *1000);
let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

return days[date.getDay()];
}

function getForecast(city){
  let apiKey="9f6b8bcf34c1t0b4fa7o41dfc57380a8"
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response){
  let forecastHtml="";

  response.data.daily.forEach(function(day, index){
    if (index < 5 ){
    forecastHtml=
    forecastHtml+
    `
    <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}"class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
          </div>
        </div>
        `;
    }
  });

  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=forecastHtml;
}
 
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("glasgow");