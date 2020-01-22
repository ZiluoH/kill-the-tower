import { RECEIVE_SMALL_BOSS, RECEIVE_ELITE_BOSS, RECEIVE_FINAL_BOSS } from '../actions/enemy_actions';

const EnemiesReducer = (state = {}, action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_SMALL_BOSS:
            // newState.small = action.enemy.data;
            // return newState;
            return action.enemy.data;
        case RECEIVE_ELITE_BOSS:
            // newState.elite = action.enemy.data;
            // return newState;
            return action.enemy.data;
        case RECEIVE_FINAL_BOSS:
            // newState.final = action.enemy.data;
            // return newState;
            return action.enemy.data;
        default:
            return state;
    }
};

export default EnemiesReducer;
