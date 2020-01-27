import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';


import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

// test start
// import { fetchStarterCards, fetchCommonCards, fetchRareCards } from "./actions/card_actions"
// import { fetchAllMaps, fetchMap, createMap, updateMap, deleteMap } from "./actions/map_actions";
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
    // window.store = store;
    // // window.fetchStarterCards = fetchStarterCards;
    // // window.fetchCommonCards = fetchCommonCards;
    // // window.fetchRareCards = fetchRareCards;
    // window.fetchAllMaps = fetchAllMaps;
    // window.createMap = createMap;
    // window.updateMap = updateMap;
    // window.deleteMap = deleteMap;

    // test end
});