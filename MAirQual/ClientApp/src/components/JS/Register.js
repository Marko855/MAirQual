import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/register.css';
import tickIcon from '../../Images/tick.png';
import xIcon from '../../Images/x.png';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
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
        const { password, confirmPassword } = this.state;
        const passwordRequirements = {
            minLength: password.length >= 8,
            containsLetters: /[a-zA-Z]/.test(password),
            containsNumbers: /\d/.test(password),
            containsSymbols: /[^a-zA-Z\d\s]/.test(password),
            passwordsMatch: password === confirmPassword
        };
        this.setState({ passwordRequirements });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, email, password } = this.state;

        axios.post('https://localhost:44484/Registration', { username, email, password })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: 'User registered successfully', errorMsg: '' });
                    console.log('User registered successfully');
                    window.location.href = '/login';
                } else {
                    this.setState({ errorMsg: 'Registration failed', successMsg: '' });
                    console.error('Registration failed:', response.statusText);
                }
            })
            .catch(error => {
                this.setState({ errorMsg: 'Registration failed: ' + error.message, successMsg: '' });
                console.error('Registration failed:', error);
            });
    }

    render() {
        const { username, email, password, confirmPassword, errorMsg, successMsg, passwordRequirements } = this.state;
        return (
            <div className="centered-form">
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username" value={username} onChange={this.handleChange} required />
                        </div>
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
                                    <li>{passwordRequirements.passwordsMatch ? <img src={tickIcon} alt="Tick" /> : <img src={xIcon} alt="X" />} Passwords match</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} required />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                    {successMsg && <p className="success-message">{successMsg}</p>}
                    <p>Already have an account? <Link to="/login">Sign in!</Link></p>
                </div>
            </div>
        );
    }
}
