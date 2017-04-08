export default class MarkerInfoWindow {
    constructor(Point) {
        this.Point;
        this.infoWindow = new google.maps.InfoWindow({
            content: this.Point.content
        });
    }

    openWindow(map, marker) {
        this.infoWindow.open(map, marker);
    }
}