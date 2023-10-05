import { initMap } from './map';

const apiKeyWeather = "da56d37c18a9711156b5842e9dc47b1e";
const apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");

export async function checkWeather(lat, lon, city) {
	let url;
	if (city) {
		url = `${apiUrlWeather}&q=${city}&appid=${apiKeyWeather}`;
	} else {
		url = `${apiUrlWeather}&lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`;
	}

	const response = await fetch(url);

	if (response.status === 404) {
		errorText.style.display = "block";
		weather.style.display = "none";
	} else {
		const data = await response.json();

		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML =
      `${Math.round(data.main.temp)  }℃`;
		document.querySelector(".humidity").innerHTML = `${data.main.humidity  }%`;
		document.querySelector(".wind").innerHTML = `${data.wind.speed  } km/h`;

		if (data.weather[0].main === "Clear") {
			weatherIcon.className = "fa-solid fa-sun";
		} else if (data.weather[0].main === "Rain") {
			weatherIcon.className = "fa-solid fa-cloud-rain";
		} else if (data.weather[0].main === "Mist") {
			weatherIcon.className = "fa-solid fa-cloud-mist";
		} else if (data.weather[0].main === "Drizzle") {
			weatherIcon.className = "fa-solid fa-cloud-drizzle";
		}

		weather.style.display = "block";
		errorText.style.display = "none";

		// Update the map with the new location
		initMap(data.coord.lat, data.coord.lon);
	}
}