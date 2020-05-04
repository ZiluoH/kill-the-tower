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
            win: false
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
                c.width = Math.max(window.innerWidth, 1024);
                c.height = window.innerHeight;
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
        let w = Math.max(window.innerWidth, 1024);
        let h = window.innerHeight;

        this.drawLine(ctx, [0.48 * w, h - 90], [0.34 * w, 0.73 * h ]);
        this.drawLine(ctx, [0.52 * w, h - 90], [0.67 * w, 0.73 * h ]);

        this.drawLine(ctx, [0.33 * w, 0.68 * h], [0.26 * w, 0.56 * h]);
        this.drawLine(ctx, [0.36 * w, 0.68 * h], [0.5 * w, 0.56 * h]);
        this.drawLine(ctx, [0.69 * w, 0.68 * h], [0.76 * w, 0.56 * h]);

        this.drawLine(ctx, [0.25 * w, 0.51 * h], [0.21 * w, 0.34 * h]);
        this.drawLine(ctx, [0.28 * w, 0.51 * h], [0.4 * w, 0.34 * h]);
        this.drawLine(ctx, [0.53 * w, 0.51 * h], [0.6 * w, 0.34 * h]);
        this.drawLine(ctx, [0.75 * w, 0.51 * h], [0.63 * w, 0.34 * h]);
        this.drawLine(ctx, [0.78 * w, 0.51 * h], [0.81 * w, 0.34 * h]);

        this.drawLine(ctx, [0.22 * w, 0.27 * h], [0.48 * w, 100]);
        this.drawLine(ctx, [0.41 * w, 0.27 * h], [0.49 * w, 105]);
        this.drawLine(ctx, [0.61 * w, 0.27 * h], [0.51 * w, 105]);
        this.drawLine(ctx, [0.81 * w, 0.27 * h], [0.52 * w, 100]);

        setTimeout(() => ctx.drawImage(this.refs.circle, 0.46 * w, h - 135, 100, 100), 1000)
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

    // genLevel(lv) {
    //     if (this.state.map) {
    //         return this.state.map[lv].map((node) => {
    //             return this.renderIcon(node);
    //         })
    //     } else {
    //         return [];
    //     }
    // }

    openChest(){
        let actions = ["monster", "camp"];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    restAtCamp(){
        let heal = 20;
        this.setState({hp: Math.min(this.state.hp + heal, this.state.maxHP), moved: true});
    }

    move(node, e) {
        if (this.state.currentNode.next.includes(node)){
            this.setState({ errorMessage: "" })
            this.drawCircle(e);
            this.setState({ currentNode: node });
            this.trigger(node.content)
        } else {
            this.setState({ errorMessage: "Invalid Move!" });
        }
    }

    trigger(action){
        switch (action){
            case "camp":
                this.handleOpenModal("showCamp");
                break;
            case "chest":
                this.handleOpenModal("showChest");
                break;
            case "elite":
                this.handleOpenModal("showModal");
                break;
            case "monster":
                this.handleOpenModal("showModal");
                break;
            case "boss":
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
                    onClick={(e) => {
                        // console.dir(e.target)
                        this.move(node, e)}
                    } />;
            case "monster":
                return <img 
                    src={monster} 
                    alt="monster"
                    className={`monster icon`} 
                    onClick={(e) => {
                        // console.dir(e.target)
                        this.move(node, e)} }/>;
            case "camp":
                return <img 
                    src={camp} 
                    alt="camp"
                    className={`camp icon`} 
                    onClick={(e) => {
                        // console.dir(e.target)
                        this.move(node, e)} }
                        />;
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
                <button className="btn map-btn" onClick={() => this.props.history.push("/")}>Back to Title</button>
                    <ul className="level-one level">
                        {this.genLevelOne().map((el, idx) => (<li key={idx}>{el}</li>))}
                    </ul>

                    <ul className="level-two level">
                        {this.genLevelTwo().map((el, idx) => (<li key={idx}>{el}</li>))}
                    </ul>

                    <ul className="level-three level">
                        {this.genLevelThree().map((el, idx) => (<li key={idx}>{el}</li>))}
                    </ul>

                    <img src={boss} alt="boss" className="boss icon level-top level" onClick={(e) => this.move(this.state.map.boss, e)}/>
                    <img src={start} alt="start" className="start icon level-start level" />
                    <canvas id="canvas"></canvas>
                    <img src={circle} alt="" ref="circle" id="circle" className="hidden"/>
                    <div className="game-instruction">
                        <p>Pick your own route</p>
                        <p>Use either attack or denfend card</p>
                        <p>Stay alive and defeat the final boss</p>
                    </div>
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
