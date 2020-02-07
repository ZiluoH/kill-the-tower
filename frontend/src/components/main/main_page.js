import React from 'react';
import Flame from './flame/flame'
import './tunnel_glow/glow.css'
import './main.css'
import { Link } from 'react-router-dom';

class MainPage extends React.Component {

    render() {
        // setTimeout(() => console.dir(this.props), 2000)
        let loginButtons = !this.props.loggedIn ? (
            <div id="login-btns">
                <Link className = "btn main-btn" to = "/login" > Login</Link>
                <Link className="btn main-btn" to="/signup">Sign up</Link>  
            </div> 
        ) : <button className="btn main-btn" onClick={this.props.logout}>Log out</button>;
        return (
            <div id="main-page">
                <div className="wrapper">
                 
                </div>
                <header id="main-title-header">
                    <h1 id="terminate">Terminate</h1>
                    <h2 id="the">the</h2>
                    <Flame/>
                    <h1 id="tower">Tower</h1>
                </header>
                <div id="min-form-container">
                    <form id="min-form" action="">
                        <Link className="btn main-btn" to="/play">Start</Link>
                        {loginButtons}
                    </form>
                </div>
        
            </div>
        );
    }
}

export default MainPage;