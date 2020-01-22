import { RECEIVE_ALL_MAPS, RECEIVE_MAP } from '../actions/map_actions';

const MapsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_MAPS:
            return action.maps.data;
        case RECEIVE_MAP:
            let id = Object.keys(action.maps.data)[0];
            newState.maps[id] = action.maps.data[id];
            return newState;
        default:
            return state;
    }
};

export default MapsReducer;
