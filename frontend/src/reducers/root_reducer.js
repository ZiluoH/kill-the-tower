import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from "./errors_reducer";
import cards from "./cards_reducer";
import enemies from "./enemies_reducer";
import maps from "./maps_reducer";

const RootReducer = combineReducers({
    session,
    errors,
    cards,
    enemies,
    maps
});

export default RootReducer;