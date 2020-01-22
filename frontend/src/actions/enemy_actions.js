// import { getEnemy } from '../util/enemy_util';

// export const RECEIVE_SMALL_BOSS = "RECEIVE_SMALL_BOSS";
// export const RECEIVE_ELITE_BOSS = "RECEIVE_ELITE_BOSS";
// export const RECEIVE_FINAL_BOSS = "RECEIVE_FINAL_BOSS";

// const receiveSmallBoss = enemy => ({
//     type: RECEIVE_SMALL_BOSS,
//     enemy
// });

// const receiveEliteBoss = enemy => ({
//     type: RECEIVE_ELITE_BOSS,
//     enemy
// });

// const receiveFinalBoss = enemy => ({
//     type: RECEIVE_FINAL_BOSS,
//     enemy
// });


// export const fetchSmallBoss = () => dispatch => (
//     getEnemy("small")
//         .then(enemy => dispatch(receiveSmallBoss(enemy)))
//         .catch(err => console.log(err))
// );

// export const fetchEliteBoss = () => dispatch => (
//     getEnemy("elite")
//         .then(enemy => dispatch(receiveEliteBoss(enemy)))
//         .catch(err => console.log(err))
// );

// export const fetchFinalBoss = () => dispatch => (
//     getEnemy("final")
//         .then(enemy => dispatch(receiveFinalBoss(enemy)))
//         .catch(err => console.log(err))
// );
