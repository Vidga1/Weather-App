// Mock fetch
import { fetchWeatherData, setWeatherIcon, checkWeather } from '../src/js/weather';

global.fetch = jest.fn();

// Mock console.error
global.console = { error: jest.fn() };

// Mock DOM properties
document.querySelector = jest.fn();

const weatherIcon = { className: '' };
const weather = { style: { display: '' } };
const errorText = { style: { display: '' } };
const city = { innerHTML: '' };
const temp = { innerHTML: '' };
const humidity = { innerHTML: '' };
const wind = { innerHTML: '' };

document.querySelector.mockImplementation((selector) => {
	switch (selector) {
	case ".weather-image i":
		return weatherIcon;
	case ".weather":
		return weather;
	case ".error":
		return errorText;
	case ".city":
		return city;
	case ".temp":
		return temp;
	case ".humidity":
		return humidity;
	case ".wind":
		return wind;
	default:
		return null;
	}
});

describe('fetchWeatherData', () => {
	it('should fetch data successfully', async () => {
		const mockSuccessResponse = {};
		global.fetch.mockImplementation(() => Promise.resolve({
			json: () => Promise.resolve(mockSuccessResponse),
		}));

		const response = await fetchWeatherData('mockUrl');
		expect(response).toEqual(mockSuccessResponse);
		expect(global.fetch).toHaveBeenCalledWith('mockUrl');
	});

	it('should handle fetch error', async () => {
		const mockFailResponse = 'Fetch Error';
		global.fetch.mockImplementation(() => Promise.reject(mockFailResponse));

		const response = await fetchWeatherData('mockUrl');
		expect(response).toBeNull();
		expect(global.console.error).toHaveBeenCalledWith('Error fetching weather data:', mockFailResponse);
	});
});

describe('setWeatherIcon', () => {
	it('should set correct icon class based on weather condition', () => {
		setWeatherIcon('Rain');
		expect(weatherIcon.className).toEqual('fa-solid fa-cloud-rain');

		setWeatherIcon('Mist');
		expect(weatherIcon.className).toEqual('fa-solid fa-cloud-mist');

		setWeatherIcon('Drizzle');
		expect(weatherIcon.className).toEqual('fa-solid fa-cloud-drizzle');

		setWeatherIcon('Unknown');
		expect(weatherIcon.className).toEqual('fa-solid fa-cloud');
	});
});

// Mock initMap
jest.mock('../src/js/map', () => ({
	initMap: jest.fn(),
}));

describe('checkWeather', () => {
	it('should handle error response', async () => {
		const mockErrorResponse = { cod: '404' };
		global.fetch.mockImplementation(() => Promise.resolve({
			json: () => Promise.resolve(mockErrorResponse),
		}));

		await checkWeather(0, 0);
		expect(weather.style.display).toEqual('none');
		expect(errorText.style.display).toEqual('block');
	});
	describe('checkWeather', () => {
		it('should update weather data and DOM correctly', async () => {
	  const mockSuccessResponse = {
				name: 'Mock City',
				main: {
		  temp: 7,
		  humidity: 80,
				},
				wind: {
		  speed: 5,
				},
				weather: [
		  { main: 'Rain' },
				],
	  };
	  global.fetch.mockImplementation(() => Promise.resolve({
				json: () => Promise.resolve(mockSuccessResponse),
	  }));
	  await checkWeather(0, 0);
	  expect(weather.style.display).toEqual('block');
	  expect(errorText.style.display).toEqual('none');
	  expect(city.innerHTML).toEqual('Mock City');
	  expect(temp.innerHTML).toEqual("7℃");
	  expect(humidity.innerHTML).toEqual('80%');
	  expect(wind.innerHTML).toEqual('5 km/h');
	  expect(weatherIcon.className).toEqual('fa-solid fa-cloud-rain');
		});
  
		it('should handle error when updating DOM', async () => {
	  const mockSuccessResponse = {
				name: 'Mock City',
				main: {
		  temp: 7,
		  humidity: 80,
				},
				wind: {
		  speed: 5,
				},
				weather: [
		  { main: 'Unknown' },
				],
	  };
	  global.fetch.mockImplementation(() => Promise.resolve({
				json: () => Promise.resolve(mockSuccessResponse),
	  }));
  
	  await checkWeather(0, 0);
	  expect(global.console.error).toHaveBeenCalledWith('Data or coordinates are not defined');
		});
	});
});