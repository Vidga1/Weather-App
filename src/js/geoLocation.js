import {checkWeather} from './weather';

export function getGeoLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
		  const lat = position.coords.latitude;
		  const lon = position.coords.longitude;
		  checkWeather(lat, lon);
		});
	  }
}
   