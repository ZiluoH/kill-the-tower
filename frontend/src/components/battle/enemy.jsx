import React from "react";
import { withRouter } from "react-router-dom";
import './enemy.css';

class Enemy extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {}
  
  render() {
    
    return (
      <div className="enemy">
        <div className="enemy-status">
          <span className="enemy-hp">{this.props.currentHp}/{this.props.enemy.hp}</span>
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
