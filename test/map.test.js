import { initMap } from '../src/js/map';

const mockPlacemark = jest.fn();
const mockMap = {
	geoObjects: {
		getLength: jest.fn(),
		removeAll: jest.fn(),
		add: jest.fn(),
	},
	setCenter: jest.fn(),
};

global.ymaps = {
	Placemark: mockPlacemark,
	Map: jest.fn(() => mockMap),
	ready: jest.fn((cb) => cb()),
};

describe('initMap', () => {
	it('initializes a new map if none exists', async () => {
		initMap();

		expect(global.ymaps.Map).toHaveBeenCalledWith('map-test', {
			center: [],
			zoom: 10,
		});
	});

	it('sets the center of the existing map', async () => {
		initMap(51.5074, -0.1278);
		expect(mockMap.setCenter).toHaveBeenCalledWith([51.5074, -0.1278]);
	});

	it('removes all geoObjects if any exist', async () => {
		mockMap.geoObjects.getLength.mockReturnValueOnce(1);

		await initMap(51.5074, -0.1278);

		expect(mockMap.geoObjects.removeAll).toHaveBeenCalled();
	});
});

	