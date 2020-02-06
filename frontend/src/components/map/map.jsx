import React from 'react';
import { toCanvasX, toCanvasY } from "../../util/other_util";
import ReactModal from 'react-modal';
import Chest from "./chest";
import Camp from "./camp";
import Win from "./win";
import "./map.css";

import elite from "../../assets/brute.svg";
import monster from "../../assets/gooey-daemon.svg";
import boss from "../../assets/tower-flag.svg";
import camp from "../../assets/campfire.svg";
import start from "../../assets/medieval-gate.svg";
import chest from "../../assets/locked-chest.svg";
import circle from "../../assets/enso_red.png";

import BattleContainer from '../battle/battle_container';

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentNode: null,
            hp: this.props.hp || 100,
            maxHP: this.props.hp || 100,
            deck: this.props.deck,
            moved: false,
            showModal: false,
            showCamp: false,
            showChest: false,
            errorMessage: "",
            win: true
        };
        this.drawCircle = this.drawCircle.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.restAtCamp = this.restAtCamp.bind(this);
        this.trigger = this.trigger.bind(this);
        this.updatePlayer = this.updatePlayer.bind(this);
        this.isWin = this.isWin.bind(this);
    }

    componentDidMount(){
        ReactModal.setAppElement('body');
        this.props.fetchMap(this.props.match.params.id).then(
            () => {
                this.linkNodes();
                // debugger
                const c = document.getElementById("canvas");
                const ctx = c.getContext("2d");
                this.drawRoutes(ctx);

                if (!this.props.deck) {
                    this.props.fetchStarterCards()
                        .then(
                            () => this.setState({ deck: this.props.cards })
                        );
                }

                setTimeout(() => {
                    if (this.state.map){
                        this.setState({ currentNode: this.state.map.start })
                    }
                }, 500);
                document.addEventListener("click", (e) => this.drawCircle(c, ctx, e))

        })
    }

    linkNodes(){
        if (this.props.map){
            // debugger
            const { start, levelOne, levelTwo, levelThree, boss } = Object.assign({}, this.props.map);
            boss.connectToManyLower(levelThree);
            levelTwo[0].connectToManyUpper(levelThree.slice(0, 2));
            levelTwo[2].connectToManyUpper(levelThree.slice(2));
            levelThree[2].connectToManyLower(levelTwo.slice(1, 2));
            levelOne[0].connectToManyUpper(levelTwo.slice(0, 2));
            levelOne[1].connect(levelTwo[2]);
            start.connectToManyUpper(levelOne);

            this.setState({
                map: {
                    start,
                    levelOne,
                    levelTwo,
                    levelThree,
                    boss
                }
            });
        }
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

    handleOpenModal(stateKey) {
        this.setState({ [stateKey]: true });
    }

    handleCloseModal(stateKey) {
        this.setState({ [stateKey]: false });
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
        if (this.state.map){
            return this.state.map.levelOne.map((node) => {
                return this.renderIcon(node);
            })
        } else {
            return [];
        }
    }

    genLevelTwo(){
        if (this.state.map) {
            return this.state.map.levelTwo.map((node) => {
                return this.renderIcon(node);
            })
        } else {
            return [];
        }
    }

    genLevelThree(){
        if (this.state.map) {
            return this.state.map.levelThree.map((node) => {
                return this.renderIcon(node);
            })
        } else {
            return [];
        }
    }

    openChest(){
        let actions = ["monster", "camp"];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    restAtCamp(){
        let heal = 20;
        this.setState({hp: Math.min(this.state.hp + heal, this.state.maxHP), moved: true});
        setTimeout(() => console.log("hp: " + this.state.hp), 1000)
    }

    move(node, e) {
        if (this.state.currentNode.next.includes(node)){
            this.setState({ errorMessage: "" })
            this.drawCircle(e);
            this.setState({ currentNode: node });
            this.trigger(node.content)
        } else {
            // console.dir(this.state.currentNode)
            // console.log("invalid move");
            this.setState({ errorMessage: "Invalid Move!" });
        }
    }

    trigger(action){
        switch (action){
            case "camp":
                // console.log(action);
                this.handleOpenModal("showCamp");
                // debugger
                break;
            case "chest":
                // console.log(action);
                this.handleOpenModal("showChest");
                break;
            case "elite":
                // console.log(action);
                this.handleOpenModal("showModal");
                break;
            case "monster":
                // console.log(action);
                this.handleOpenModal("showModal");
                break;
            case "boss":
                // console.log(action);
                this.handleOpenModal("showModal");
                break;
            default: 
                return;
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
            default:
                return;
        }
    }

    updatePlayer(data){
        this.setState(data);
    }

    isWin(){
        this.setState({win: true});
    }

    render() {
        return (
            <div className="map-outer-frame">
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

                    <img src={boss} alt="boss" className="boss icon" onClick={(e) => this.move(this.state.map.boss, e)}/>
                    <img src={start} alt="start" className="start icon" />
                    <canvas id="canvas" width="1400px" height="900px"></canvas>
                    <img src={circle} alt="" ref="circle" id="circle" className="hidden"/>
                </div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Battle Modal"
                    className="battle-modal"
                    overlayClassName="battle-modal-overlay"
                >
                    <BattleContainer 
                        handleCloseModal={this.handleCloseModal}
                        enemyType={this.state.currentNode ? this.state.currentNode.content : null}
                        player={this.state.hp}
                        deck={this.state.deck} 
                        updatePlayer={this.updatePlayer}
                        gameOver={this.gameOver}
                        isWin={this.isWin}
                    />
                </ReactModal>
                <ReactModal
                    isOpen={this.state.showChest}
                    contentLabel="Chest Modal"
                    className="message-modal"
                    overlayClassName="message-modal-overlay"
                >
                    <Chest
                        handleCloseModal={this.handleCloseModal}
                        trigger={this.trigger}
                        openChest={this.openChest}
                    />
                </ReactModal>
                <ReactModal
                    isOpen={this.state.showCamp}
                    contentLabel="Camp Modal"
                    className="message-modal"
                    overlayClassName="message-modal-overlay"
                >
                    <Camp
                        handleCloseModal={this.handleCloseModal}
                        restAtCamp={this.restAtCamp}
                    />
                </ReactModal>
                <ReactModal
                    isOpen={this.state.win}
                    contentLabel="Win Modal"
                    className="win-modal"
                    overlayClassName="win-modal-overlay">
                    <Win />
                </ReactModal>
                <div className="map-error-frame">
                    <p className="map-error">{this.state.errorMessage}</p>
                </div>
            </div>
        )
    }
}
