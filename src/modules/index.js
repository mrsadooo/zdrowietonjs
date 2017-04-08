// import combineReducers from '../store/combineReducers'; // to use with immutable state
import {combineReducers} from 'redux';
import MapReducer from './../modules/map'

export default combineReducers({
    map: MapReducer
});
// export default state => state;