import {createAction, handleActions} from 'redux-actions'
import _ from 'lodash'
export const SETTING_A_POINT = 'SETTING_A_POINT'
export const SETTING_B_POINT = 'SETTING_B_POINT'
export const SET_POINT_A = 'SET_POINT_A'
export const SET_POINT_B = 'SET_POINT_B'
export const SET_SENSORS = 'SET_SENSORS'

const defaultState = {
    pointA: null,
    pointB: null,
    sensors: [],
    isSettingPointAEnabled: false,
    isSettingPointBEnabled: false
}

const reducer = (state = defaultState, action) => {
    let clonedObject = _.cloneDeep(state);
    switch (action.type) {
        case SETTING_A_POINT:
            return _.extend(clonedObject, {
                isSettingPointAEnabled: true,
                pointA: null
            })
            break;
        case SETTING_B_POINT:
            return Object.assign(clonedObject, {
                isSettingPointBEnabled: true,
                pointB: null
            })
            break;
        case SET_POINT_A:
            return Object.assign(clonedObject, {
                isSettingPointAEnabled: false,
                pointA: {
                    lat: action.payload.lat,// use data from action
                    lng: action.payload.lng, // use data from action
                    title: 'My position',
                    icon: 'https://maps.google.com/mapfiles/ms/micons/man.png'
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
                    icon: 'https://maps.google.com/mapfiles/ms/micons/flag.png'
                }
            })
            break;
        case SET_SENSORS:
            return Object.assign(clonedObject, {
                "sensors": action.payload.sensors
            })
            break;
    }
    return defaultState;
}

export default  reducer;