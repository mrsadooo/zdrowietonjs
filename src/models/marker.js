export default class Marker {
	constructor({lat, lng, title = '', icon = 'https://maps.google.com/mapfiles/ms/micons/red.png', map, draggable = false}) {
		this.marker = new google.maps.Marker({
        	position:{
                lat: lat,
                lng: lng
            },
      	 	map: map,
      		title: title,
      		draggable: draggable,
      		// animation: google.maps.Animation.DROP,
      		icon: icon
    	});
	}

	getMarker() {
		return this.marker;
	}

	setDraggable(isDraggable) {

	}
}