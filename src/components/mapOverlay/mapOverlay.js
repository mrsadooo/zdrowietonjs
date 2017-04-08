import React from 'react'
import PointButton from './../pointButton';

class MapOverlay extends React.PureComponent {
    constructor() {
        super()
        this.onStartClick = this.onStartClick.bind(this);
        this.onEndClick = this.onEndClick.bind(this);
    }

    onStartClick() {
        console.log('A CLICK')
    }

    onEndClick() {
        console.log('B click')
    }

    render() {
        return (
            <div className={'map-overlay'}>
                <PointButton onClick={this.onStartClick} text="A"/>
                <PointButton onClick={this.onEndClick} text="B"/>
            </div>
        )
    }
}
export default MapOverlay;