import React from 'react'
import {GOOGLE_KEY} from '../../constants'
import _ from 'lodash'

class Map extends React.PureComponent {
    constructor() {
        super()
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
        const latitude = _.get(position, 'coords.latitude'),
              longitude = _.get(position, 'coords.longitude');
        this.map.setCenter({lat: latitude, lng: longitude});
        const marker = {
            position:{
                lat: latitude,
                lng: longitude
            },
            title: 'My position',
            icon: 'https://maps.google.com/mapfiles/ms/micons/man.png'
        }
        this.addMarkers(marker);
        //mainDistansce = distance(latitude, longitude, latitudeEnd, longitudeEnd);
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
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
                lat: -25.363, lng: 131.044
            }
        });
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