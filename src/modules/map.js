import {createAction, handleActions} from 'redux-actions'
import _ from 'lodash'
export const SETTING_A_POINT = 'SETTING_A_POINT'
export const SETTING_B_POINT = 'SETTING_B_POINT'
export const SET_POINT_A = 'SET_POINT_A'
export const SET_POINT_B = 'SET_POINT_B'
export const SET_SENSORS = 'SET_SENSORS'
export const SET_DEBUG_MODE = 'SET_DEBUG_MODE'

const defaultState = {
    pointA: null,
    pointB: null,
    sensors: [],
    isSettingPointAEnabled: false,
    isSettingPointBEnabled: false,
    isDebug: false
}

const reducer = (state = defaultState, action) => {
    let clonedObject = _.cloneDeep(state);
    switch (action.type) {
        case SETTING_A_POINT:
            return _.extend(clonedObject, {
                isSettingPointAEnabled: true,
                pointA: null,
                pointB: null,
                sensors: []
            })
            break;
        case SETTING_B_POINT:
            return Object.assign(clonedObject, {
                isSettingPointBEnabled: true,
                pointB: null,
                sensors: []
            })
            break;
        case SET_POINT_A:
            return Object.assign(clonedObject, {
                isSettingPointAEnabled: false,
                pointA: {
                    lat: action.payload.lat,// use data from action
                    lng: action.payload.lng, // use data from action
                    title: 'My position',
                    icon: 'user_point'
                }
            })
            break;
        case SET_POINT_B:
            return Object.assign(clonedObject, {
                isSettingPointBEnabled: false,
                pointB: {
                    lat: action.payload.lat,// use data from action
                    lng: action.payload.lng, // use data from action
                    title: 'END position',
                    icon: 'end_point'
                }
            })
            break;
        case SET_SENSORS:
            return Object.assign(clonedObject, {
                "sensors": action.payload.sensors
            })
            break;
        case SET_DEBUG_MODE:
            return Object.assign(clonedObject, {
                "debug": action.payload
            })
            break;
    }
    return defaultState;
}

export default  reducer;