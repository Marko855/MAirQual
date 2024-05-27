import React, { Component } from 'react';
import axios from 'axios';
import Bike from '../../Images/bike.png';
import Bike_crossed from '../../Images/Bike_crossed.png';
import Window_icon from '../../Images/window.png';
import Mask_icon from '../../Images/Mask.png';
import Window_crossed from '../../Images/window_crossed.png';
import Air_purifier from '../../Images/air_purifier.png';
import '../CSS/UserPage.css';

export class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: null,
            loadingUserData: true,
            loadingFavorites: true,
            favorites: [],
            cityData_favorites: [],
            loadingCityData: false
        };
    }

    async componentDidMount() {
        await this.fetchUserData();
        await this.fetchFavoriteLocations();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
            await this.fetchUserData();
        }
    }

    fetchUserData = async () => {
        try {
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
            this.setState({ loadingUserData: false });
        }
    }

    fetchFavoriteLocations = async () => {
        try {
            const authToken = sessionStorage.getItem('authToken');
            const response = await axios.get('https://localhost:44484/Favorites', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (typeof response.data === 'string') {
                const favoritesArray = response.data.split(', ');
                const favoritesData = [];

                for (let i = 0; i < favoritesArray.length; i += 3) {
                    const [city, state, country] = favoritesArray.slice(i, i + 3);
                    favoritesData.push({ city, state, country, deleted: false });
                }
                this.setState({ favorites: favoritesData, loadingFavorites: false });

            } else {
                console.error('Error: Unexpected format of favorite locations data');
                this.setState({ loadingFavorites: false });
            }
        } catch (error) {
            console.error('Error fetching favorite locations:', error);
            alert("Too much request at the time. Wait a second!");
            this.setState({ loadingFavorites: false });
        }
    }

    handleLocationButtonClick = async (city, state, country) => {
        try {
            this.setState({ loadingCityData: true });
            const response = await axios.get('https://localhost:44484/CityNameFetch/city', {
                params: { city, state, country }
            });

            console.log('Response data:', response.data);
            this.setState(prevState => ({
                cityData_favorites: [...prevState.cityData_favorites, { ...response.data, city, state, country }],
                loadingCityData: false
            }));
        } catch (error) {
            console.error('Error fetching city data:', error);
            this.setState({ loadingCityData: false });
        }
    };

    deleteFavoriteLocation = async (index) => {
        try {
            const updatedFavorites = [...this.state.favorites];
            const favoriteToDelete = updatedFavorites[index];
            updatedFavorites.splice(index, 1);

            const updatedCityData = this.state.cityData_favorites.filter(cityData =>
                cityData.city !== favoriteToDelete.city || cityData.state !== favoriteToDelete.state || cityData.country !== favoriteToDelete.country
            );

            this.setState({ favorites: updatedFavorites, cityData_favorites: updatedCityData });

            const authToken = sessionStorage.getItem('authToken');
            await axios.delete(`https://localhost:44484/Favorites/${index}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            console.log('Location deleted successfully from the database.');
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };

    getAQIColor = (aqi) => {
        if (aqi <= 50) return 'good';
        if (aqi <= 100) return 'moderate';
        if (aqi <= 150) return 'unhealthy-sg';
        if (aqi <= 200) return 'unhealthy';
        if (aqi <= 300) return 'very-unhealthy';
        return 'hazardous';
    };

    generateRecommendations = (aqiCategory) => {
        switch (aqiCategory) {
            case 'good':
                return (
                    <>
                        <div className="recommendation">
                            <img src={Bike} alt="Bike Icon" className="recommendation-icon-g" />
                            <p>The air quality is good. Enjoy outdoor activities!</p>
                        </div>
                        <div className="recommendation">
                            <img src={Window_icon} alt="Window Icon" className="recommendation-icon-g" />
                            <p>Open windows and let fresh air into your home.</p>
                        </div>
                    </>
                );
            case 'moderate':
                return (
                    <>
                        <div className="recommendation">
                            <img src={Bike} alt="Bike Icon" className="recommendation-icon-m" />
                            <p>Reduce outdoor activities, especially if you're in a sensitive group.</p>
                        </div>
                    </>
                );
            case 'unhealthy-sg':
                return (
                    <>
                        <div className="recommendation">
                            <img src={Bike_crossed} alt="Bike Icon Crossed" className="recommendation-icon-usg" />
                            <p>Limit outdoor activities, especially if you have respiratory or heart conditions.</p>
                        </div>
                        <div className="recommendation">
                            <img src={Mask_icon} alt="Mask icon" className="recommendation-icon-usg" />
                            <p>Consider wearing masks rated for particulate matter if going outside is necessary.</p>
                        </div>
                    </>
                );
            case 'unhealthy':
                return (
                    <>
                        <div className="recommendation">
                            <img src={Bike_crossed} alt="Bike Icon Crossed" className="recommendation-icon-u" />
                            <p>People with respiratory or heart conditions should remain indoors and keep activity levels low.</p>
                        </div>
                        <div className="recommendation">
                            <img src={Window_crossed} alt="Window crossed icon" className="recommendation-icon-u" />
                            <p>Ensure indoor air quality by keeping windows and doors closed, and using air purifiers if available.</p>
                        </div>
                    </>
                );
            case 'very-unhealthy':
                return (
                    <>
                        <div className="recommendation">
                            <img src={Bike_crossed} alt="Bike Icon Crossed" className="recommendation-icon-vu" />
                            <p>Stay indoors as much as possible, especially for sensitive groups.</p>
                        </div>
                        <div className="recommendation">
                            <img src={Air_purifier} alt="Air purifier icon" className="recommendation-icon-vu" />
                            <p>Use air purifiers with HEPA filters indoors to improve air quality.</p>
                        </div>
                    </>
                );
            case 'hazardous':
                return (
                    <>
                        <div className="recommendation">
                            <img src={Bike_crossed} alt="Bike Icon Crossed" className="recommendation-icon-h" />
                            <p>Remain indoors and keep activity levels to a minimum.</p>
                        </div>
                        <div className="recommendation">
                            <img src={Window_crossed} alt="Window crossed icon" className="recommendation-icon-h" />
                            <p>Close all windows and doors to prevent outdoor air from entering.</p>
                        </div>
                    </>
                );
            default:
                return "";
        }
    };

    getWeatherIcon = (icon) => {
        try {
            return require(`../../Images/${icon}.png`);
        } catch (error) {
            console.error('Error loading weather icon:', error);
            return null;
        }
    };

    formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return { formattedDate, formattedTime };
    };

    isCityDataFetched = (city) => {
        return this.state.cityData_favorites.some(cityData => cityData.city === city);
    };

    render() {
        const { userData, loadingUserData, favorites, loadingFavorites, cityData_favorites, loadingCityData } = this.state;

        return (
            <div className="user-page-container">
                {userData && (
                    <div className="user-info">
                        <h2>Personal Data:</h2>
                        <div className="info-item">
                            <div>
                                <label>Username:</label>
                                <p>{userData.username}</p>
                            </div>
                            <button>Edit</button>
                        </div>
                        <div className="info-item">
                            <div>
                                <label>Email:</label>
                                <p>{userData.email}</p>
                            </div>
                            <button>Edit</button>
                        </div>
                        <div className="info-item">
                            <div>
                                <label>Password:</label>
                                <p>********</p> {/* Displayed as asterisks for security */}
                            </div>
                            <button>Edit</button>
                        </div>
                    </div>
                )}


                {loadingFavorites && <div>Loading favorite locations...</div>}
                {!loadingFavorites && (
                    <div className="favourites-container">
                        {favorites.some(favorite => !favorite.deleted && favorite.city && favorite.state && favorite.country) ? (
                            <h2>Favorite Locations:</h2>
                        ) : (
                            <h2>Favorite Locations: None</h2>
                        )}
                        <ul>
                            {favorites.map((favorite, index) => (
                                <li key={index}>
                                    {/* Check if favorite entry contains valid data */}
                                    {favorite.city && favorite.state && favorite.country && !favorite.deleted && (
                                        <>
                                            {favorite.city}, {favorite.state}, {favorite.country}
                                            {/** Render buttons only if there are favorited countries */}
                                            {favorites.length > 0 && (
                                                <>
                                                    <button
                                                        onClick={() => this.handleLocationButtonClick(favorite.city, favorite.state, favorite.country)}
                                                        disabled={this.isCityDataFetched(favorite.city)}
                                                        className="show-data_button">
                                                        Show Data
                                                    </button>
                                                    <button onClick={() => this.deleteFavoriteLocation(index)} className="delete-data_button" >Delete</button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Render city data for each favorite location */}
                {loadingCityData && <div>Loading city data...</div>}
                {!loadingCityData && cityData_favorites.length > 0 && (
                    cityData_favorites.map((cityData, index) => (
                        <div key={index} className="location-info">
                            <h2 className="city">Location: {cityData.city}, {cityData.state}, {cityData.country}</h2>
                            <div className="info">
                                <div className="pollution">
                                    <h3>Pollution Data:</h3>
                                    {(() => {
                                        const { formattedDate, formattedTime } = this.formatTimestamp(cityData.data.current.pollution.ts);
                                        const aqiColorClass = this.getAQIColor(cityData.data.current.pollution.aqius);
                                        return (
                                            <>
                                                <p>Date: {formattedDate}</p>
                                                <p>Time: {formattedTime}</p>
                                                <p className={`aqi ${aqiColorClass}`}>AQI US: {cityData.data.current.pollution.aqius}</p>
                                                <p>Main pollutant: {cityData.data.current.pollution.mainus}</p>
                                            </>
                                        );
                                    })()}
                                </div>
                                <div className="weather">
                                    <h3>Weather Data:</h3>
                                    <div className="weather-details">
                                        <div className="weather-info">
                                            <p>Temperature: {cityData.data.current.weather.tp}°C</p>
                                            <p>Pressure: {cityData.data.current.weather.pr} hPa</p>
                                            <p>Humidity: {cityData.data.current.weather.hu} %</p>
                                            <p>Wind Speed: {cityData.data.current.weather.ws} m/s</p>
                                        </div>
                                        {this.getWeatherIcon(cityData.data.current.weather.ic) && (
                                            <div className="weather-icon">
                                                <img src={this.getWeatherIcon(cityData.data.current.weather.ic)} alt="Weather Icon" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="recommendations">
                                <h3>Recommendations:</h3>
                                {this.generateRecommendations(this.getAQIColor(cityData.data.current.pollution.aqius))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    }
}
