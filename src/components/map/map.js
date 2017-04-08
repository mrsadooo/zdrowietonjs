import React from 'react'
import {GOOGLE_KEY} from '../../constants'

class Map extends React.PureComponent {
    constructor() {
        super()
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {
                lat: -25.363, lng: 131.044
            }
        });
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