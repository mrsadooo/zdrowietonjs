import React from 'react'
import {GOOGLE_KEY} from '../../constants'
import _ from 'lodash'

class Map extends React.PureComponent {
    constructor() {
        super()
        this.map = null;
        this.userLatitude = null;
        this.userLongitude = null;
    }

    getCurrentLocation() {
        const addUserCurrentPosition = ::this.addUserCurrentPosition;
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(addUserCurrentPosition);
         } else {
            console.error('Browser doesn\'t support Geolocation');
         }
    }

    addUserCurrentPosition(position) {
        this.userLatitude = _.get(position, 'coords.latitude'),
        this.userLongitude = _.get(position, 'coords.longitude');

        const marker = {
            position:{
                lat: this.userLatitude,
                lng: this.userLongitude
            },
            title: 'My position',
            icon: 'https://maps.google.com/mapfiles/ms/micons/man.png'
        }

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
                lat: this.userLatitude, lng: this.userLongitude
            }
        });

        this.addMarkers(marker);
    }

    addMarkers(markers) {
        markers = Array.isArray(markers) ? markers : [markers];
        markers.map((marker) => {
            marker = new google.maps.Marker({
              position: marker.position,
              map: this.map,
              title: marker.title,
              draggable: marker.draggable,
              animation: google.maps.Animation.DROP,
              icon: marker.icon
            });
        });
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    render() {
        return (
            <div className={'google-map'}>
                <div id="map"></div>
            </div>
        )
    }
}
export default Map;