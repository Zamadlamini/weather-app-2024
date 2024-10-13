const apiKey = '2b4f361c00d470023eb54d2498b1b90d';
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const timeElement = document.getElementById('time');
const conditionElement = document.getElementById('condition');
const temperatureElement = document.getElementById('temperature');
const percentageElement = document.getElementById('percentage');
const windSpeedElement = document.getElementById('wind-speed');

let timezoneOffset; // Variable to hold the timezone offset

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
        
        // Set the timezone offset for the city
        timezoneOffset = data.timezone; // Timezone offset in seconds

        // Update time display
        updateTime();

        // Call the updateTime function every minute
        setInterval(updateTime, 60000); // Update every minute

        // Display condition
        conditionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); // Weather condition

    } catch (error) {
        alert(error.message); // Alert if an error occurs
    }
}

// Function to update the displayed time
function updateTime() {
    const localDate = new Date(); // Get the current UTC date and time
    const localTime = new Date(localDate.getTime() + timezoneOffset * 1000); // Adjust time based on the timezone offset

    const fullDate = formatFullDate(localTime); // Format the date
    const time = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Display the local time and full date
    timeElement.textContent = `${fullDate} ${localTime.toLocaleDateString('en-GB', { weekday: 'long' })} ${time}`;
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

// Function to format date in '13 Nov 2024' format
function formatFullDate(date) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}
