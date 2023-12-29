import { initMap } from './map';

const apiKeyWeather = "da56d37c18a9711156b5842e9dc47b1e";
const apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather';

function getDOMElement(selector) {
	return document.querySelector(selector);
}

export async function fetchWeatherData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		window.console.error("Error fetching weather data:", error);
		return null;
	}
}

export function setWeatherIcon(weatherCondition) {
	const weatherIcon = getDOMElement(".weather-image i");
	const weatherIcons = {
		"Clear": "fa-solid fa-sun",
		"Rain": "fa-solid fa-cloud-rain",
		"Mist": "fa-solid fa-cloud-mist",
		"Drizzle": "fa-solid fa-cloud-drizzle",
		"Default": "fa-solid fa-cloud"
	};
	
	if (weatherIcon) {
		weatherIcon.className = weatherIcons[weatherCondition] || weatherIcons.Default;
	}
}

export function updateWeatherDisplay({ name, main, wind, weather }) {
	const cityElem = getDOMElement(".city");
	const tempElem = getDOMElement(".temp");
	const humidityElem = getDOMElement(".humidity");
	const windElem = getDOMElement(".wind");

	if (cityElem) cityElem.textContent = name;
	if (tempElem) tempElem.textContent = `${Math.round(main.temp)}℃`;
	if (humidityElem) humidityElem.textContent = `${main.humidity}%`;
	if (windElem) windElem.textContent = `${wind.speed} km/h`;
	if (weather && weather.length > 0) {
		setWeatherIcon(weather[0].main);
	}
}

export async function checkWeather(lat, lon, city, callback) {
	const params = {
		units: 'metric',
		appid: apiKeyWeather
	};

	if (city) {
		params.q = city;
	} else {
		params.lat = lat;
		params.lon = lon;
	}

	const url = `${apiUrlWeather}?${new URLSearchParams(params)}`;
	const data = await fetchWeatherData(url);

	const errorText = getDOMElement(".error");
	const weatherElem = getDOMElement(".weather");

	if (!data || data.cod === "404") {
		if (callback) callback(false);
		errorText.style.display = "block";
		weatherElem.style.display = "none";
	} else {
		updateWeatherDisplay(data);
		if (callback) callback(true);
		weatherElem.style.display = "block";
		errorText.style.display = "none";

		if (data.coord) {
			initMap(data.coord.lat, data.coord.lon);
		} else {
			window.console.error('Data or coordinates are not defined');
		}
	}
}