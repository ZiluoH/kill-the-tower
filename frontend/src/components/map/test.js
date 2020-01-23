
// import Node from "./node"

// var levelThreeContent = ["monster", "elite", "camp", "chest"];
// var levelTwoContent = ["monster", "elite", "chest"];
// var levelOneCntent = ["monster", "monster"];

// const randomStuff = (arr) => {
//     let randIdx = Math.floor(Math.random() * arr.length)
//     return arr.splice(randIdx,1)[0];
// }

// const manyToOne = (thisLevel, nextNode) => {
//     for (node of thisLevel){
//         node.connect(nextNode);
//     }
// }

// const oneToMany = (thisNode, nextLevel) => {
//     for (node of nextLevel) {
//         thisNode.connect(node);
//     }
// }

// function randToOne(previousNodes, thisNode){
//     previousNodes[0].connect(thisNode);
//     if (Boolean(Math.floor(Math.random()))){
//         previousNodes[1].connect(thisNode);
//     }
// }

// let boss = new Node("boss");
// let levelThree = Array(4).fill(0).map(el => (new Node(randomStuff(levelThreeContent))));
// let levelTwo = Array(3).fill(0).map(el => (new Node(randomStuff(levelTwoContent))));
// let levelOne = Array(2).fill(0).map(el => (new Node(randomStuff(levelOneContent))));
// let start = new Node("start");

// manyToOne(levelThree, boss);

// oneToMany(levelTwo[0], levelThree.slice(0, 2));
// oneToMany(levelTwo[2], levelThree.slice(2));
// manyToOne(levelTwo.slice(1), levelThree[2]);

// oneToMany(levelOne[0], levelTwo.slice(0,2))
// levelOne[1].connect(levelTwo[2]);

// oneToMany(start, levelOne);
