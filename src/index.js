const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const cityName = document.querySelector("#city-name");
const time = document.querySelector("#time");
const condition = document.querySelector("#condition");
const temperature = document.querySelector("#temperature");

const apiKey = "2b4f361c00d470023eb54d2498b1b90d"; //
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function fetchWeather(city) {
    let url = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then((response) => {
        updateWeatherInfo(response.data);
    }).catch(() => {
        alert("City not found. Please try again.");
    });
}

function updateWeatherInfo(data) {
    cityName.innerHTML = data.name;
    let date = new Date();
    time.innerHTML = `${date.toLocaleDateString('en-US', { weekday: 'long' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ${data.weather[0].description}`;
    condition.innerHTML = `Humidity: ${data.main.humidity}%, Wind: ${Math.round(data.wind.speed)} km/h`;
    temperature.innerHTML = `🌥️ ${Math.round(data.main.temp)}°C`;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let city = cityInput.value;
    fetchWeather(city);
});
