import React from 'react';
import Map from './../map';
import MapOverlay from './../mapOverlay';

class App extends React.Component {

    render() {

        return (
            <div>
                <MapOverlay/>
                <Map/>
            </div>
        );
    }
}

export default App;