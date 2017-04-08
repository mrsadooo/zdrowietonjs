import React from 'react'
import {connect} from 'react-redux'
import {SETTING_A_POINT, SETTING_B_POINT, SET_SENSORS} from './../../modules/map'
import PointButton from './../../components/pointButton';
// import getSensors from './../../common/getSensors';
import {AIRLY_KEY} from './../../constants'
class MapOverlay extends React.Component {
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

    componentWillUpdate(nextProps) {
        if (nextProps.pointA && nextProps.pointB) {
            let latmin = nextProps.pointA.lat;
            let lngmin = nextProps.pointA.lng;
            let latmax = nextProps.pointB.lat;
            let lngmax = nextProps.pointB.lng;
            let sensors = getSensors(latmin, lngmin, latmax, lngmax, {AIRLY_KEY});
            console.log('SENSORS', sensors);
            if (sensors) {
                this.props.setSensors(sensors);
            }
        }
    }

    render() {
        console.log('props', this.props)
        return (
            <div className={'map-overlay'}>
                <PointButton onClick={this.onStartClick} text="A"/>
                <PointButton onClick={this.onEndClick} text="B"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isSettingPointAEnabled: state.map.isSettingPointAEnabled,
        isSettingPointBEnabled: state.map.isSettingPointBEnabled,
        pointA: state.map.pointA,
        pointB: state.map.pointB
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
        setSensors: (sensors) => {
            dispatch({
                type: SET_SENSORS,
                payload: {
                    sensors
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapOverlay)