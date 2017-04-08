import React from 'react'
import {GOOGLE_KEY} from '../../constants'
import _ from 'lodash'
import Marker from '../../models/marker'
import {connect} from 'react-redux'

class Map extends React.PureComponent {
    constructor() {
        super()
        this.map = null;
        this.userLatitude = 52.2251325;
        this.userLongitude = 20.972243799999998;
    }

    getCurrentLocation() {
        const addUserCurrentPosition = ::this.addUserCurrentPosition;
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(addUserCurrentPosition, () => {
                this.drawMap();
            });
         } else {
            console.error('Browser doesn\'t support Geolocation');
            this.drawMap();
         }
    }

    addUserCurrentPosition(position) {
        console.log(position);
        this.userLatitude = _.get(position, 'coords.latitude'),
        this.userLongitude = _.get(position, 'coords.longitude');
        this.drawMap();

        const marker = {
            lat: this.userLatitude,
            lng: this.userLongitude,
            title: 'My position',
            icon: 'https://maps.google.com/mapfiles/ms/micons/man.png',
            draggable: false,
            map: this.map
        };

        this.addMarkers(marker);
    }

    addMarkers(markers) {
        markers = Array.isArray(markers) ? markers : [markers];
        markers = markers.map((marker) => {
            return new Marker({...marker});
        });
    }

    drawMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
                lat: this.userLatitude, lng: this.userLongitude
            }
        });
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    render() {
        console.log('props', this.props)
        return (
            <div className={'google-map'}>
                <div id="map"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps', state)
    return {
        isSettingPointAEnabled: state.map.isSettingPointAEnabled,
        isSettingPointBEnabled: state.map.isSettingPointBEnabled
    }
}
function mapDispatchToProps(dispatch) {
    return {
        enableSettingPointA: () => {
            dispatch({
                type: SETTING_A_POINT,
                payload: true
            })
        },
        enableSettingPointB: () => {
            dispatch({
                type: SETTING_B_POINT,
                payload: true
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)