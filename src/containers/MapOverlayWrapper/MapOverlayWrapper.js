import React from 'react'
import {connect} from 'react-redux'
import {SETTING_A_POINT, SETTING_B_POINT, SET_SENSORS, SET_DEBUG_MODE} from './../../modules/map'
import PointButton from './../../components/pointButton';
import Toggle from './../../components/toggle'
import getSensors from './../../common/getSensors';
import { AIRLY_KEY } from './../../constants';
import Icon from '../../components/icon';
import StartIcon from '../../resources/icons/start-point.svg';
import EndIcon from '../../resources/icons/end-point.svg';

class MapOverlay extends React.Component {
    constructor() {
        super()
        this.onStartClick = this.onStartClick.bind(this);
        this.onEndClick = this.onEndClick.bind(this);
        this.onDebugClick = this.onDebugClick.bind(this);
    }

    onStartClick() {
        const {enableSettingPointA} = this.props;
        enableSettingPointA();
    }

    onEndClick() {
        const {enableSettingPointB} = this.props;
        enableSettingPointB();
    }

    onDebugClick() {
        this.props.setDebugMode(!this.props.debug)
    }

    componentWillUpdate(nextProps) {
        if (((this.props.debug !== nextProps.debug) || (!this.props.pointA && nextProps.pointA) || (!this.props.pointB && nextProps.pointB)) && nextProps.pointA && nextProps.pointB) {

            let latmin = nextProps.pointA.lat;
            let lngmin = nextProps.pointA.lng;
            let latmax = nextProps.pointB.lat;
            let lngmax = nextProps.pointB.lng;
            let debug = nextProps.debug
            getSensors(latmin, lngmin, latmax, lngmax, {apiKey: AIRLY_KEY}, debug).then((sensors) => {
                console.log('SENSORS',sensors)
                if (sensors) {
                    this.props.setSensors(sensors);
                }
            }).catch(() => {
                return;
            });
        }
    }

    render() {
        return (
            <div className={'map-overlay'}>
                <PointButton onClick={this.onStartClick} >
                    <Icon icon={StartIcon} className="btn-icon" />
                </PointButton>
                <PointButton onClick={this.onEndClick} >
                    <Icon icon={EndIcon} className ="btn-icon" />
                </PointButton>
                <Toggle onClick={this.onDebugClick}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isSettingPointAEnabled: state.map.isSettingPointAEnabled,
        isSettingPointBEnabled: state.map.isSettingPointBEnabled,
        pointA: state.map.pointA,
        pointB: state.map.pointB,
        debug: state.map.debug
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
        },
        setDebugMode: (value) => {
            dispatch({
                type: SET_DEBUG_MODE,
                payload: value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapOverlay)