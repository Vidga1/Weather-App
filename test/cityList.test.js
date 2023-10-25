import { addCityToList, updateCityList } from '../src/js/cityList';
import { checkWeather } from '../src/js/weather'; 

jest.mock('../src/js/weather');

describe('City List', () => {
	let cityList;
    
	beforeEach(() => {
		cityList = document.createElement('ul');
		cityList.className = 'city-list';
		document.body.appendChild(cityList);
	});
  
	afterEach(() => {
		document.body.removeChild(cityList);
		localStorage.clear();
	});
  
	it('adds city to the list and attaches click event', () => {
		addCityToList('Tokyo');
		const listItem = cityList.firstChild;
		expect(listItem.textContent).toBe('TOKYO');
		expect(checkWeather).not.toHaveBeenCalled();
		listItem.click();
		expect(checkWeather).toHaveBeenCalledWith(null, null, 'Tokyo');
	});
  
	it('removes the first city when the list exceeds 10 cities', () => {
		for (let i = 1; i <= 11; i++) {
			addCityToList(`City${i}`);
		}
		expect(cityList.childElementCount).toBe(10);
		expect(cityList.firstChild.textContent).toBe('CITY2');
	});
  
	it('updates the city list in local storage', () => {
		updateCityList('Tokyo');
		let cities = JSON.parse(localStorage.getItem("cities"));
		expect(cities).toEqual(['Tokyo']);
        
		updateCityList('Paris');
		cities = JSON.parse(localStorage.getItem("cities"));
		expect(cities).toEqual(['Tokyo', 'Paris']);
        
		// Проверить, что список ограничивается до 10 последних городов
		for (let i = 1; i <= 10; i++) {
			updateCityList(`City${i}`);
		}
		cities = JSON.parse(localStorage.getItem("cities"));
		expect(cities).toEqual(['City1', 'City2', 'City3', 'City4', 'City5', 'City6', 'City7', 'City8', 'City9', 'City10']);
          
		updateCityList('London');
		cities = JSON.parse(localStorage.getItem("cities"));
		expect(cities).toEqual(['City2', 'City3', 'City4', 'City5', 'City6', 'City7', 'City8', 'City9', 'City10', 'London']);
	});
});