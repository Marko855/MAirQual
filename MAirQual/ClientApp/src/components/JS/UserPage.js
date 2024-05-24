import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/UserPage.css'; // Import CSS file for styling

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
            const authToken = sessionStorage.getItem('authToken');
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

        return (
            <div className="user-page-container">
                {userData && (
                    <h3>Welcome back, {userData.username}!</h3>
                )}
                {loading && <div>Loading...</div>}
                {userData && (
                    <div className="user-info">
                        <h2>Personal Data:</h2>
                        <p><strong>Email:</strong> {userData.email}</p>
                        {/* Render other personal data */}
                    </div>
                )}
                <div className="change-personal-data">
                    <h2>Change Personal Data:</h2>
                    {/* Add form or components for changing personal data */}
                </div>
                {/* Render other content for logged-in users */}
            </div>
        );
    }
}
