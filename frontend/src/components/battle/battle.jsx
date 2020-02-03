import React from 'react';
import { withRouter } from 'react-router-dom';
import Player from './player';
import Enemy from './enemy';
import './battle.css';
import Handcontainer from '../hand/hand_container';


class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enemyHP: this.props.enemy ? this.props.enemy.hp : 100,
      player: this.props.player,
      deck: this.props.deck,
      enengy: 4,
      playerShield: 0,
      hand: []
    };
    this.strike = this.strike.bind(this);
    this.bash = this.bash.bind(this);
    this.defend = this.defend.bind(this);
    this.barrier = this.barrier.bind(this);
    this.costEnengy = this.costEnengy.bind(this);
  }

  componentWillMount() {
    this.props.fetchSmallBoss()
      .then(
      () => {
        this.setState({ enemyHP: this.props.enemy.hp });
      }
    )
  }

  componentDidUpdate(prevProps) {
    if (this.state.enemyHP < 0) {
      this.props.handleCloseModal();
    }
  }

  strike() {
    this.setState({ enemyHP: this.state.enemyHP - 6 });
    this.costEnengy(1);
  }

  bash() {
    this.setState({ enemyHP: this.state.enemyHP - 14 });
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

  render() {    
    const { player, enemy, deck } = this.props;
    console.log(this.state);
    
    
    return (
      <div className="battle">
        <Player player={player} shield={this.state.playerShield} />
        <Enemy enemy={enemy} currentHp={this.state.enemyHP} />
        <Handcontainer
          deck={deck}
          player={player}
          shield={this.state.playerShield}
          enemy={enemy}
          enengy={this.state.enengy}
          strike={this.strike}
          bash={this.bash}
          defend={this.defend}
          barrier={this.barrier}
        />
      </div>
    );
  }
}

export default withRouter(Battle);