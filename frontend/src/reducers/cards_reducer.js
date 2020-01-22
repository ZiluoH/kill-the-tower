import { RECEIVE_STARTER_CARDS, RECEIVE_COMMON_CARDS, RECEIVE_RARE_CARDS } from '../actions/card_actions';

const CardsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_STARTER_CARDS:
            newState.starter = action.cards.data;
            return newState;
        case RECEIVE_COMMON_CARDS:
            newState.common = action.cards.data;
            return newState;
        case RECEIVE_RARE_CARDS:
            newState.rare = action.cards.data;
            return newState;
        default:
            return state;
    }
};

export default CardsReducer;
