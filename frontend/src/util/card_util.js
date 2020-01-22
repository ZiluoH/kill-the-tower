import axios from 'axios';

export const getCards = (type) => {
    return axios.get(`/api/cards/${type}`)
};


