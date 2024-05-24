import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/UserPage.css'; // Import CSS file for styling

export class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: null,
            loadingUserData: true,
            loadingFavorites: true,
            favorites: [] // New state to hold favourites from the server
        };
    }

    async componentDidMount() {
        await this.fetchUserData();
        await this.fetchFavoriteLocations();
    }

    async componentDidUpdate(prevProps) {
        // Check if the authentication status has changed
        if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
            await this.fetchUserData();
        }
    }

    fetchUserData = async () => {
        try {
            // Fetch user data from the server using Axios
            const authToken = sessionStorage.getItem('authToken');
            const response = await axios.get('https://localhost:44484/UserPage', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const userData = response.data;

            this.setState({ userData, loadingUserData: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error
            this.setState({ loadingUserData: false });
        }
    }

    fetchFavoriteLocations = async () => {
        try {
            // Fetch favorite locations from the server using Axios
            const authToken = sessionStorage.getItem('authToken');
            const response = await axios.get('https://localhost:44484/Favorites', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            // Check if the response data is in the expected format
            if (typeof response.data === 'string') {
                const favoritesArray = response.data.split(', ');
                const favoritesData = [];

                // Group the values into chunks of three (city, state, country)
                for (let i = 0; i < favoritesArray.length; i += 3) {
                    const [city, state, country] = favoritesArray.slice(i, i + 3);
                    favoritesData.push({ city, state, country });
                }

                this.setState({ favorites: favoritesData, loadingFavorites: false });
            } else {
                console.error('Error: Unexpected format of favorite locations data');
                this.setState({ loadingFavorites: false });
            }
        } catch (error) {
            console.error('Error fetching favorite locations:', error);
            // Handle error
            this.setState({ loadingFavorites: false });
        }
    }


    render() {
        const { userData, loadingUserData, favorites, loadingFavorites } = this.state;

        return (
            <div className="user-page-container">
                {userData && (
                    <h3>Welcome back, {userData.username}!</h3>
                )}
                {loadingUserData && <div>Loading user data...</div>}
                {userData && (
                    <div className="user-info">
                        <h2>Personal Data:</h2>
                        <p><strong>Email:</strong> {userData.email}</p>
                        {/* Render other personal data */}
                    </div>
                )}
                {/* Render favorite locations from the server */}
                {loadingFavorites && <div>Loading favorite locations...</div>}
                {!loadingFavorites && favorites.length > 0 && (
                    <div className="favourites-container">
                        <h2>Favourite Locations:</h2>
                        <ul>
                            {favorites.map((favorite, index) => (
                                <li key={index}>
                                    <p>City: {favorite.city}</p>
                                    <p>State: {favorite.state}</p>
                                    <p>Country: {favorite.country}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}
