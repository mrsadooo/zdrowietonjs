export default class MarkerInfoWindow {
    constructor() {
        this.infoWindow = new google.maps.InfoWindow({
            content: "Test content!"
        });
    }

    

    openWindow(map, marker) {
        this.infoWindow.open(map, marker);
    }
}