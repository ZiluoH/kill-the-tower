import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';


import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

// test start
import { fetchStarterCards, fetchOtherCards } from "./actions/card_actions"
import { getStareterCards, getOtherCards } from "./util/card_util"
// test end

document.addEventListener('DOMContentLoaded', () => {

    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } 
    };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = '/login';
        }

    } else {
        store = configureStore({});
    }

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);

    // test start
    window.store = store;
    window.fetchStarterCards = fetchStarterCards;
    window.fetchOtherCards = fetchOtherCards;
    window.getStareterCards = getStareterCards;
    window.getOtherCards = getOtherCards;
    // test end
});