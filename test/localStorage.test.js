import { updateCityList } from '../src/js/localStorage'
import { checkWeather } from '../src/js/weather'

jest.mock('../src/js/weather');

beforeEach(() => {
	localStorage.clear();
	document.body.innerHTML = '<ul class="city-list"></ul>';
});

test('Добавление города в список', () => {
	checkWeather.mockImplementation((_, __, city, callback) => callback(true));
    
	updateCityList('Moscow');
    
	expect(localStorage.getItem('cities')).toContain('MOSCOW');
	expect(document.querySelector(".city-list").childElementCount).toBe(1);
});

test('Не добавляет дублированный город', () => {
	checkWeather.mockImplementation((_, __, city, callback) => callback(true));
    
	updateCityList('Moscow');
	updateCityList('Moscow');
    
	expect(localStorage.getItem('cities').split(',').length).toBe(1);
	expect(document.querySelector(".city-list").childElementCount).toBe(1);
});

test('Не добавляет неправильный город', () => {
	checkWeather.mockImplementation((_, __, city, callback) => callback(false));
    
	updateCityList('WrongCity');
    
	expect(localStorage.getItem('cities')).toBeNull();
	expect(document.querySelector(".city-list").childElementCount).toBe(0);
});