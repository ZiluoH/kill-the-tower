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
      enemyHP: this.props.enemy.hp,
      player: this.props.player,
      deck: this.props.deck,
      enengy: 4,
      playerShield: 0,
      hand:[]
    };
    this.strike = this.strike.bind(this);
    this.costEnengy = this.costEnengy.bind(this);
  }

  componentWillMount() {}

  componentDidUpdate(prevProps) {
      if (this.state.enemyHP < 0){
        this.props.handleCloseModal();
      }
  }

  strike() {
    this.setState({ enemyHP: this.state.enemyHP - 6 });
    this.costEnengy(1);
  }

  Defend(){
    this.setState({playerShield: this.state.playerShield + 5});
    this.costEnengy(1)
  }

  costEnengy(cost){
    this.setState({enengy: this.state.enengy - cost});
  }

  render() {
    setTimeout(() => console.dir(this.state), 500);
    const { player, enemy, deck } = this.props;    
    
    return (
      <div className="battle">
        <Player player={player} />
        <Enemy enemy={enemy} currentHp={this.state.enemyHP} />
        <Handcontainer
          deck={deck}
          player={player}
          enemy={enemy}
          enengy={this.state.enengy}
          strike={this.strike}
        />
      </div>
    );
  }
}

export default withRouter(Battle);