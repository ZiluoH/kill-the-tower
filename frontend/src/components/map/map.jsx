import React from 'react';
import Node from "./node";

import "./map.css";

import elite from "./Assets/brute.svg";
import monster from "./Assets/gooey-daemon.svg";
import boss from "./Assets/tower-flag.svg";
import camp from "./Assets/campfire.svg";
import start from "./Assets/medieval-gate.svg";
import chest from "./Assets/locked-chest.svg";

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.levelThreeContent = ["monster", "elite", "camp", "chest"];
        this.levelTwoContent = ["monster", "elite", "chest"];
        this.levelOneContent = ["monster", "monster"];
        this.start = new Node("start");
        this.levelOne = Array(2).fill(0).map(el => (new Node(this.randomStuff(this.levelOneContent))));
        this.levelTwo = Array(3).fill(0).map(el => (new Node(this.randomStuff(this.levelTwoContent))));
        this.levelThree = Array(4).fill(0).map(el => (new Node(this.randomStuff(this.levelThreeContent))));
        this.boss = new Node("boss");

        this.boss.connectToManyLower(this.levelThree);
        this.levelTwo[0].connectToManyUpper(this.levelThree.slice(0,2));
        this.levelTwo[2].connectToManyUpper(this.levelThree.slice(2));
        this.levelThree[2].connectToManyLower(this.levelTwo.slice(1,2));
        this.levelOne[0].connectToManyUpper(this.levelTwo.slice(0,2));
        this.levelOne[1].connect(this.levelTwo[2]);
        this.start.connectToManyUpper(this.levelOne)
        // console.dir(this.start)
        console.dir(this.levelThree)
        this.state = {
            currentNode: this.start,
            hp: 100,
            deck: this.props.deck,
            moved: false
        }
    }

    componentDidMount(){
        const c = document.getElementById("canvas");
        const ctx = c.getContext("2d");
        this.drawRoutes(ctx);

        if (!this.props.deck){
            this.props.fetchStarterCards()
            .then(
                () => this.setState({ deck: this.props.cards})
            );
        }
        
        setTimeout(() => console.dir(this.state), 1000)
    }

    drawRoutes(ctx){
        this.drawLine(ctx, [700, 800], [500, 700]);
        this.drawLine(ctx, [750, 800], [950, 700]);

        this.drawLine(ctx, [480, 640], [375, 500]);
        this.drawLine(ctx, [500, 640], [700, 500]);
        this.drawLine(ctx, [950, 640], [1050, 500]);

        this.drawLine(ctx, [360, 440], [300, 300]);
        this.drawLine(ctx, [370, 440], [575, 300]);
        this.drawLine(ctx, [725, 440], [850, 300]);
        this.drawLine(ctx, [1050, 440], [875, 300]);
        this.drawLine(ctx, [1075, 440], [1150, 300]);

        this.drawLine(ctx, [300, 240], [700, 125]);
        this.drawLine(ctx, [590, 240], [725, 125]);
        this.drawLine(ctx, [850, 240], [735, 125]);
        this.drawLine(ctx, [1135, 240], [750, 125]);
    }

    drawLine(ctx, pos1, pos2){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.moveTo(...pos1);
        const rand1 = Math.floor(Math.random() * 25 + 25) * (Math.random() < 0.5 ? -1 : 1)
        const rand2 = Math.floor(Math.random() * 25 + 25) * (Math.random() < 0.5 ? -1 : 1)
        const cp1 = [(pos1[0] + pos2[0]) / 2 + rand1, (pos1[1] + pos2[1]) / 2 + rand2];
        const cp2 = [(pos1[0] + pos2[0]) / 2 + rand2, (pos1[1] + pos2[1]) / 2 + rand1];
        ctx.bezierCurveTo(...cp1,...cp2,...pos2);
        ctx.stroke();
    }

    randomStuff = (arr) => {
        let randIdx = Math.floor(Math.random() * arr.length)
        return arr.splice(randIdx, 1)[0];
    }

    genLevelOne(){
        return this.levelOne.map((node) => {
            return this.renderIcon(node);
        })
    }

    genLevelTwo(){
        return this.levelTwo.map((node) => {
            return this.renderIcon(node);
        })
    }

    genLevelThree(){
        return this.levelThree.map((node) => {
            return this.renderIcon(node);
        })
    }

    openChest(){
        let actions = ["elite", "monster", "camp"];
        return actions[Math.floor(Math.random() * actions.length)]
    }

    restAtCamp(){
        this.setState({hp: this.state.hp + 20, moved: true});
        setTimeout(() => console.log("hp: " + this.state.hp), 1000)
    }

    move(node) {
        if (this.state.currentNode.next.includes(node)){
            this.setState({currentNode: node});
            this.trigger(node.content)
        } else {
            console.log("invalid move");
        }
    }

    trigger(action){
        switch (action){
            case "camp":
                console.log(action);
                this.restAtCamp();
                break;
            case "chest":
                console.log(action);
                this.trigger(this.openChest());
                break;
            case "elite":
                console.log(action);
                break;
            //     this.setState({moved: true});
            //     return <Redirect to="#" ><Battle hp={this.state.hp} deck={this.state.deck} type="elite"></Battle></Redirect>
            case "monster":
                console.log(action);
                break;
            //     this.setState({moved: true});
            //     return <Redirect to="#" ><Battle hp={this.state.hp} deck={this.state.deck} monster="monster"></Battle></Redirect>
            case "boss":
                console.log(action);
                break;
            //     this.setState({ moved: true });
            //     return <Redirect to="#" ><Battle hp={this.state.hp} deck={this.state.deck} boss="boss"></Battle></Redirect>
        }
    }

    renderIcon(node){
        switch (node.content){
            case "chest":
                return <img 
                    src={chest} 
                    className={`chest icon`}
                    onClick={() => this.move(node)} />;
            case "monster":
                return <img 
                    src={monster} 
                    className={`monster icon`} 
                    onClick={() => this.move(node)} />;
            case "camp":
                return <img 
                    src={camp} 
                    className={`camp icon`} 
                    onClick={() => this.move(node)} />;
            case "elite":
                return <img 
                    src={elite} 
                    className={`elite icon`} 
                    onClick={() => this.move(node)} />;
        }
    }

    render() {
        return (
            <div>
                <h1>Map</h1>
                <div className="map-frame">
                    <ul className="level-one level">
                        {this.genLevelOne().map((el, idx) => (<li key={idx}>{el}</li>))}
                    </ul>

                    <ul className="level-two level">
                        {this.genLevelTwo().map((el, idx) => (<li key={idx}>{el}</li>))}
                    </ul>

                    <ul className="level-three level">
                        {this.genLevelThree().map((el, idx) => (<li key={idx}>{el}</li>))}
                    </ul>

                    <img src={boss} className="boss icon" onClick={() => this.move(this.boss)}/>
                    <img src={start} className="start icon" />
                <canvas id="canvas" width="1400px" height="900px">
                </canvas>
                </div>
            </div>
        )
    }
}
