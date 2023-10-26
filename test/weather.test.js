// Mock fetch
import { fetchWeatherData, setWeatherIcon, checkWeather, updateWeatherDisplay } from '../src/js/weather';
import { initMap } from '../src/js/map';

jest.mock('../src/js/map', () => ({
	initMap: jest.fn()
}));

global.fetch = jest.fn(() => Promise.resolve({
	ok: true,
	json: jest.fn(() => Promise.resolve({}))
}));

describe('Weather functions', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('fetchWeatherData', () => {
		it('should fetch data successfully', async () => {
			const result = await fetchWeatherData('some-url');
			expect(result).toEqual({});
		});

		it('should handle fetch errors', async () => {
			global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));
			const result = await fetchWeatherData('some-url');
			expect(result).toBe(null);
		});
	});
})

describe('setWeatherIcon', () => {
	it('should set the correct icon for Clear weather', () => {
		document.body.innerHTML = '<div class="weather-image"><i></i></div>';
		setWeatherIcon('Clear');
		expect(document.querySelector('.weather-image i').className).toBe('fa-solid fa-sun');
	});

	// ... Пишите аналогичные тесты для других состояний погоды ...

	it('should set the default icon for unknown weather', () => {
		document.body.innerHTML = '<div class="weather-image"><i></i></div>';
		setWeatherIcon('Unknown');
		expect(document.querySelector('.weather-image i').className).toBe('fa-solid fa-cloud');
	});
});

describe('updateWeatherDisplay', () => {
	beforeEach(() => {
		document.body.innerHTML = `
            <div class="city"></div>
            <div class="temp"></div>
            <div class="humidity"></div>
            <div class="wind"></div>
            <div class="weather-image"><i></i></div>
        `;
	});

	it('should update the weather display correctly', () => {
		const mockData = {
			name: "Test City",
			main: {
				temp: 25.6,
				humidity: 70
			},
			wind: {
				speed: 5
			},
			weather: [{
				main: "Clear"
			}]
		};

		updateWeatherDisplay(mockData);
		expect(document.querySelector('.city').textContent).toBe('Test City');
		expect(document.querySelector('.temp').textContent).toBe('26℃');
		expect(document.querySelector('.humidity').textContent).toBe('70%');
		expect(document.querySelector('.wind').textContent).toBe('5 km/h');
		expect(document.querySelector('.weather-image i').className).toBe('fa-solid fa-sun');
	});
});

describe('checkWeather', () => {
	it('should update display and init map for valid data', async () => {
		document.body.innerHTML = `
            <div class="weather"></div>
            <div class="error"></div>
        `;

		const mockData = {
			coord: {
				lat: 123,
				lon: 456
			}
		};
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockData)
		});

		await checkWeather(123, 456);

		expect(document.querySelector('.weather').style.display).toBe('block');
		expect(document.querySelector('.error').style.display).toBe('none');
		// Также добавьте проверку вызова initMap с правильными аргументами, если используете мок для initMap.
	});

	it('should show error for invalid data', async () => {
		document.body.innerHTML = `
            <div class="weather"></div>
            <div class="error"></div>
        `;

		const mockData = {
			cod: '404'
		};
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValueOnce(mockData)
		});

		await checkWeather(123, 456);

		expect(document.querySelector('.weather').style.display).toBe('none');
		expect(document.querySelector('.error').style.display).toBe('block');
	});

	// ... Добавьте больше тестовых сценариев для функции checkWeather ...
});