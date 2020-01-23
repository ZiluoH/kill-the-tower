import React from "react";
import { withRouter } from "react-router-dom";
import './player.css'

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
      const playerHP = this.props.player.hp;
    return (
      <div className="player">
        <div className="player-status">
            <span className="player-hp" >{playerHP}/100</span>
            <progress value={playerHP} max="100" className="hp-bar"></progress>
        </div>
      </div>
    );
  }
}

export default withRouter(Player);
