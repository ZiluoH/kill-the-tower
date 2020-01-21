import React from 'react';
import './main.css'

class MainPage extends React.Component {

    render() {
        return (
            <div id="main-page">
                
                <header id="main-title-header">
                    <h1 id="main-title">Terminate the Tower</h1>
                </header>
                <div id="min-form-container">
                    <form id="min-form" action="">
                        <div className="btn" id="start">Start</div>
                        <div className="btn" id="login">Login</div>
                    </form>
                </div>
        
            </div>
        );
    }
}

export default MainPage;