import MarkerInfoWindow from './infoWindow'

export default class Marker {
	constructor({ pollutionLevel, id, lat, lng, title = '', icon = '', map, draggable = false}) {
		this.marker = new google.maps.Marker({
        	position:{
                lat: lat,
                lng: lng
            },
      	 	map: map,
      		title: title,
      		draggable: draggable,
      		// animation: google.maps.Animation.DROP,
      		icon: this.getMarkerIcon(icon)
		});
		this.infoWindow = new MarkerInfoWindow();
		this.getInfoWindow();
	}

	getMarker() {
		return this.marker;
	}

	getInfoWindow() {
		this.marker.addListener('click', () => {
			this.infoWindow.openWindow(this.map, this.marker);
		});
	}

	getMarkerIcon(id) {
		let icon;
		switch (id) {
			case 'pol_1':
				icon = 'green';
				break;
			case 'pol_2':
				icon = 'yellow';
				break;
			case 'pol_3':
				icon = 'orange';
				break;
			case 'pol_4':
				icon = 'pink';
				break;
			case 'pol_5':
				icon = 'red';
				break;
			case 'pol_0':
				icon = 'grey';
				break;
			case 'pol_6':
				icon = 'red';
				break;
			case 'user_point':
				icon = 'man';
				break;
			case 'end_point':
				icon = 'flag';
				break;
			case 'path':
				icon = 'purple-pushpin';
				break;
			default:
				icon = 'red';
		}
		return `https://maps.google.com/mapfiles/ms/micons/${icon}.png`;
	}

	setDraggable(isDraggable) {

	}
}