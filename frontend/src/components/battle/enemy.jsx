import React from "react";
import { withRouter } from "react-router-dom";
import './enemy.css';

class Enemy extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    const {enemy} = this.props;
    console.log(enemy);
    
    return (
      <div className="enemy">
        <div className="enemy-status">
          <span className="enemy-hp">{enemy.hp}/100</span>
          <progress value={enemy.hp} max="100" className="hp-bar"></progress>
        </div>
      </div>
    );
  }
}

export default withRouter(Enemy);
