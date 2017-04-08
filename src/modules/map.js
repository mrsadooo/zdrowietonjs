import {createAction, handleActions} from 'redux-actions'
import _ from 'lodash'
export const SETTING_A_POINT = 'SETTING_A_POINT'
export const SETTING_B_POINT = 'SETTING_B_POINT'

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
    }
    return defaultState;
}
export default  reducer;