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

  fetch(api)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    })

    .catch((err) => {
      console.error( err);
    });
};

inputBtn.addEventListener("click", getWeather);

