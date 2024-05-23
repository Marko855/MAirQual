import React, { Component } from 'react';
import axios from 'axios';

export class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: null,
            loading: true
        };
    }

    async componentDidMount() {
        try {
            // Fetch user data from the server using Axios
            const authToken = localStorage.getItem('authToken');
            alert(authToken)
            const response = await axios.get('https://localhost:44484/UserPage', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const userData = response.data;

            this.setState({ userData, loading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error
            this.setState({ loading: false });
        }
    }


    render() {
        const { userData, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h1>Welcome to your User Page</h1>
                {userData && (
                    <div>
                        <h2>Personal Data:</h2>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        {/* Render other personal data */}
                    </div>
                )}
                {/* Render other content for logged-in users */}
            </div>
        );
    }
}
