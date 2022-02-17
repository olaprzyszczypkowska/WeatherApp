// input
const input = document.querySelector(".input");
const inputBtn = document.querySelector(".input__btn");

const URL = "https://goweather.herokuapp.com/weather/";

const showMoreWeather = () => {
  moreBox.classList.toggle("more-active");
};

const getWeather = () => {
  const city = input.value;
  const api = URL + city;
  let wind = "";
  let temp = "";
  let description = "";

  fetch(api)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      //weather box
      const weatherContainer = document.createElement("div");
      const weatherBox = document.createElement("div");
      const weatherIcon = document.createElement("img");
      const weatherTitle = document.createElement("h2");
      const weatherTemp = document.createElement("p");
      //more weather
      const moreContainer = document.createElement("div");
      const moreBoxOne = document.createElement("div");
      const moreTitle = document.createElement("p");
      const moreDescription = document.createElement("p");
      const moreBoxTwo = document.createElement("div");
      const windTitle = document.createElement("p");
      const windText = document.createElement("p");
      // append
      document.body.append(weatherContainer);
      weatherContainer.append(weatherBox, moreContainer);
      weatherBox.append(weatherIcon, weatherTitle, weatherTemp);
      moreContainer.append(moreBoxOne, moreBoxTwo);
      moreBoxOne.append(moreTitle, moreDescription);
      moreBoxTwo.append(windTitle, windText);
      //textContent
      windTitle.textContent = "Wind";
      moreTitle.textContent = "Description";
      // classlist
      weatherContainer.classList.add("weather");
      weatherBox.classList.add("weather__box");
      weatherIcon.classList.add("weather__icon");
      weatherTitle.classList.add("weather__title");
      weatherTemp.classList.add("weather__temp");
      moreContainer.classList.add("more");
      moreBoxOne.classList.add("more__box");
      moreBoxTwo.classList.add("more__box");
      moreTitle.classList.add("more__title");
      moreDescription.classList.add("more__description");
      windTitle.classList.add("wind__title");
      windText.classList.add("wind__text");
      // //

      wind = data.wind;
      windText.textContent = wind;
      weatherTitle.textContent = city;
      temp = data.temperature;
      weatherTemp.textContent = temp;
      description = data.description;
      moreDescription.textContent = description;
    })

    .catch((err) => {
      console.error(err);
    });
};

inputBtn.addEventListener("click", getWeather);
