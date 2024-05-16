import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/home.css';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData: null,
            countryData: null,
            loading: true,
            latitude: null,
            longitude: null,
            country: '',
            selectedCountry: '',
            fetchingStateData: false
        };
    }

    componentDidMount() {
        this.fetchLocation();
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
            this.setState({ loading: false });
        }
    };

    fetchCountryData = async (country) => {
        try {
            const response = await axios.get('https://localhost:44484/CountryFetch/country', {
                params: {
                    country
                }
            });

            this.setState({ countryData: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching country data:', error);
            this.setState({ loading: false });
        }
    };

    fetchStateData = async (country, state) => {
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
        const { selectedCountry, fetchingStateData } = this.state;

        if (fetchingStateData) {
            return;
        }

        this.setState({ fetchingStateData: true });

        this.setState({ selectedState: state }, async () => {
            try {
                document.querySelectorAll('.state-button').forEach(button => {
                    button.disabled = true;
                    button.classList.add('disabled-button');
                });

                await this.fetchStateData(selectedCountry, state);
            } finally {
                this.setState({ fetchingStateData: false });

                setTimeout(() => {
                    document.querySelectorAll('.state-button').forEach(button => {
                        button.disabled = false;
                        button.classList.remove('disabled-button');
                    });
                }, 7000);
            }
        });
    };

    handleCityButtonClick = async (city, state, country) => {
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
                console.log('Updated citylData:', this.state.cityData); // Log the updated state
            });
        } catch (error) {
            console.error('Error fetching city data:', error);
            this.setState({ loading: false });
        }
    };



    render() {
        const { cityData, countryData, selectedCountry, stateData, selectedState } = this.state;
        return (
            <div>
                {cityData && (
                    <div>
                        <h2 className="city">Your location: {cityData.data.city}, {cityData.data.state}</h2>
                        <div className="info">
                            <div className="pollution">
                                <h3>Pollution Data:</h3>
                                <p>AQI US: {cityData.data.current.pollution.aqius}</p>
                                <p>Main US: {cityData.data.current.pollution.mainus}</p>
                                <p>AQI CN: {cityData.data.current.pollution.aqicn}</p>
                                <p>Main CN: {cityData.data.current.pollution.maincn}</p>
                            </div>
                            <div className="weather">
                                <h3>Weather Data:</h3>
                                <p>Temperature: {cityData.data.current.weather.tp}°C</p>
                                <p>Pressure: {cityData.data.current.weather.pr}hPa</p>
                                <p>Humidity: {cityData.data.current.weather.hu}%</p>
                                <p>Wind Speed: {cityData.data.current.weather.ws}m/s</p>
                                <p>Icon: {cityData.data.current.weather.ic}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        Enter Country:
                        <input type="text" value={this.state.country} onChange={this.handleInputChange} />
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
            </div>
        );
    }
}
