import axios from 'axios';

export const getStareterCards = () => {
    return axios.get(`/api/cards/starter`)
};

export const getOtherCards = (type) => {
    return axios.get('/api/cards/', type)
}
