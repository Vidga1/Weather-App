import { checkWeather } from './weather';
import { getGeoLocation } from './geoLocation';
import { addCityToList, updateCityList } from './cityList';

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

document.addEventListener("DOMContentLoaded", () => {
	const cities = JSON.parse(localStorage.getItem("cities")) || [];
	cities.forEach(city => addCityToList(city));
	getGeoLocation();
});

searchButton.addEventListener("click", () => {
	const city = searchInput.value;
	checkWeather(null, null, city);
	addCityToList(city);
	updateCityList(city);
	searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
	if (event.keyCode === 13) {
		const city = searchInput.value;
		checkWeather(null, null, city);
		addCityToList(city);
		updateCityList(city);
		searchInput.value = "";
	}
});