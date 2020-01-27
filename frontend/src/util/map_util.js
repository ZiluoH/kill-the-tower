import axios from 'axios';

export const getAllMaps = () => {
    return axios.get('/api/maps')
};

export const getMap = id => {
    return axios.get(`/api/maps/${id}`)
};

export const createMap = formData => {
    return axios.post(`/api/maps/`, formData)
};

export const updateMap = formData => {
    return axios.patch(`/api/maps/${formData.id}`, formData)
};

export const deleteMap = id => {
    return axios.delete(`/api/maps/${id}`)
}