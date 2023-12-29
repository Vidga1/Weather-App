import { checkWeather } from '../src/js/weather';
import { getGeoLocation } from '../src/js/geoLocation';

jest.mock('../src/js/weather', () => ({
	checkWeather: jest.fn(),
}));

describe('getGeoLocation', () => {
	it('should get geolocation and check weather', () => {
		const mockLat = 10;
		const mockLon = 20;
		global.navigator.geolocation = {
			getCurrentPosition: jest.fn().mockImplementation((callback) => {
				callback({ coords: { latitude: mockLat, longitude: mockLon } });
			}),
		};

		getGeoLocation();

		expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
		expect(checkWeather).toHaveBeenCalledWith(mockLat, mockLon);
	});
});

