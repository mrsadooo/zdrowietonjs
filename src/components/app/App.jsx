import React from 'react';
import Map from './../map';
import MapOverlayWrapper from './../../containers/MapOverlayWrapper';
import {Provider} from 'react-redux'
import store from './../../store'

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <div>
                    <MapOverlayWrapper/>
                    <Map/>
                </div>
            </Provider>
        );
    }
}

export default App;