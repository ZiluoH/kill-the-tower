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
          deck: this.props.deck
        };
    this.Strike = this.Strike.bind(this);
    }

    componentWillMount() {}

    Strike() {
        this.setState({enemyHP: this.state.enemyHP - 6})
    }


  render() {
    const { player, enemy, deck } = this.props;
    
    return (
      <div className="battle">
        <Player player={player} />
        <Enemy enemy={enemy} currentHp = {this.state.enemyHP}/>
        <Handcontainer deck={deck} player={player} enemy={enemy} Strike = {this.Strike}/>
      </div>
    );
  }
}

export default withRouter(Battle);