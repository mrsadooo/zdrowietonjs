import {createAction, handleActions} from 'redux-actions'
import _ from 'lodash'
export const SETTING_A_POINT = 'SETTING_A_POINT'
export const SETTING_B_POINT = 'SETTING_B_POINT'
export const SET_POINT_A = 'SET_POINT_A'
export const SET_POINT_B = 'SET_POINT_B'

const defaultState = {
    pointA: null,
    pointB: null,
    isSettingPointAEnabled: false,
    isSettingPointBEnabled: false
}

const reducer = (state = defaultState, action) => {
    let clonedObject = _.cloneDeep(state);
    switch (action.type) {
        case SETTING_A_POINT:
            return _.extend(clonedObject, {
                isSettingPointAEnabled: true
            })
            break;
        case SETTING_B_POINT:
            return Object.assign(clonedObject, {
                isSettingPointBEnabled: true
            })
            break;
        case SET_POINT_A:
            return Object.assign(clonedObject, {
                isSettingPointAEnabled: false,
                pointA: {
                    lat: 1,// use data from action
                    lng: 2 // use data from action
                }
            })
            break;
        case SET_POINT_B:
            return Object.assign(clonedObject, {
                isSettingPointBEnabled: false,
                pointB: {
                    lat: 1,// use data from action
                    lng: 2 // use data from action
                }
            })
            break;
    }
    return defaultState;
}

export default  reducer;