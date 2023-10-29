import { checkWeather } from './weather';

export function updateCityList(city) {
	let cities = JSON.parse(localStorage.getItem("cities")) || [];

	if (cities.includes(city.toUpperCase())) {
		window.console.log("Город уже в списке.");
		return;
	}

	checkWeather(null, null, city, (isValid) => {
		if (!isValid) {
			window.console.log("Введен неправильный город.");
			return;
		}

		cities.push(city.toUpperCase());

		cities = cities.slice(-10);

		localStorage.setItem("cities", JSON.stringify(cities));

		const cityList = document.querySelector(".city-list");
		const listItem = document.createElement("li");
		listItem.textContent = city.toUpperCase();
		listItem.addEventListener("click", () => {
			checkWeather(null, null, city);
		});

		if (cityList.childElementCount === 10) {
			cityList.removeChild(cityList.firstChild);
		}

		cityList.appendChild(listItem);
	});
}