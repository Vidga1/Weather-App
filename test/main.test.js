import { checkWeather } from '../src/js/weather';
import { getGeoLocation } from '../src/js/geoLocation';
import { addCityToList } from '../src/js/cityList'; 
import { updateCityList } from '../src/js/localStorage'; 
import { searchCity, initializeCities, handleSearchClick, handleKeyDown, initializeApp } from '../src/js/main';  

jest.mock('../src/js/weather');
jest.mock('../src/js/geoLocation');
jest.mock('../src/js/cityList'); 
jest.mock('../src/js/localStorage'); 


describe('Main functions', () => {
	let searchInput;
	let searchButton;

	const searchCityMock = jest.fn(searchCity);
	const handleSearchClickMock = jest.fn(handleSearchClick);
  
	beforeEach(() => {
	  // Настроим DOM перед каждым тестом
	  document.body.innerHTML = `
		<div class="search-box">
		  <input />
		  <button></button>
		</div>
	  `;

	  global.searchCity = searchCityMock;
	  global.handleSearchClick = handleSearchClickMock;
  
	  searchInput = document.querySelector(".search-box input");
	  searchButton = document.querySelector(".search-box button");
  
	  // Очищаем моки перед каждым тестом
	  checkWeather.mockClear();
	  getGeoLocation.mockClear();
	  addCityToList.mockClear();
	  updateCityList.mockClear();
	});

	afterEach(() => {
		jest.clearAllMocks();
	  });
  
	it('searchCity calls appropriate functions with right parameters', () => {
	  searchCity('Test City');
	  
	  expect(checkWeather).toHaveBeenCalledWith(null, null, 'Test City');
	  expect(addCityToList).toHaveBeenCalledWith('Test City');
	  expect(updateCityList).toHaveBeenCalledWith('Test City');
	});
  
	it('initializeCities calls addCityToList for each city in localStorage and getGeoLocation', () => {
	  localStorage.setItem('cities', JSON.stringify(['City1', 'City2']));
	  
	  initializeCities();
	  
	  expect(addCityToList).toHaveBeenCalledWith('City1');
	  expect(addCityToList).toHaveBeenCalledWith('City2');
	  expect(getGeoLocation).toHaveBeenCalled();
	});

	it('handleSearchClick calls searchCity with input value and clears input', () => {
		searchInput.value = 'Test City';
		
		handleSearchClick();
		
		// Проверка, что checkWeather вызывался с ожидаемыми параметрами, как это делается внутри searchCity
		expect(checkWeather).toHaveBeenCalledWith(null, null, 'Test City'); 
		expect(searchInput.value).toBe('');
	});

	it('handleKeyDown calls handleSearchClick on Enter key press', () => {
		searchInput.value = 'Test City';
		const mockEvent = { keyCode: 13 };
		
		handleKeyDown(mockEvent);
		
		// Проверка, что значение searchInput было очищено, как это делается внутри handleSearchClick
		expect(searchInput.value).toBe(''); 
	});

	it('initializeApp adds event listeners and initializes cities', () => {
	  initializeApp();
  
	  expect(searchButton.onclick).toBeDefined();
	  expect(searchInput.onkeydown).toBeDefined();
	});
});