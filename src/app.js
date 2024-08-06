
function updateWeatherData(response){
let updateTemperature=document.querySelector("#update-temperature")
 let cityElement=document.querySelector("#weather-city");
 let descriptionElement=document.querySelector("#weather-current-condition");
 let feelsLike=document.querySelector("#feels-like");
 let windSpeed=document.querySelector("#wind-speed");
 let humidity=document.querySelector("#humidity");

cityElement.innerHTML=response.data.city
descriptionElement.innerHTML = response.data.condition.description
updateTemperature.innerHTML = Math.round(response.data.temperature.current)
feelsLike.innerHTML=Math.round(response.data.temperature.feels_like)
windSpeed.innerHTML=Math.round(response.data.wind.speed)
humidity.innerHTML=response.data.temperature.humidity
}


function searchCity(city){
let apiKey="9f6b8bcf34c1t0b4fa7o41dfc57380a8"
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric
`
axios.get(apiUrl).then(updateWeatherData);
}


function handleSearchSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input")
  searchCity(searchInput.value);
;}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatTimeStamp(time){
  
let hours = time.getHours();
let minutes = time.getMinutes();
if (minutes <10) {
    minutes = `0${minutes}`;
  }
if (hours <10) {
    hours  = `0${hours}`;
  }
return ` ${hours}:${minutes}`

}
let currentTime= new Date();
let timeStamp=document.querySelector("#current-time")
timeStamp.innerHTML= formatTimeStamp(currentTime);
  
  searchCity("glasgow")