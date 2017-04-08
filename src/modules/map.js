import {createAction, handleActions} from 'redux-actions'

export const SETTING_A_POINT = 'SETTING_A_POINT'
export const SETTING_B_POINT = 'SETTING_B_POINT'

const defaultState = {
    pointA: null,
    pointB: null,
    isSettingPointAEnabled: false,
    isSettingPointBEnabled: false
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SETTING_A_POINT:
            console.log('A')
            return Object.assign(state, {
                isSettingPointAEnabled: true
            })
            break;
        case SETTING_B_POINT:
            return Object.assign(state, {
                isSettingPointBEnabled: true
            })
            break;
    }
    return defaultState;
}
export default  reducer;