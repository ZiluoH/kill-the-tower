import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './gameover.css';

export default class Gameover extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="gameover">
                <Link to="/play" className="retry">Try again</Link>
            </div>
        )
    }


}