import { getStareterCards, getOtherCards } from '../util/card_util';

export const RECEIVE_STARTER_CARDS = "RECEIVE_STARTER_CARDS";
export const RECEIVE_COMMON_CARDS = "RECEIVE_COMMON_CARDS";
export const RECEIVE_RARE_CARDS = "RECEIVE_RARE_CARDS";

export const receiveStarterCards = cards => ({
    type: RECEIVE_STARTER_CARDS,
    cards
});

export const receiveCommonCards = cards => ({
    type: RECEIVE_COMMON_CARDS,
    cards
});

export const receiveRareCards = cards => ({
    type: RECEIVE_RARE_CARDS,
    cards
});


export const fetchStarterCards = () => dispatch => (
    getStareterCards()
        .then(cards => dispatch(receiveStarterCards(cards)))
        .catch(err => console.log(err))
);

export const fetchOtherCards = type => dispatch => (
    getOtherCards(type)
        .then(cards => dispatch(receiveCommonCards(cards)))
        .catch(err => console.log(err))
);
