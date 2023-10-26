import { checkWeather } from './weather';

export function addCityToList(city) {
	const cityList = document.querySelector(".city-list")
	const listItem = document.createElement("li");
	listItem.textContent = city.toUpperCase();
	listItem.addEventListener("click", () => {
		checkWeather(null, null, city); });
		
	if (cityList.childElementCount === 10) {
		cityList.removeChild(cityList.firstChild);
	}
	cityList.appendChild(listItem);
}
  
export function updateCityList(city) {
	let cities = JSON.parse(localStorage.getItem("cities")) || [];
	if (!cities.includes(city)) {
		cities.push(city);
		// Ограничить список до 10 последних городов
		cities = cities.slice(-10);
		localStorage.setItem("cities", JSON.stringify(cities));
	}
}