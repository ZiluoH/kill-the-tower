import React from 'react';
import { withRouter } from 'react-router-dom';
import Player from './player';
import Enemy from './enemy';
import Cards from './cards';
import './battle.css';


class Battle extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
       
    }

    render() {
        const { player, enemy } = this.props
        return (
            <div className="battle">
                <h2>battle</h2>
                <Player player = { player } />
                <Enemy enemy = { enemy } />
                <Cards hands = {player.hands} />
            </div>
        );
    }
}

export default withRouter(Battle);