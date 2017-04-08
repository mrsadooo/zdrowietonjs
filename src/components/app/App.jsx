import React from 'react';
import Map from './../map';
import MapOverlayWrapper from './../../containers/MapOverlayWrapper';

class App extends React.Component {

    render() {

        return (
            <div>
                <MapOverlayWrapper/>
                <Map/>
            </div>
        );
    }
}

export default App;