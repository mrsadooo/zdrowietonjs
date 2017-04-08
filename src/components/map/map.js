import React from 'react'
import {GOOGLE_KEY} from '../../constants'
import _ from 'lodash'
import Marker from '../../models/marker'
import {connect} from 'react-redux'
import {SET_POINT_A, SET_POINT_B, SETTING_A_POINT, SETTING_B_POINT} from '../../modules/map'
import CalculatePath from '../../common/calculatePath'
import Point from '../../common/point'

class Map extends React.PureComponent {
    constructor() {
        super()
        this.map = null;
        this.userLatitude = 52.2251325;
        this.userLongitude = 20.972243799999998;
        this.markers = [];
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

        this.userLatitude = _.get(position, 'coords.latitude'),
        this.userLongitude = _.get(position, 'coords.longitude');
        this.drawMap();
        this.props.setPointA({lat: this.userLatitude, lng: this.userLongitude})
    }

    addMarkers(markers) {
        markers = Array.isArray(markers) ? markers : [markers];
        markers.map((marker) => {
            this.markers.push(new Marker({...marker, map:this.map}));
        });
    }

    drawMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
                lat: this.userLatitude, lng: this.userLongitude
            }
        });

        this.map.addListener('click', (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            if (this.props.isSettingPointAEnabled) {
                this.props.setPointA({lat, lng});
            } else if (this.props.isSettingPointBEnabled) {
                this.props.setPointB({lat, lng});
            }
        });
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    redrawMap(nextProps) {
        this.removeAllMarkers();
        if (nextProps.pointA) {
            this.addMarkers(nextProps.pointA);
        }

        if (nextProps.pointB) {
            this.addMarkers(nextProps.pointB);


        }

        if (nextProps.sensors.length) {
            //this.addMarkers(nextProps.sensors);
            const points = CalculatePath(new Point(nextProps.pointA.lat, nextProps.pointA.lng), new Point(nextProps.pointB.lat, nextProps.pointB.lng), nextProps.sensors);

            this.addMarkers(nextProps.sensors.map((sensor) => {
                return {icon: `pol_${sensor.pollutionLevel}`, pollutionLevel: sensor.pollutionLevel, id: sensor.id, lat: sensor.location.latitude, lng:sensor.location.longitude}
            }));


            this.addMarkers(points.map((point)=>{
                return {lat: point.latitude, lng:point.longitude, icon: 'path'};
            }));
        }

    }

    removeAllMarkers() {

        for (var i = 0; i < this.markers.length; i++ ) {
            this.markers[i].getMarker().setMap(null);
        }
        this.markers.length = 0;

    }

    componentWillUpdate(nextProps) {
        this.redrawMap(nextProps);
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
        isSettingPointBEnabled: state.map.isSettingPointBEnabled,
        pointA: state.map.pointA,
        pointB: state.map.pointB,
        sensors: state.map.sensors
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
        },
        setPointA: (params) => {
            dispatch({
                type: SET_POINT_A,
                payload: params
            })
        },
        setPointB: (params) => {
            dispatch({
                type: SET_POINT_B,
                payload: params
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)