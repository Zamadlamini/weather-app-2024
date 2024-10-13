const apiKey = '2b4f361c00d470023eb54d2498b1b90d';
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const timeElement = document.getElementById('time');
const conditionElement = document.getElementById('condition');
const temperatureElement = document.getElementById('temperature');
const percentageElement = document.getElementById('percentage');
const windSpeedElement = document.getElementById('wind-speed');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const city = cityInput.value; // Get the value from the input
    await getWeatherData(city); // Fetch and display weather data
    cityInput.value = ''; // Clear the input field after search
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found'); // Handle errors if the city is not found
        }

        const data = await response.json();
        // Update the HTML elements with fetched data
        cityName.textContent = data.name; // City name
        const temp = Math.round(data.main.temp); // Temperature
        temperatureElement.textContent = `${getEmoji(temp)} ${temp}`; // Emoji + Temperature
        percentageElement.textContent = `${data.main.humidity}%`; // Humidity
        windSpeedElement.textContent = `${data.wind.speed} km/h`; // Wind speed
        
        // Get current time and condition
        const date = new Date();
        const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
        timeElement.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], options)}`;
        conditionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); // Weather condition

    } catch (error) {
        alert(error.message); // Alert if an error occurs
    }
}

// Function to determine emoji based on temperature
function getEmoji(temp) {
    if (temp < 0) {
        return '❄️'; // Snowflake for temperatures below 0°C
    } else if (temp < 10) {
        return '🌬️'; // Wind for temperatures below 10°C
    } else if (temp < 20) {
        return '🌤️'; // Sun with a cloud for temperatures below 20°C
    } else if (temp < 30) {
        return '☀️'; // Sun for temperatures below 30°C
    } else {
        return '🔥'; // Fire for temperatures 30°C and above
    }
}
