import React from 'react';
import Node from "./node";
import { toCanvasX, toCanvasY } from "../../util/other_util";
import "./map.css";

import elite from "./Assets/brute.svg";
import monster from "./Assets/gooey-daemon.svg";
import boss from "./Assets/tower-flag.svg";
import camp from "./Assets/campfire.svg";
import start from "./Assets/medieval-gate.svg";
import chest from "./Assets/locked-chest.svg";
import circle from "./Assets/enso_red.png";

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentNode: null,
            hp: this.props.hp || 100,
            deck: this.props.deck,
            moved: false
        }
        this.drawCircle = this.drawCircle.bind(this);
    }

    componentDidMount(){

        this.props.fetchMap(this.props.match.params.id).then(
            () => {
                const c = document.getElementById("canvas");
                const ctx = c.getContext("2d");
                this.drawRoutes(ctx);

                if (!this.props.deck) {
                    this.props.fetchStarterCards()
                        .then(
                            () => this.setState({ deck: this.props.cards })
                        );
                }
                setTimeout(() => this.setState({ currentNode: this.props.start }), 500);
                document.addEventListener("click", (e) => this.drawCircle(c, ctx, e))

        })
    }

    drawCircle(e) {
        if (e.target){
            if (Array.from(e.target.classList).includes("icon")){
                const c = document.getElementById("canvas");
                const ctx = c.getContext("2d");
                const x = toCanvasX(c, e) - 50;
                const y = toCanvasY(c, e) - 50;
                ctx.drawImage(this.refs.circle, x, y, 100, 100)
            }
        }
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

        setTimeout(() => ctx.drawImage(this.refs.circle, 675, 775, 100, 100), 1000)
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

    genLevelOne(){
        if (this.props.levelOne){
            return this.props.levelOne.map((node) => {
                return this.renderIcon(node);
            })
        } else {
            return [];
        }
    }

    genLevelTwo(){
        if (this.props.levelTwo) {
            return this.props.levelTwo.map((node) => {
                return this.renderIcon(node);
            })
        } else {
            return [];
        }
    }

    genLevelThree(){
        if (this.props.levelThree) {
            return this.props.levelThree.map((node) => {
                return this.renderIcon(node);
            })
        } else {
            return [];
        }
    }

    openChest(){
        let actions = ["elite", "monster", "camp"];
        return actions[Math.floor(Math.random() * actions.length)]
    }

    restAtCamp(){
        this.setState({hp: this.state.hp + 20, moved: true});
        setTimeout(() => console.log("hp: " + this.state.hp), 1000)
    }

    move(node, e) {
        if (this.state.currentNode.next.includes(node)){
            this.drawCircle(e);
            this.setState({currentNode: node});
            this.trigger(node.content)
        } else {
            console.dir(this.state.currentNode)
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
                    alt="chest"
                    className={`chest icon`}
                    onClick={(e) => this.move(node, e)} />;
            case "monster":
                return <img 
                    src={monster} 
                    alt="monster"
                    className={`monster icon`} 
                    onClick={(e) => this.move(node, e)} />;
            case "camp":
                return <img 
                    src={camp} 
                    alt="camp"
                    className={`camp icon`} 
                    onClick={(e) => this.move(node, e)} />;
            case "elite":
                return <img 
                    src={elite} 
                    alt="elite"
                    className={`elite icon`} 
                    onClick={(e) => this.move(node, e)} />;
        }
    }

    render() {
        if (!this.props.start) {
            return null;
        } else {
        return (
            <div>
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

                    <img src={boss} className="boss icon" onClick={(e) => this.move(this.props.boss, e)}/>
                    <img src={start} className="start icon" />
                <canvas id="canvas" width="1400px" height="900px">
                </canvas>
                <img src={circle} ref="circle" id="circle" className="hidden"/>
                </div>
            </div>
        )
        }
    }
}
