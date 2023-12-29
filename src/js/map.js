let map;

export function initMap(lat, lon) {
	const center = [lat, lon];

	global.ymaps.ready(() => {
		if (!map) {
			map = new global.ymaps.Map('map-test', {
				center,
				zoom: 10,
			});
		} else {

			map.setCenter(center);

			if (map.geoObjects.getLength() > 0) {
				map.geoObjects.removeAll();
			}
		}

		const placemark = new global.ymaps.Placemark(center);
	
		map.geoObjects.add(placemark);
	});
}