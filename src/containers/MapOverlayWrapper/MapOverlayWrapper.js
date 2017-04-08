import React from 'react'
import {connect} from 'react-redux'
import {SETTING_A_POINT, SETTING_B_POINT} from './../../modules/map'
import PointButton from './../../components/pointButton';

class MapOverlay extends React.PureComponent {
    constructor() {
        super()
        this.onStartClick = this.onStartClick.bind(this);
        this.onEndClick = this.onEndClick.bind(this);
    }

    onStartClick() {
        const {enableSettingPointA} = this.props;
        enableSettingPointA();
    }

    onEndClick() {
        const {enableSettingPointB} = this.props;
        enableSettingPointB();
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

function mapStateToProps() {
    return {}
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

export default connect(mapStateToProps, mapDispatchToProps)(MapOverlay)