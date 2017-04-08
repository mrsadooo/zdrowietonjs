import {createAction, handleActions} from 'redux-actions'

export const SETTING_A_POINT = createAction('SETTING_A_POINT')
export const SETTING_B_POINT = createAction('SETTING_B_POINT')

const defaultState = {
    pointA: null,
    pointB: null,
    isSettingPointAEnabled: false,
    isSettingPointBEnabled: false
}

const reducer = handleActions({
    [SETTING_A_POINT.type]: (state, {type, payload}) => {
        return state;
    },
    [SETTING_B_POINT.type]: (state, {type, payload}) => {
        return state;
    }
}, defaultState)

export default  reducer;