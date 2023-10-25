import { initMap } from './map';

const apiKeyWeather = "da56d37c18a9711156b5842e9dc47b1e";
const apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");

export async function fetchWeatherData(url) {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (error) {
		window.console.error("Error fetching weather data:", error);
		return null;
	}
}

export function setWeatherIcon(weatherCondition) {
	switch (weatherCondition) {
	case "Clear":
		weatherIcon.className = "fa-solid fa-sun";
		break;
	case "Rain":
		weatherIcon.className = "fa-solid fa-cloud-rain";
		break;
	case "Mist":
		weatherIcon.className = "fa-solid fa-cloud-mist";
		break;
	case "Drizzle":
		weatherIcon.className = "fa-solid fa-cloud-drizzle";
		break;
	default:
		weatherIcon.className = "fa-solid fa-cloud";
	}
}

export function updateWeatherDisplay(data) {
	document.querySelector(".city").innerHTML = data.name;
	document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)  }℃`;
	document.querySelector(".humidity").innerHTML = `${data.main.humidity  }%`;
	document.querySelector(".wind").innerHTML = `${data.wind.speed  } km/h`;
	setWeatherIcon(data.weather[0].main);
}

export async function checkWeather(lat, lon, city) {
	let url;

	if (city) {
		url = `${apiUrlWeather}&q=${city}&appid=${apiKeyWeather}`;
	} else {
		url = `${apiUrlWeather}&lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`;
	}

	const data = await fetchWeatherData(url);

	if (!data || data.cod === "404") {
		errorText.style.display = "block";
		weather.style.display = "none";
	} else {
		updateWeatherDisplay(data);
		weather.style.display = "block";
		errorText.style.display = "none";
		// Update the map with the new location
		if (data && data.coord) {
			initMap(data.coord.lat, data.coord.lon);
		  } else {
			window.console.error('Data or coordinates are not defined');
		  }
	}
}