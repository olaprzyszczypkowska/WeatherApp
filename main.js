// input
const header = document.querySelector(".header")
const input = document.querySelector(".input");
const inputBtn = document.querySelector(".input__btn");
const warningText = document.querySelector(".warning");

const KEY = "d70a130bfc2ca74d614f94cfe8657680";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const cityNames = [];

const getWeather = () => {
  const city = input.value;
  const API = URL + city + "&appid=" + KEY + "&units=metric";

  fetch(API)
    .then((response) => response.json())

    .then((data) => {
      const weatherContainer = document.createElement("div");
      const weatherBox = document.createElement("div");
      const weatherIcon = document.createElement("img");
      const weatherTitle = document.createElement("h2");
      const weatherTemp = document.createElement("p");
      //more weather
      const moreContainer = document.createElement("div");
      const descriptionBox = document.createElement("div");
      const descriptionInfo = document.createElement("p");
      const feelsLikeBox = document.createElement("div");
      const feelsLikeTitle = document.createElement("p");
      const feelsLikeTemp = document.createElement("p");
      const humidityBox = document.createElement("div");
      const humidityTitle = document.createElement("p");
      const humidityInfo = document.createElement("p");
      // append
      document.body.append(weatherContainer);
      weatherContainer.append(weatherBox, moreContainer);
      weatherBox.append(weatherIcon, weatherTitle, weatherTemp);
      moreContainer.append(descriptionBox, feelsLikeBox, humidityBox);
      descriptionBox.append(descriptionInfo);
      feelsLikeBox.append(feelsLikeTitle, feelsLikeTemp);
      humidityBox.append(humidityTitle, humidityInfo);
      //textContent
      feelsLikeTitle.textContent = "Feels like";
      humidityTitle.textContent = "Humidity";
      // classlist
      weatherContainer.classList.add("weather");
      weatherBox.classList.add("weather__box");
      weatherIcon.classList.add("weather__icon");
      weatherTitle.classList.add("weather__title");
      weatherTemp.classList.add("weather__temp");
      moreContainer.classList.add("more");
      descriptionBox.classList.add("more__box");
      feelsLikeBox.classList.add("more__box");
      humidityBox.classList.add("more__box");
      descriptionInfo.classList.add("description__info");
      feelsLikeTitle.classList.add("feelsLike__title");
      feelsLikeTemp.classList.add("feelsLike__temp");
      humidityTitle.classList.add("humidity__title");
      humidityInfo.classList.add("humidity__info");
      // values
      weatherTitle.textContent = data.name;
      weatherTemp.textContent = Math.floor(data.main.temp) + "°C";
      feelsLikeTemp.textContent = Math.floor(data.main.feels_like) + "°C";
      humidityInfo.textContent = data.main.humidity + "%";
      descriptionInfo.textContent = data.weather[0].main;

      // icons & background color
      if (data.weather[0].id >= 200 && data.weather[0].id <= 202) {
        weatherIcon.setAttribute("src", "/img/stormRain.svg");
        weatherContainer.style.backgroundColor = "#f79d65";
      } else if (data.weather[0].id >= 230 && data.weather[0].id < 300) {
        weatherIcon.setAttribute("src", "/img/stormRain.svg");
        weatherContainer.style.backgroundColor = "#f79d65";
      } else if (data.weather[0].id >= 210 && data.weather[0].id <= 221) {
        weatherIcon.setAttribute("src", "/img/storm.svg");
        weatherContainer.style.backgroundColor = "#f433e3f";
      } else if (data.weather[0].id >= 300 && data.weather[0].id < 600) {
        weatherIcon.setAttribute("src", "/img/rain.svg");
        weatherContainer.style.backgroundColor = "#c0d6df";
      } else if (data.weather[0].id >= 600 && data.weather[0].id < 700) {
        weatherIcon.setAttribute("src", "/img/snow.svg");
        weatherContainer.style.backgroundColor = "#caf0f8";
      } else if (data.weather[0].id === 800) {
        weatherIcon.setAttribute("src", "/img/sun.svg");
        weatherContainer.style.backgroundColor = "#fbc4ab";
      } else if ((data.weather[0].id > 801) & (data.weather[0].id < 900)) {
        weatherIcon.setAttribute("src", "/img/cloud.svg");
        weatherContainer.style.backgroundColor = "#ede7e3";
      } else if (data.weather[0].id === 801) {
        weatherIcon.setAttribute("src", "/img/partlyCloudy.svg");
        weatherContainer.style.backgroundColor = "#cfe0c3";
        descriptionInfo.textContent = "Partly cloud";
      }
      // listeners
      weatherBox.addEventListener("click", function () {
        moreContainer.classList.toggle("more-active");
      });
      moreContainer.addEventListener("click", function () {
        moreContainer.classList.remove("more-active");
      });

      //push to array
      cityNames.push(weatherTitle.textContent.toLowerCase());
      console.log(data);
    })

    .catch((err) => {
      console.error(err);
    });
};

const checkInput = () => {



  if (cityNames.some((city) => city === input.value.toLowerCase())) {
    warningText.textContent =
      input.value.substring(0, 1).toUpperCase() +
      input.value.substring(1) +
      " is already on your weather list.";
  } else if (cityNames.length === 0) {
    getWeather();
    warningText.textContent = "";
    input.value = "";
  } else {
    getWeather();
    warningText.textContent = "";
    input.value = "";
  }
  
};

const enterCheck = (e) => {
  if (e.keyCode === 13) {
    checkInput();
  }
};

input.addEventListener("keyup", enterCheck);

inputBtn.addEventListener("click", checkInput);
