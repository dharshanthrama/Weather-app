const userLocation = document.getElementById("userLocation"),
    converter = document.getElementById("converter"),
    weatherIcon = document.querySelector(".weatherIcon"),
    temperature = document.querySelector(".temperature"),
    feelsLike = document.querySelector(".feelsLike"),
    description = document.querySelector(".description"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city"),
    HValue = document.getElementById("HValue"),
    WValue = document.getElementById("WValue"),
    SRValue = document.getElementById("SRValue"),
    SSValue = document.getElementById("SSValue"),
    CValue = document.getElementById("CValue"),
    PValue = document.getElementById("PValue");


const API_KEY = '3330c697ceb29599b2a3598b4de235a2';
const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;


const iconMapping = {
    '200': 'lightning-bolt-.png',
    '201': 'lightning-bolt-.png',
    '202': 'lightning-bolt-.png',
    '210': 'thunderstorm.png',
    '211': 'thunderstorm.png',
    '212': 'thunderstorm.png',
    '221': 'thunderstorm.png',
    '230': 'scattered-thunderstorms.png',
    '231': 'scattered-thunderstorms.png',
    '232': 'scattered-thunderstorms.png',
    '300': 'drizzle.png',
    '301': 'drizzle.png',
    '302': 'drizzle.png',
    '310': 'drizzle.png',
    '311': 'drizzle.png',
    '312': 'drizzle.png',
    '313': 'drizzle.png',
    '314': 'drizzle.png',
    '321': 'drizzle.png',
    '500': 'downpour.png',
    '501': 'downpour.png',
    '502': 'downpour.png',
    '520': 'downpour.png',
    '521': 'downpour.png',
    '531': 'downpour.png',
    '503': 'rainy.png',
    '504': 'rainy.png',
    '522': 'rainy.png',
    '511': 'cloud.png',
    '600': 'snow.png',
    '601': 'snow.png',
    '621': 'snow.png',
    '602': 'snowfall.png',
    '622': 'snowfall.png',
    '611': 'cloud.png',
    '612': 'cloud.png',
    '613': 'cloud.png',
    '615': 'cloud.png',
    '616': 'cloud.png',
    '620': 'snow.png',
    '701': 'wind.png',
    '711': 'smoke.png',
    '721': 'haze.png',
    '731': 'dust-laden-wind.png',
    '761': 'dust-laden-wind.png',
    '751': 'dust-laden-wind.png',
    '741': 'fog.png',
    '762': 'ash.png',
    '771': 'tornado.png',
    '781': 'tornado.png',
    '800': 'sun.png',
    '801': 'clear-sky.png',
    '802': 'scattered-thunderstorms.png',
    '803': 'cloudy.png',
    '804': 'cloudy.png'
};


function findUserLocation() {
    const location = userLocation.value;
    if (location) {
        fetch(`${WEATHER_API_ENDPOINT}&q=${location}`)
            .then((response) => response.json())
            .then((data) => displayWeatherData(data))
            .catch((error) => console.error('Error fetching weather data:', error));
    }
}


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(`${WEATHER_API_ENDPOINT}&lat=${latitude}&lon=${longitude}`)
                .then((response) => response.json())
                .then((data) => displayWeatherData(data))
                .catch((error) => console.error('Error fetching weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}


function displayWeatherData(data) {
    if (data) {
        const temp = convertTemperature(data.main.temp);
        const feelsLikeTemp = convertTemperature(data.main.feels_like);
        
     
        const weatherCode = data.weather[0].id;
        const icon = iconMapping[weatherCode] || 'default.png';
        
        weatherIcon.innerHTML = `<img src="./images/${icon}" alt="Weather Icon">`;
        temperature.innerHTML = `${temp} ${converter.value}`;
        feelsLike.innerHTML = `Feels like: ${feelsLikeTemp} ${converter.value}`;
        description.innerHTML = capitalizeFirstLetter(data.weather[0].description);
        date.innerHTML = new Date(data.dt * 1000).toLocaleDateString();
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        HValue.innerHTML = `${data.main.humidity}%`;
        WValue.innerHTML = `${data.wind.speed} m/s`;
        SRValue.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        SSValue.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        CValue.innerHTML = `${data.clouds.all}%`;
        PValue.innerHTML = `${data.main.pressure} hPa`;
    }
}


function convertTemperature(tempInKelvin) {
    return converter.value === '°C'
        ? (tempInKelvin - 273.15).toFixed(1)
        : ((tempInKelvin - 273.15) * 9/5 + 32).toFixed(1);
}


converter.addEventListener('change', () => {
    const location = userLocation.value;
    if (location) {
        findUserLocation();
    } else {
        getCurrentLocation();
    }
});


function capitalizeFirstLetter(description) {
    return description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
