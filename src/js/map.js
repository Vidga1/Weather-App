/* eslint-disable no-undef */
let map;

export function initMap(lat, lon) {
	if (map) {
		map.setCenter([lat, lon]);
	} else {
		ymaps.ready(() => {
			map = new ymaps.Map('map-test', {
				center: [lat, lon],
				zoom: 10
			});
		});
	}
}