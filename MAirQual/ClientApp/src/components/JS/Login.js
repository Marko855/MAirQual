import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/login.css';
import tickIcon from '../../Images/tick.png';
import xIcon from '../../Images/x.png';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: '',
            successMsg: '',
            passwordRequirements: {
                minLength: false,
                containsLetters: false,
                containsNumbers: false,
                containsSymbols: false,
                passwordsMatch: true
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            this.validatePassword();
        });
    }

    validatePassword() {
        const { password } = this.state;
        const passwordRequirements = {
            minLength: password.length >= 8,
            containsLetters: /[a-zA-Z]/.test(password),
            containsNumbers: /\d/.test(password),
            containsSymbols: /[^a-zA-Z\d\s]/.test(password)
        };
        this.setState({ passwordRequirements });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password, passwordRequirements } = this.state;

        if (!passwordRequirements.minLength ||
            !passwordRequirements.containsLetters ||
            !passwordRequirements.containsNumbers ||
            !passwordRequirements.containsSymbols) {
            this.setState({ errorMsg: 'Password does not meet the requirements', successMsg: '' });
            return;
        }

        axios.post('https://localhost:44484/Login', { email, password })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: 'User logged in successfully', errorMsg: '' });
                    console.log('User logged in successfully');
                    sessionStorage.setItem('authToken', response.data.token);

                    setTimeout(function () {
                        window.location.href = '/';
                    }, 2000);
                } else {

                    this.setState({
                        email: '',
                        password: ''
                    });

                    this.setState({ errorMsg: 'Login failed', successMsg: '' });
                    console.error('Login failed:', response.statusText);
                }
            })
            .catch(error => {
                this.setState({
                    email: '',
                    password: ''
                });

                if (error.response && error.response.status === 401) {
                    this.setState({ errorMsg: 'Login failed: Invalid email or password!', successMsg: '' });
                } else {
                    this.setState({ errorMsg: 'Login failed: ' + error.message, successMsg: '' });
                }
                console.error('Login failed:', error);
            });
    }

    render() {
        const { email, password, errorMsg, successMsg, passwordRequirements } = this.state;
        return (
            <div className="centered-form">
                <div className="form-container">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={email} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" value={password} onChange={this.handleChange} required />
                            <div className="password-requirements">
                                <ul>
                                    <li>{passwordRequirements.minLength ? <img src={tickIcon} alt="Tick" /> : <img src={xIcon} alt="X" />} At least 8 characters</li>
                                    <li>{passwordRequirements.containsLetters ? <img src={tickIcon} alt="Tick" /> : <img src={xIcon} alt="X" />} Contains letters</li>
                                    <li>{passwordRequirements.containsNumbers ? <img src={tickIcon} alt="Tick" /> : <img src={xIcon} alt="X" />} Contains numbers</li>
                                    <li>{passwordRequirements.containsSymbols ? <img src={tickIcon} alt="Tick" /> : <img src={xIcon} alt="X" />} Contains symbols</li>
                                </ul>
                            </div>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                    {successMsg && <p className="success-message">{successMsg}</p>}
                    <p>Don't have an account? <Link to="/register">Sign up for free!</Link></p>
                </div>
            </div>
        );
    }
}
