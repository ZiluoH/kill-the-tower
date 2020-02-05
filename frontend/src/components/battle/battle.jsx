import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import Player from './player';
import Enemy from './enemy';
import './battle.css';
import Hand from '../hand/hand';
import Gameover from "./gameover";



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
    this.props.fetchSmallBoss()
      .then(
      () => {
        this.setState({ enemyHP: this.props.enemy.hp,
                        enemyShield: this.props.enemy.defend });
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (this.state.enemyHP <= 0) {
      this.props.handleCloseModal("showModal");
      this.props.updatePlayer({hp: this.state.player});
    }
    
  }

  strike() {
    this.setState({
                    enemyHP: this.state.enemyShield > 6 ? this.state.enemyHP : this.state.enemyHP + this.state.enemyShield - 6,
                    enemyShield: this.state.enemyShield > 6 ? this.state.enemyShield - 6 : 0});
    this.costEnengy(1);
  }

  bash() {
    this.setState({
                    enemyHP: this.state.enemyShield > 14 ? this.state.enemyHP : this.state.enemyHP + this.state.enemyShield - 14,
                    enemyShield: this.state.enemyShield > 14 ? this.state.enemyShield - 14 : 0
    });
    this.costEnengy(2);
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
    this.setState({
      player: this.state.player < (this.state.player + this.state.playerShield - this.props.enemy.attack) ? this.state.player : (this.state.player + this.state.playerShield - this.props.enemy.attack),
      playerShield: 0,
      enemyShield: this.props.enemy.defend,
      enengy: 4
    });
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