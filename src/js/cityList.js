import { checkWeather } from './weather';

export function addCityToList(city) {
	const cityList = document.querySelector(".city-list");
	const isCityAlreadyInList = [...cityList.children].some(item => item.textContent === city.toUpperCase());
	if (isCityAlreadyInList) {
		window.console.log("Город уже в списке.");
		return;
	}
    
	checkWeather(null, null, city, (isValid) => {
		if (!isValid) {
			window.console.log("Введен неправильный город.");
			return;
		}

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
  
