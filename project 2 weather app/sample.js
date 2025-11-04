document.addEventListener('DOMContentLoaded', ()=> {
    const inputCity = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperatureDisplay =  document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "e7341e542fd184aeff62963570582a16";

    getWeatherBtn.addEventListener('click' , async() => {
        const city = inputCity.value.trim();

        if(!city) return;
        
        try {
            const data = await fetchWeatherData(city);
            displayWeatherData(data);
        } catch (error) {
            showErrorMessage();
        }
    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if(!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        // console.log(data);
        return data;
    }

    function displayWeatherData(data){
        console.log(data);
        
        const {name , main , weather} = data;

        console.log(name);
        console.log(main);
        console.log(weather);
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        temperatureDisplay.textContent = `Teampearture: ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        cityName.textContent = name

        const unixTime = data.dt;
        const date = new Date(unixTime * 1000);
        const options = {weekday : 'long' , day : 'numeric' , month : 'long' , year : 'numeric'};
        const formattedDate = date.toLocaleDateString('en-IN' , options);
        document.getElementById("date").textContent = formattedDate;

    }

    function showErrorMessage(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})












