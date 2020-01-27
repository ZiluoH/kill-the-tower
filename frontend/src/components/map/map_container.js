import { connect } from 'react-redux';
import { fetchStarterCards } from '../../actions/card_actions';
import { fetchMap } from "../../actions/map_actions";
import Map from './map';
import Node from "./node";

const mapStateToProps = (state, ownProps) => {
    let translatedMap = {};
    if (state.maps.name){
        translatedMap = translateMap(state.maps);
    }
    return {
        // currentUser: state.session.user
        cards: state.cards.starter,
        start: translatedMap.start,
        levelOne: translatedMap.levelOne,
        levelTwo: translatedMap.levelTwo,
        levelThree: translatedMap.levelThree,
        boss: translatedMap.boss
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStarterCards: () => dispatch(fetchStarterCards()),
        fetchMap: (id) => dispatch(fetchMap(id))
    };
};

const populateContent = (map) => {
    let result = [];
    for (let i = 0; i < map.monster; i++ ){
        result.push("monster");
    }
    for (let i = 0; i < map.elite; i++ ){
        result.push("elite");
    }
    for (let i = 0; i < map.camp; i++ ){
        result.push("camp");
    }
    for (let i = 0; i < map.chest; i++ ){
        result.push("chest");
    }
    return result.sort(() => Math.random() - 0.5);
}

const translateMap = (map) => {
    let content = populateContent(map);

    let levelThreeContent = content.slice(0, 4);
    let levelTwoContent = content.slice(4, 7);
    let levelOneContent = content.slice(7);
    let start = new Node("start");
    let levelOne = Array(2).fill(0).map(el => (new Node(randomStuff(levelOneContent))));
    let levelTwo = Array(3).fill(0).map(el => (new Node(randomStuff(levelTwoContent))));
    let levelThree = Array(4).fill(0).map(el => (new Node(randomStuff(levelThreeContent))));
    let boss = new Node("boss");

    boss.connectToManyLower(levelThree);
    levelTwo[0].connectToManyUpper(levelThree.slice(0, 2));
    levelTwo[2].connectToManyUpper(levelThree.slice(2));
    levelThree[2].connectToManyLower(levelTwo.slice(1, 2));
    levelOne[0].connectToManyUpper(levelTwo.slice(0, 2));
    levelOne[1].connect(levelTwo[2]);
    start.connectToManyUpper(levelOne);

    return {
        start: start,
        levelOne: levelOne,
        levelTwo: levelTwo,
        levelThree: levelThree,
        boss: boss
    }
}

const randomStuff = (arr) => {
    let randIdx = Math.floor(Math.random() * arr.length)
    return arr.splice(randIdx, 1)[0];
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);