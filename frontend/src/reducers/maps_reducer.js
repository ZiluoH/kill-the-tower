import { RECEIVE_ALL_MAPS, RECEIVE_MAP, REMOVE_MAP } from '../actions/map_actions';

const MapsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_MAPS:
            return action.maps.data;
        case RECEIVE_MAP:
            return [action.map.data];
        case REMOVE_MAP:
            delete newState.maps[action.maps.id];
            return newState;
        default:
            return state;
    }
};

export default MapsReducer;
