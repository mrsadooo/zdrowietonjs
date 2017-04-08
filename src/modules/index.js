import {combineReducers} from 'redux';
import MapReducer from './../modules/map'

export default combineReducers({
    map: MapReducer
});
// export default state => state;
