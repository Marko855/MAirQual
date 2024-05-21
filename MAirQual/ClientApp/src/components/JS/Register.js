import React, { Component } from 'react';
import axios from 'axios';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: '',
            successMsg: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;

        axios.post('https://localhost:44484/Registration', { email, password })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ successMsg: 'User registered successfully', errorMsg: '' });
                    console.log('User registered successfully');
                    // Redirect to '/login' after successful registration
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
        const { email, password, errorMsg, successMsg } = this.state;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={email} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} required />
                    </div>
                    <button type="submit">Register</button>
                </form>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
            </div>
        );
    }
}

export default Register;
