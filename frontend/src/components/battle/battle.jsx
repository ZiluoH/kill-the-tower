import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import Player from './player';
import Enemy from './enemy';
import './battle.css';
import Hand from '../hand/hand';
import Gameover from "./gameover";
import { shakeEffect } from "../../util/other_util";

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enemyHP: this.props.enemy ? this.props.enemy.hp : 100,
      player: this.props.player,
      deck: this.props.deck,
      enengy: 4,
      playerShield: 0,
      enemyShield: 0,
      hand: [],
      gameover:false
    };
    this.strike = this.strike.bind(this);
    this.bash = this.bash.bind(this);
    this.defend = this.defend.bind(this);
    this.barrier = this.barrier.bind(this);
    this.costEnengy = this.costEnengy.bind(this);
    this.endTurn = this.endTurn.bind(this);
  }

  componentDidMount() {
    let fetchEnemy
    switch (this.props.enemyType) {
      case "monster":
        fetchEnemy = this.props.fetchSmallBoss;
        break;
      case "elite":
        fetchEnemy = this.props.fetchEliteBoss;
        break;
      case "boss":
        fetchEnemy = this.props.fetchFinalBoss;
        break;
      default:
        fetchEnemy = this.props.fetchSmallBoss;
        break;
    }
    fetchEnemy()
      .then(
      () => {
        this.setState({ enemyHP: this.props.enemy.hp,
                        enemyShield: this.props.enemy.defend });
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (this.state.enemyHP <= 0) {
      if(this.props.enemyType === "boss"){
        this.props.isWin();
      }
      this.props.handleCloseModal("showModal");
      this.props.updatePlayer({hp: this.state.player});
    }
  }

  strike() {
    let damage = 6;
    this.dealDamageToEnemy(damage);
    this.costEnengy(1);
  }

  bash() {
    let damage = 14;
    this.dealDamageToEnemy(damage);
    this.costEnengy(2);
  }

  dealDamageToEnemy(damage){
    let realDamage = Math.max(damage - this.state.enemyShield, 0);
    this.setState({
      enemyHP: this.state.enemyShield > damage ? this.state.enemyHP : this.state.enemyHP + this.state.enemyShield - damage,
      enemyShield: this.state.enemyShield > damage ? this.state.enemyShield - damage : 0
    });
    shakeEffect("img-enemy", realDamage * 5);
  }

  defend() {
    this.setState({ playerShield: this.state.playerShield + 5 });
    this.costEnengy(1);
  }

  barrier() {
    this.setState({ playerShield: this.state.playerShield + 12 });
    this.costEnengy(2);
  }

  costEnengy(cost) {
    this.setState({ enengy: this.state.enengy - cost });
  }

  enemyDoStuff(){
    let realDamage = Math.max(this.props.enemy.attack - this.state.playerShield, 0);
    this.setState({
      player: this.state.player < (this.state.player + this.state.playerShield - this.props.enemy.attack) ? this.state.player : (this.state.player + this.state.playerShield - this.props.enemy.attack),
      playerShield: 0,
      enemyShield: this.props.enemy.defend,
      enengy: 4
    });
    console.log(realDamage)
    shakeEffect("img-player", realDamage * 4)
  }

  endTurn(){
    if (this.state.player + this.state.playerShield - this.props.enemy.attack > 0){
      this.enemyDoStuff();
    } else{
      this.setState({ player:0,
                      gameover: true })
    }
  }

  render() {    
    const { player, enemy, deck } = this.props;
    if(!enemy){
      return null;
    }
    // console.log(this.props);
    
    return (
      <div className="battle">
        <Player player={this.state.player} shield={this.state.playerShield} />
        <Enemy enemy={enemy} currentHp={this.state.enemyHP} enemyShield={this.state.enemyShield}/>
        <Hand
          deck={deck}
          player={player}
          shield={this.state.playerShield}
          enemy={enemy}
          enengy={this.state.enengy}
          strike={this.strike}
          bash={this.bash}
          defend={this.defend}
          barrier={this.barrier}
          endTurn={this.endTurn}
        />
        <ReactModal
          isOpen={this.state.gameover}
          contentLabel="Gameover Modal"
          className="gameover-modal"
          overlayClassName="gameover-modal-overlay"
        >
          <Gameover
            handleCloseModal={this.handleCloseModal}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(Battle);