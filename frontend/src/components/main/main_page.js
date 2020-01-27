import React from 'react';
import './main.css'
import { Link } from 'react-router-dom';

class MainPage extends React.Component {
    constructor(props){
        super(props)
    };

    render() {
        setTimeout(() => console.dir(this.props), 2000)
        let loginButtons = !this.props.loggedIn ? (
            <div>
                <Link className = "btn" to = "/login" > Login</Link>
                <Link className="btn" to="/signup">Sign up</Link>  
            </div> 
        ) : <button className="btn" onClick={this.props.logout}>Log out</button>;
        return (
            <div id="main-page">
                
                <header id="main-title-header">
                    <h1 id="main-title">Terminate the Tower</h1>
                </header>
                <div id="min-form-container">
                    <form id="min-form" action="">
                        <Link className="btn" to="/play">Start</Link>
                        {loginButtons}
                    </form>
                </div>
        
            </div>
        );
    }
}

export default MainPage;