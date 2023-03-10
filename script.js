const weather = {
    "apiKey": "c98d002bc5cb27519cc10f0d99e21ed7",
    fetchWeather: (city) => {
        
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            +"&exclude=current&units=metric&appid=" + weather.apiKey
        )
        .then((response) => response.json())
        .then((data) => weather.displayWeather(data));
    },
    displayWeather: (data) => {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"
        +icon
        +"@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h"
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${name}')`
    },
    search: () => {
       weather.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        weather.search()
    }
})

weather.fetchWeather("Winnipeg")