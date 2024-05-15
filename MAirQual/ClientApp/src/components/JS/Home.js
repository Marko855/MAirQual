import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/home.css';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airVisualData: null,
            countryData: null, // New state for country data
            loading: true, // Set loading to true initially
            latitude: null,
            longitude: null,
            country: ''
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
                        this.fetchCityData(); // Call fetchCityData after setting latitude and longitude
                    });
                },
                error => {
                    console.error('Error getting location:', error);
                    // If location cannot be found, set latitude and longitude to null
                    this.setState({ latitude: null, longitude: null, loading: false });
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            // If geolocation is not supported, set latitude and longitude to null
            this.setState({ latitude: null, longitude: null, loading: false });
        }
    };

    fetchCityData = async () => {
        try {
            const { latitude, longitude } = this.state;
            // Make a GET request to fetch city data using latitude and longitude
            const response = await axios.get('https://localhost:44484/airvisual/city', {
                params: {
                    latitude,
                    longitude
                }
            });

            // Log the response to the console
            console.log('City Data:', response.data);

            // Update state with the fetched city data
            this.setState({ airVisualData: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching city data:', error);
            this.setState({ loading: false });
        }
    };

    fetchCountryData = async (country) => {
        try {
            // Make a GET request to fetch country data using the provided country parameter
            const response = await axios.get('https://localhost:44484/airvisual/country', {
                params: {
                    country
                }
            });

            // Log the response to the console
            console.log('Country Data:', response.data);

            // Update state with the fetched country data
            this.setState({ countryData: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching country data:', error);
            this.setState({ loading: false });
        }
    };

    handleInputChange = event => {
        this.setState({ country: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { country } = this.state;
        this.setState({ loading: true }, () => {
            this.fetchCountryData(country);
        });
    };

    render() {
        const {airVisualData, countryData } = this.state;
        return (
            <div>
      {/* Render the fetched city data */}
                {airVisualData && (
                    <div>
                        <h2 className="city">Your location: {airVisualData.data.city}, {airVisualData.data.state}</h2>
                        <div className="info">
                            <div className="pollution">
                                <h3>Pollution Data:</h3>
                                <p>AQI US: {airVisualData.data.current.pollution.aqius}</p>
                                <p>Main US: {airVisualData.data.current.pollution.mainus}</p>
                                <p>AQI CN: {airVisualData.data.current.pollution.aqicn}</p>
                                <p>Main CN: {airVisualData.data.current.pollution.maincn}</p>
                            </div>
                            <div className="weather">
                                <h3>Weather Data:</h3>
                                <p>Temperature: {airVisualData.data.current.weather.tp}°C</p>
                                <p>Pressure: {airVisualData.data.current.weather.pr}hPa</p>
                                <p>Humidity: {airVisualData.data.current.weather.hu}%</p>
                                <p>Wind Speed: {airVisualData.data.current.weather.ws}m/s</p>
                                <p>Icon: {airVisualData.data.current.weather.ic}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Render the fetched country data if available */}
                {countryData && countryData.data && (
                    <div>
                        <h2>States in {countryData.country}</h2>
                        <ul>
                            {countryData.data.map((state, index) => (
                                <li key={index}>{state.state}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Render the form for entering country */}
                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        Enter Country:
                        <input type="text" value={this.state.country} onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Fetch Data</button>
                </form>
            </div>
        );
    }
}
