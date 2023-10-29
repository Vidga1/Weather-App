import { addCityToList } from '../src/js/cityList'
import { checkWeather } from '../src/js/weather'

let originalConsoleLog;

beforeEach(() => {
	originalConsoleLog = window.console.log;  // сохраняем оригинальную функцию
	window.console.log = jest.fn();           // заменяем на мок
});

afterEach(() => {
	window.console.log = originalConsoleLog;  // восстанавливаем оригинальную функцию после каждого теста
});

jest.mock('../src/js/weather', () => ({
	checkWeather: jest.fn()
}));
  
describe('addCityToList', () => {
	let cityList;
  
	beforeEach(() => {
	  // Resetting the DOM and mock calls before each test
	  checkWeather.mockClear();
	  document.body.innerHTML = '<ul class="city-list"></ul>';
	  cityList = document.querySelector(".city-list");
	});
  
	it('should not add city if it is already in the list', () => {
	  const listItem = document.createElement("li");
	  listItem.textContent = "MOSCOW";
	  cityList.appendChild(listItem);
  
	  addCityToList("moscow");
  
	  expect(window.console.log).toHaveBeenCalledWith("Город уже в списке.");
	  expect(cityList.children.length).toBe(1);
	});
  
	it('should log an error if city is invalid', () => {
	  checkWeather.mockImplementation((_, __, ___, callback) => {
			callback(false);
	  });
  
	  addCityToList("invalidcity");
  
	  expect(window.console.log).toHaveBeenCalledWith("Введен неправильный город.");
	  expect(cityList.children.length).toBe(0);
	});
  
	it('should add valid city to DOM', () => {
	  checkWeather.mockImplementation((_, __, ___, callback) => {
			callback(true);
	  });
  
	  addCityToList("moscow");
  
	  expect(cityList.children.length).toBe(1);
	  expect(cityList.firstChild.textContent).toBe("MOSCOW");
	});
  
	it('should limit the city list to 10 in DOM', () => {
	  for (let i = 0; i < 10; i++) {
			const listItem = document.createElement("li");
			listItem.textContent = `City${i}`;
			cityList.appendChild(listItem);
	  }
  
	  checkWeather.mockImplementation((_, __, ___, callback) => {
			callback(true);
	  });
  
	  addCityToList("newcity");
  
	  expect(cityList.children.length).toBe(10);
	  expect(cityList.firstChild.textContent).toBe("City1");
	  expect(cityList.lastChild.textContent).toBe("NEWCITY");
	});
});