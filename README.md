# Terminate the Tower
[Link to live demo](https://terminate-the-tower.herokuapp.com/#/)

## Technologies & Challenges
### Backend: MongoDB, Express, Node
Terminate the Tower store all necessary data such as uses info, cards detail, all different type of enemies and maps data in MongoDB. Since there is no strong relationship between each data, use a NoSQL database like MongoDB is a great practice. Express in charge of communicating between database and frontend.

### Frontend: React, Redux and Canvas
Increase code reuse across components is essential to achieving a rapid development cycle and a codebase that is more easily maintained and add features.

In order to generate different maps at each new game. We implement an algorithm to set up the structure of the map base on difficulty and use Canvas to render the map.
![map_1](https://github.com/ZiluoH/kill-the-tower/blob/master/frontend/src/assets/map_1.png)

![map_2](https://github.com/ZiluoH/kill-the-tower/blob/master/frontend/src/assets/map_2.png)

### Data Structure: Polytree
To efficiently keep track of user's current position while making sure user's next move are validated throughout the game, we implemented a polytree data structure for the map. Each icon / position is represented by a node, and within each node stores an array of position that the current node has immediate access to. 

```Javascript 
// Node.js
export default class Node {
    constructor(content) {
        this.next = [];
        this.content = content;
    }

    connect(node) {
        this.next.push(node);
    }
    ...
  
// map.jsx
let start = new Node("start");
let levelOne = Array(2).fill(0).map(el => (new Node(randomStuff(levelOneContent))));
...
start.connectToManyUpper(levelOne);

```

### Group Members & Work Breakdown
**Richard Huang** - team lead

**Kyle Sun** - backend lead

**Kyle Godby** - frontend lead


