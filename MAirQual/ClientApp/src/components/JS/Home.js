import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/home.css';
import Bike from '../../Images/bike.png';
import Bike_crossed from '../../Images/Bike_crossed.png';
import Window_icon from '../../Images/window.png';
import Mask_icon from '../../Images/Mask.png';
import Window_crossed from '../../Images/window_crossed.png';
import Air_purifier from '../../Images/air_purifier.png';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData: null,
            countryData: null,
            stateData: null,
            loading: true,
            latitude: null,
            longitude: null,
            country: '',
            selectedCountry: '',
            selectedState: '',
            fetchingStateData: false,
            requestCount: 0, 
            timeRemaining: 60, 
        };
        this.resetCounterTimer = null;
        this.timerInterval = null;
    }

    componentDidMount() {
        this.fetchLocation();
        this.startTimer();
    }

    componentWillUnmount() {
        // Clear timers when the component unmounts
        if (this.resetCounterTimer) {
            clearTimeout(this.resetCounterTimer);
        }
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    resetRequestCounter = () => {
        this.setState({ requestCount: 0, timeRemaining: 60 });
    }

    increaseRequestCounter = () => {
        this.setState(prevState => ({ requestCount: prevState.requestCount + 1 }));
        if (this.resetCounterTimer) {
            clearTimeout(this.resetCounterTimer);
        }
        this.resetCounterTimer = setTimeout(this.resetRequestCounter, 60000); // Reset counter every 60 seconds
    }

    canMakeRequest = () => {
        return this.state.requestCount < 5;
    }

    startTimer = () => {
        this.timerInterval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.timeRemaining > 0) {
                    return { timeRemaining: prevState.timeRemaining - 1 };
                } else {
                    return { timeRemaining: 60 }; // Reset timer to 60 seconds
                }
            });
        }, 1000);
    }

    fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    this.setState({ latitude, longitude }, () => {
                        this.fetchCityCordData();
                    });
                },
                error => {
                    console.error('Error getting location:', error);
                    this.setState({ latitude: null, longitude: null, loading: false });
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            this.setState({ latitude: null, longitude: null, loading: false });
        }
    };

    fetchCityCordData = async () => {
        if (!this.canMakeRequest()) {
            return;
        }
        this.increaseRequestCounter();
        try {
            const { latitude, longitude } = this.state;
            const response = await axios.get('https://localhost:44484/CityCordFetch/city', {
                params: {
                    latitude,
                    longitude
                }
            });

            this.setState({ cityData: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching city data:', error);
            alert("Too much request at the time.Wait a second!");
            this.setState({ loading: false });
        }
    };

    fetchCountryData = async (country) => {
        if (!this.canMakeRequest()) {
            return;
        }
        this.increaseRequestCounter();
        try {
            const response = await axios.get('https://localhost:44484/CountryFetch/country', {
                params: {
                    country
                }
            });

            this.setState({ countryData: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching country data:', error);
            alert("Too much request at the time.Wait a second!");
            this.setState({ loading: false });
        }
    };

    fetchStateData = async (country, state) => {
        if (!this.canMakeRequest()) {
            return;
        }
        this.increaseRequestCounter();
        try {
            const response = await axios.get('https://localhost:44484/StateFetch/state', {
                params: {
                    country,
                    state
                }
            });

            this.setState({ stateData: response.data });
        } catch (error) {
            console.error('Error fetching state data:', error);
            alert("Too much request at the time.Wait a second!");
        }
    };

    handleInputChange = event => {
        this.setState({ country: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { country } = this.state;
        this.setState({ loading: true, selectedCountry: country }, () => {
            this.fetchCountryData(country);
        });
    };

    handleStateButtonClick = async (state) => {
        const { selectedCountry } = this.state;

        this.setState({ selectedState: state }, async () => {
            await this.fetchStateData(selectedCountry, state);
        });
    };

    handleCityButtonClick = async (city, state, country) => {
        if (!this.canMakeRequest()) {
            return;
        }
        this.increaseRequestCounter();
        try {
            const response = await axios.get('https://localhost:44484/CityNameFetch/city', {
                params: {
                    city,
                    state,
                    country
                }
            });

            console.log('Response data:', response.data);

            this.setState({ cityData: response.data }, () => {
                console.log('Updated cityData:', this.state.cityData);
            });
        } catch (error) {
            console.error('Error fetching city data:', error);
            alert("Too much request at the time.Wait a second!");
            this.setState({ loading: false });
        }
    };

    formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString(); // Format the date
        const formattedTime = date.toLocaleTimeString(); // Format the time
        return { formattedDate, formattedTime };
    };

    render() {
        const { cityData, countryData, selectedCountry, stateData, selectedState, timeRemaining } = this.state;

        const getAQIColor = (aqi) => {
            if (aqi <= 50) return 'good';
            if (aqi <= 100) return 'moderate';
            if (aqi <= 150) return 'unhealthy-sg';
            if (aqi <= 200) return 'unhealthy';
            if (aqi <= 300) return 'very-unhealthy';
            return 'hazardous';
        };

        const generateRecommendations = (aqiCategory) => {
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
                                <p><p>Remain indoors and keep activity levels to a minimum.</p></p>
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

        const getWeatherIcon = (icon) => {
            // Define the path to your weather icons
            const weatherIconPath = require(`../../Images/${icon}.png`);
            return weatherIconPath;
        };

        return (
            <div className="container">
                {cityData && (
                    <div className="location-info">
                        <h2 className="city">Your location: {cityData.data.city}, {cityData.data.state}, {cityData.data.country}</h2>

                        <div className="info">
                            <div className="pollution">
                                <h3>Pollution Data:</h3>
                                {(() => {
                                    const { formattedDate, formattedTime } = this.formatTimestamp(cityData.data.current.pollution.ts);
                                    const aqiColorClass = getAQIColor(cityData.data.current.pollution.aqius);
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
                                    {getWeatherIcon(cityData.data.current.weather.ic) && (
                                        <div className="weather-icon">
                                            <img src={getWeatherIcon(cityData.data.current.weather.ic)} alt="Weather Icon" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="recommendations">
                            <h3>Recommendations:</h3>
                            {generateRecommendations(getAQIColor(cityData.data.current.pollution.aqius))}
                        </div>
                    </div>
                )}
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        Enter Country:
                        <input type="text" value={this.state.country} onChange={this.handleInputChange} placeholder="Enter Country..." />
                    </label>
                    <button type="submit">Fetch Data</button>
                </form>
                <div className="states-and-cities-container">
                    {countryData && countryData.data && (
                        <div className="states-container">
                            <h2>States in {selectedCountry}:</h2>
                            <ul>
                                {countryData.data.map((state, index) => (
                                    <li key={index}>
                                        <button
                                            className="state-button"
                                            onClick={() => this.handleStateButtonClick(state.state)}
                                        >
                                            {state.state}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {stateData && (
                        <div className="cities-container">
                            <h2>Cities:</h2>
                            <ul className="city-list">
                                {stateData.data.map((city, index) => (
                                    <li key={index}>
                                        <button
                                            className="city-button"
                                            onClick={() => this.handleCityButtonClick(city.city, selectedState, selectedCountry)}
                                        >
                                            {city.city}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="timer">
                    Time until reset: {timeRemaining}s
                </div>
            </div>
        );
    }
}
