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
            errorMessage: '',
            isLoggedIn: false,
            favourites: [],
            showSuccessMessage: false,
            showErrorMessage: false,
            city_selected: false,
            selectedStateButton: '',
            selectedCityButton: '',
        };
        this.resetCounterTimer = null;
        this.timerInterval = null;
        this.statesContainerRef = React.createRef();
    }

    componentDidMount() {
        this.fetchLocation();
        this.startTimer();
        this.setState({
            isLoggedIn: !!sessionStorage.getItem('authToken'),
            favourites: JSON.parse(localStorage.getItem('favourites')) || []
        });
    }


    componentWillUnmount() {
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
        this.resetCounterTimer = setTimeout(this.resetRequestCounter, 60000);
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
                    return { timeRemaining: 60 };
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
            alert("Too many request at the time.Wait a second!");
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
            alert("Too many request at the time.Wait a second!");
            this.setState({ loading: false });
        }
    };

    fetchCountryData = async (country) => {
        if (!this.canMakeRequest()) {
            alert("Too many request at the time.Wait a second!");
            return;
        }
        this.increaseRequestCounter();
        try {
            const response = await axios.get('https://localhost:44484/CountryFetch/country', {
                params: {
                    country
                }
            });

            this.setState({ countryData: response.data, loading: false, errorMessage: '' });
        } catch (error) {
            console.error('Error fetching country data:', error);
            if (error.response && error.response.status === 500) {
                this.setState({
                    errorMessage: "Error fetching country data. Wrong country name provided or country doesn't exist.", loading: false
                });
            } else {
                this.setState({ loading: false });
            }
        }
    };

    fetchStateData = async (country, state) => {
        try {
            if (!this.canMakeRequest()) {
                alert("Too many request at the time.Wait a second!");
                return;
            }
            this.increaseRequestCounter();

            const response = await axios.get('https://localhost:44484/StateFetch/state', {
                params: {
                    country,
                    state
                }
            });
            window.scrollTo({
                top: this.statesContainerRef.current.offsetTop,
                behavior: 'smooth'
            });

            this.setState({
                selectedState: state,
                stateData: response.data,
                selectedStateButton: state,
            });
        } catch (error) {
            console.error('Error fetching state data:', error);
            alert("Too many request at the time.Wait a second!");
        }
    };


    handleInputChange = event => {
        this.setState({ country: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { country } = this.state;
        this.setState({
            loading: true,
            selectedCountry: country,
            countryData: null,
            stateData: null,
            showSuccessMessage: false,
            showErrorMessage: false,
        }, () => {
            this.fetchCountryData(country);
        });
    };

    handleStateButtonClick = async (state) => {
        const { selectedCountry } = this.state;

        this.setState({
            showSuccessMessage: false,
            showErrorMessage: false
        }, async () => {
            await this.fetchStateData(selectedCountry, state);
        });
    };


    handleCityButtonClick = async (city, state, country) => {
        try {
            if (!this.canMakeRequest()) {
                alert("Too many request at the time.Wait a second!");
                return;
            }
            this.setState({
                showSuccessMessage: false,
                showErrorMessage: false,
                city_selected: true,
                selectedCityButton: city
            });

            this.increaseRequestCounter();
            const response = await axios.get('https://localhost:44484/CityNameFetch/city', {
                params: {
                    city,
                    state,
                    country
                }
            });

            console.log('Response data:', response.data);

            this.setState({ cityData: response.data }, () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.setState({
                    loading: false,
                });
            });
        } catch (error) {
            console.error('Error fetching city data:', error);
            alert("Too many request at the time.Wait a second!");
            this.setState({ loading: false });
        }
    };


    formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return { formattedDate, formattedTime };
    };

    handleAddToFavourites = async () => {
        const { cityData } = this.state;
        if (cityData) {
            const newFavourite = {
                location: `${cityData.data.city}, ${cityData.data.state}, ${cityData.data.country}`
            };

            try {
                const authToken = sessionStorage.getItem('authToken');
                await axios.post('https://localhost:44484/Favorites', { location: newFavourite.location }, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                this.setState({ showSuccessMessage: true, showErrorMessage: false, errorText: '' });
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    this.setState({ showErrorMessage: true, showSuccessMessage: false, errorText: 'Location already exists in favorites!' });
                } else {
                    console.error('Error adding favorite location:', error);
                    this.setState({ showErrorMessage: true, showSuccessMessage: false, errorText: 'An error occurred while adding the favorite location' });
                }
            }
        }
    }


    capitalize(input) {
        if (!input) return input;
        input = input.toLowerCase();
        return input.charAt(0).toUpperCase() + input.slice(1);
    }



    render() {
        const { cityData, countryData, selectedCountry, stateData, selectedState, timeRemaining, errorMessage, isLoggedIn, favourites, showErrorMessage, showSuccessMessage, errorText, city_selected } = this.state;

        const getAQIColor = (aqi) => {
            if (aqi <= 50) return 'good';
            if (aqi <= 100) return 'moderate';
            if (aqi <= 150) return 'unhealthy-sg';
            if (aqi <= 200) return 'unhealthy';
            if (aqi <= 300) return 'very-unhealthy';
            return 'hazardous';
        };

        const generatePollutantReport = (pollutionData) => {
            switch (pollutionData) {
                case 'p2':
                    return (
                        <div className="pollutant">
                            <h3>Main pollutant: PM2.5</h3>
                            <p>PM2.5 (Particulate Matter 2.5): PM2.5 refers to tiny particles or droplets in the air that are 2.5 micrometers or less in width.
                                These particles can be harmful when inhaled and are associated with respiratory and cardiovascular problems.
                                Common sources include vehicle emissions, industrial processes, and wildfires.
                            </p>
                        </div>
                    );

                case 'p1':
                    return (
                        <div className="pollutant">
                            <h3>Main pollutant: PM10</h3>
                            <p>PM10 (Particulate Matter 10): PM10 refers to slightly larger particles in the air than PM2.5, up to 10 micrometers in diameter.
                                Like PM2.5, PM10 can cause health issues when inhaled, particularly affecting the respiratory system.
                                Sources of PM10 include road dust, construction activities, and agricultural operations.
                            </p>
                        </div>
                    );
                case 'o3':
                    return (
                        <div className="pollutant">
                            <h3>Main pollutant: Ozone</h3>
                            <p>Ozone (O3): Ozone in the Earth's atmosphere can be both beneficial and harmful.
                                In the upper atmosphere, ozone protects us from the sun's ultraviolet radiation. However, at ground level, ozone is a pollutant that
                                can irritate the respiratory system, leading to breathing difficulties, chest pain, and throat irritation.
                                Ground-level ozone forms when pollutants emitted by cars, power plants, and other sources react with sunlight.</p>
                        </div>
                    );
                case 'n2':
                    return (
                        <div className="pollutant">
                            <h3>Main pollutant: Nitrogen Dioxide</h3>
                            <p>Nitrogen Dioxide (NO2): Nitrogen dioxide is a reddish-brown gas that can irritate the airways in the human respiratory system.
                                It can cause coughing, wheezing, and shortness of breath, particularly in people with asthma or other respiratory conditions.
                                NO2 primarily comes from vehicle emissions, industrial processes, and combustion of fossil fuels.</p>
                        </div>
                    );
                case 's2':
                    return (
                        <div className="pollutant">
                            <h3>Main pollutant: Sulphur Dioxide</h3>
                            <p>Sulphur Dioxide (SO2): Sulfur dioxide is a pungent gas with a strong odor.
                                Exposure to SO2 can irritate the respiratory system and exacerbate existing respiratory conditions such as asthma and bronchitis.
                                Major sources of sulfur dioxide include coal-fired power plants, industrial facilities, and volcanic eruptions.</p>
                        </div>
                    );
                case 'co':
                    return (
                        <div className="pollutant">
                            <h3>Main pollutant: Carbon Monoxide</h3>
                            <p>Carbon Monoxide (CO): Carbon monoxide is a colorless, odorless gas that is highly toxic to humans and animals when inhaled in high concentrations.
                                CO interferes with the body's ability to transport oxygen in the bloodstream, leading to symptoms such as headaches, dizziness, nausea, and, in severe cases, death.
                                Common sources of carbon monoxide include vehicle exhaust, gas appliances, and tobacco smoke.</p>
                        </div>
                    );
                default:
                    return "";
            }
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
                        <h2 className="city">{this.state.city_selected ? 'Selected Location:' : 'Your Location:'} {cityData.data.city}, {cityData.data.state}, {cityData.data.country}</h2>

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
                        <div className="main-pollutant">
                            {cityData && generatePollutantReport(cityData.data.current.pollution.mainus)}
                        </div>

                        <div className="recommendations">
                            <h3>Recommendations:</h3>
                            {generateRecommendations(getAQIColor(cityData.data.current.pollution.aqius))}
                        </div>
                        {isLoggedIn && (
                            <div className="favourites">
                                <button onClick={this.handleAddToFavourites} className="favourites-button">
                                    Add to favourites
                                </button>
                                {showSuccessMessage && <div className="success-message">Location successfully added to favorites!</div>}
                                {showErrorMessage && <div className="error-message">{errorText}</div>}

                            </div>
                        )}

                    </div>
                )}
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        Enter Country:
                        <input type="text" value={this.state.country} onChange={this.handleInputChange} placeholder="Enter Country..." />
                    </label>
                    <button type="submit" className="form-button">Fetch Data</button>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="states-and-cities-container">
                    {countryData && countryData.data && countryData.data.length > 0 && (
                        <div className="states-container" ref={this.statesContainerRef}>
                            <h2>States in {this.capitalize(selectedCountry)}:</h2>
                            <ul>
                                {countryData.data.map((state, index) => (
                                    <li key={index}>
                                        <button
                                            className={`state-button ${selectedState === state.state ? 'selected' : ''}`}
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
                            <h2>Cities in {selectedState}:</h2>
                            <ul className="city-list">
                                {stateData.data.map((city, index) => (
                                    <li key={index}>
                                        <button
                                            className={`city-button ${city_selected && cityData && cityData.data.city === city.city ? 'selected' : ''}`}
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