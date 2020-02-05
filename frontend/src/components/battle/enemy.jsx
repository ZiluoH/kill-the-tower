import React from "react";
import { withRouter } from "react-router-dom";
import './enemy.css';

class Enemy extends React.Component {
    
  render() {
    const {name, hp, attack, defend} = this.props.enemy;
    
    return (
      <div className="enemy">
        <div className="enemy-status">
          <span className="enemy-hp"><i className="fas fa-skull"></i> {attack}   <i className="fas fa-shield-alt"></i> {this.props.enemyShield}   {this.props.currentHp}/{hp}</span>
          <progress
            value={this.props.currentHp}
            max={this.props.enemy.hp}
            className="hp-bar"
          ></progress>
        </div>
      </div>
    );
  }
}

export default withRouter(Enemy);
