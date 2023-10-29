import { checkWeather } from './weather';
import { getGeoLocation } from './geoLocation';
import { addCityToList } from './cityList';
import { updateCityList } from './localStorage';

export function searchCity(city) {
	checkWeather(null, null, city);
	addCityToList(city);
	updateCityList(city);
}

export function initializeCities() {
	const cities = JSON.parse(localStorage.getItem("cities")) || [];
	cities.forEach(city => addCityToList(city));
	getGeoLocation();
}

export function handleSearchClick() {
	const searchInput = document.querySelector(".search-box input");
	searchCity(searchInput.value);
	searchInput.value = "";
}

export function handleKeyDown(event) {
	if (event.keyCode === 13) {
		handleSearchClick();
	}
}

export function initializeApp() {
	const searchButton = document.querySelector(".search-box button");
	// Обработчик клика по кнопке поиска
	searchButton.addEventListener("click", handleSearchClick);

	const searchInput = document.querySelector(".search-box input");
	// Обработчик нажатия клавиши Enter в поле ввода
	searchInput.addEventListener("keydown", handleKeyDown);
	initializeCities();
}

document.addEventListener("DOMContentLoaded", initializeApp);