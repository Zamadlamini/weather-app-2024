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
    event.preventDefault(); 

    const city = cityInput.value; 
    await getWeatherData(city); 
    cityInput.value = ''; 
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found'); 
        }

        const data = await response.json();
        
        
        cityName.textContent = data.name; 
        const temp = Math.round(data.main.temp); 
        temperatureElement.textContent = `${getEmoji(temp)} ${temp}`; 
        percentageElement.textContent = `${data.main.humidity}%`; 
        windSpeedElement.textContent = `${data.wind.speed} km/h`; 
        
        
        const timezoneOffset = data.timezone; 
        const localDate = new Date(); 
        const localTime = new Date(localDate.getTime() + timezoneOffset * 1000); 

        const fullDate = formatFullDate(localTime); 
        const time = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        
        timeElement.textContent = `${fullDate} ${localTime.toLocaleDateString('en-GB', { weekday: 'long' })} ${time}`;
        conditionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); 
    } catch (error) {
        alert(error.message); 
    }
}


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


function formatFullDate(date) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}
