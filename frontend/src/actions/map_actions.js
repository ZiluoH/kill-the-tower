import * as MapUtil from '../util/map_util';

export const RECEIVE_ALL_MAPS = "RECEIVE_ALL_MAPS";
export const RECEIVE_MAP = "RECEIVE_MAP";
export const REMOVE_MAP = "REMOVE_MAP";

const receiveAllMaps = maps => ({
    type: RECEIVE_ALL_MAPS,
    maps
});

const receiveMap = map => ({
    type: RECEIVE_MAP,
    map
});

// const removeMap = id => ({
//     type: REMOVE_MAP,
//     id
// })

export const fetchAllMaps = () => dispatch => (
    MapUtil.getAllMaps()
        .then(maps => dispatch(receiveAllMaps(maps)))
        .catch(err => console.log(err))
);

export const fetchMap = (id) => dispatch => (
    MapUtil.getMap(id)
        .then(map => dispatch(receiveMap(map)))
        .catch(err => console.log(err))
);

export const createMap = (formData) => dispatch => (
    MapUtil.createMap(formData)
        .then(map => dispatch(fetchAllMaps()))
        .catch(err => console.log(err))
);

export const updateMap = (formData) => dispatch => (
    MapUtil.updateMap(formData)
        .then(map => dispatch(fetchAllMaps()))
        .catch(err => console.log(err))
);

export const deleteMap = (id) => dispatch => (
    MapUtil.deleteMap(id)
        .then(map => dispatch(fetchAllMaps()))
        .catch(err => console.log(err))
);
