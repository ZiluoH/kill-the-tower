import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './win.css';

export default class Win extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="win">
                <Link to="/play" className="retry">Play again</Link>
            </div>
        )
    }


}