const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'bc3825bbea7081942a221443a4149f94';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(response => response.json()).then(json => {
        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fade-in');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fade-in');

        const image = document.querySelector('.weather-box img');
        const temp = document.querySelector('.weather-box .temperature');
        const humidity = document.querySelector('.humidity .text span');
        const desc = document.querySelector('.weather-box .description');
        const wind = document.querySelector('.wind .text span');

        const icon = json.weather[0].main;

        switch (icon) {
            case 'Clear':
                image.src = 'Images/Sun.png';
                break;
            case 'Clouds':
                image.src = 'Images/Clouds.png';
                break;
            case 'Rain':
                image.src = 'Images/Rain.png';
                break;
            case 'Snow':
                image.src = 'Images/snow.png';
                break;
            case 'Haze':
                image.src = 'Images/Shower.png';
                break;

            default:
                image.src = 'Images/404.png';
                break;
        }
        temp.innerHTML = `${Math.round(json.main.temp - 273.15)}°C`;
        desc.innerHTML = json.weather[0].description;
        humidity.innerHTML = `Humidity: ${json.main.humidity}%`;
        wind.innerHTML = `Wind: ${json.wind.speed}m/s`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fade-in');
        weatherDetails.classList.add('fade-in');
        container.style.height = '600px';
    });
});