
function updateWeatherData(response){
let updateTemperature=document.querySelector("#update-temperature")
 let cityElement=document.querySelector("#weather-city");
  
cityElement.innerHTML=response.data.city
updateTemperature.innerHTML = Math.round(response.data.temperature.current)

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

searchCity("glasgow")