# Terminate the Tower
[Link to live demo](https://terminate-the-tower.herokuapp.com/#/)

## Overview
Terminate the Tower is a deck-building roguelike game inspired by Slay the Spire. Terminate the Tower is a game in which you climb the Tower. The player will meet different encounters on the randomly generated map and meet the final boss at the end. The levels are procedurally-generated, so each game will be a different experience.

## Functionality & MVP
* Logged in player can create their own map and push to database.
* Play joins a new game with default starter deck.
* Chest will contain random events.
* Play's HP will carry from map to battle.
* Game over once player's died in a battle.


## Technologies & Challenges
### Backend: MongoDB, Express, Node
Terminate the Tower store all necessary data such as uses info, cards detail, all different type of enemies and maps data in MongoDB. Since there is no strong relationship between each data, use a NoSQL database like MongoDB is a great practice. Express in charge of communicating between database and frontend.

### Frontend: React, Redux and Canvas
Increase code reuse across components is essential to achieving a rapid development cycle and a codebase that is more easily maintained and add features.

In order to generate different maps at each new game. We implement an algorithm to set up the structure of the map base on difficulty and use Canvas to render the map.
![map_1](https://github.com/ZiluoH/kill-the-tower/blob/master/frontend/src/assets/map_1.png)

![map_2](https://github.com/ZiluoH/kill-the-tower/blob/master/frontend/src/assets/map_2.png)

### Group Members & Work Breakdown
**Richard Huang** - team lead

**Kyle Sun** - backend lead

**Kyle Godby** - frontend lead


