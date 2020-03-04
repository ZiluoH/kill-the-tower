import React from 'react';
import './login_form.css'
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.dir(nextProps)
        if (nextProps.currentUser === true) {
            this.props.history.push('/play');
        }
        this.setState({ errors: nextProps.errors });
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    demoLogin() {
        let email = "demouser@email.com";
        let password = "password";
        this.typing(email, password);
    };

    typing(email, password) {
        if (email) {
            setTimeout(() => {
                this.setState({ email: this.state.email + email[0] });
                this.typing(email.slice(1), password);
            }, 100)
        } else {
            if (password) {
                setTimeout(() => {
                    this.setState({ password: this.state.password + password[0] });
                    this.typing(false, password.slice(1));
                }, 100)
            } else {
                setTimeout(() => this.props.login(
                    { email: this.state.email, password: this.state.password }
                ))
            }
        }
    };

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user)
    }

    renderErrors() {
        return (
            <ul className="session-errors">
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="login-page">
                <form className="session-form" onSubmit={this.handleSubmit}>
                    <h1 className="session-title">Login</h1>
                    <div id="form-container">
                        <input className="session-input"
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br />
                        <input className="session-input"
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <div className="btn-row-1">
                            <input type="submit" value="Submit" className="btn main-btn" />
                            <button className="btn main-btn" type="button" onClick={this.demoLogin}>Try Demo</button>
                        </div>
                        <div className="btn-row-2">
                            <button className="btn main-btn" onClick={() => this.props.history.push("/")}>Back to Title</button>
                        </div>
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);
