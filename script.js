const form = document.getElementById("myForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const inputField = document.getElementById("search");
  var city = inputField.value;
  const cityname = document.getElementById("city");
  cityname.textContent = city;

  await fetchData(city);
});

const fetchData = async (city) => {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a63c47d1acmsh33244058519064bp136f68jsn8dcb978d57b5",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const tempreature = document.getElementById("temp");
    const tempElements = document.getElementsByClassName("temp-current");
    const minTempElement = document.querySelector(".temp-min");
    const maxTempElement = document.querySelector(".temp-max");
    const humidity = document.getElementById("humidity");
    const windDegree = document.getElementById("wind-degree");
    const feels = document.getElementById("Feels-like");
    const wind = document.getElementById("wind");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");
    const newRow = document.createElement("tr");

    const currentTemp = result.temp;
    const minTemp = result.min_temp;
    const maxTemp = result.max_temp;
    const humidityinfo = result.humidity;
    const winddegree = result.wind_degrees;
    const feelsLike = result.feels_like;
    const currentHumanity = result.humidity;
    const windinfo = result.wind_speed;
    const sunriseinfo = result.sunrise;
    const sunsetinfo = result.sunset;

    for (const tempElement of tempElements) {
      tempElement.textContent = `${currentTemp}°C`;
      tempreature.textContent = `${currentTemp}°C`;
    }

    minTempElement.textContent = `${minTemp}°C`;
    maxTempElement.textContent = `${maxTemp}°C`;
    humidity.textContent = `${humidityinfo}`;
    windDegree.textContent = `${winddegree}`;
    feels.textContent = `${feelsLike}`;
    currentHumanity.textContent = `${humidityinfo}`;
    wind.textContent = `${windinfo}`;
    sunrise.textContent = `${sunriseinfo}`;
    sunset.textContent = `${sunsetinfo};`;

    newRow.innerHTML = `
    <th scope="row" class="text-start">${city}</th>
    <td>${result.cloud_pct}</td>
    <td>${currentTemp}°C</td>
    <td>${feelsLike}</td>
    <td>${maxTemp}°C</td>
    <td>${currentHumanity}%</td>
    <td>${minTemp}°C</td>
    <td>${windinfo} km/hr</td>
    <td>${winddegree}</td>
    <td>${sunriseinfo}</td>
    <td>${sunsetinfo}</td>
  `;
    const tableBody = document.getElementById("weatherTableBody");
    tableBody.appendChild(newRow);
  } catch (error) {
    console.error(error);
  }
};
