import React from "react";
import { withRouter } from "react-router-dom";
import './player.css'

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHP: this.props.player,
      shield: this.props.shield,
    };
  }

  render() {
      const playerHP = this.props.player;
      const shield = this.props.shield;
      
    return (
      <div className="player">
        <div className="player-status">
          <span className="player-hp">
            <i className="fas fa-shield-alt"></i>{shield}   {playerHP}/100
          </span>
          <progress value={playerHP} max="100" className="hp-bar"></progress>
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
