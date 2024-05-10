import React, { Component } from 'react';
import axios from 'axios';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airVisualData: null,
            loading: false
        };
    }

    fetchData = async () => {
        try {
            this.setState({ loading: true });

            // Make a GET request to your backend endpoint
            const response = await axios.get('https://localhost:44484/airvisual', {
                params: {
                    city: 'Zagreb',
                    state: 'Zagreb',
                    country: 'Croatia'
                }
            });

            // Log the response to the console
            console.log('Server Response:', response.data);

            // Update state with the fetched data
            this.setState({ airVisualData: response.data });
        } catch (error) {
            console.error('Error fetching city data:', error);
        } finally {
            this.setState({ loading: false });
        }
    };

    renderCityData = () => {
        const { airVisualData } = this.state;

        if (!airVisualData) {
            return <div>No city data available</div>;
        }

        // Render the fetched city data
        return (
            <div>
                <h2>City: {airVisualData.data.city}</h2>
                <p>State: {airVisualData.data.state}</p>
                <p>Country: {airVisualData.data.country}</p>
                <h3>Pollution Data:</h3>
                <p>AQI US: {airVisualData.data.current.pollution.aqius}</p>
                <p>Main US: {airVisualData.data.current.pollution.mainus}</p>
                <p>AQI CN: {airVisualData.data.current.pollution.aqicn}</p>
                <p>Main CN: {airVisualData.data.current.pollution.maincn}</p>
                <h3>Weather Data:</h3>
                <p>Temperature: {airVisualData.data.current.weather.tp}°C</p>
                <p>Pressure: {airVisualData.data.current.weather.pr}hPa</p>
                <p>Humidity: {airVisualData.data.current.weather.hu}%</p>
                <p>Wind Speed: {airVisualData.data.current.weather.ws}m/s</p>
                {/* Display other data if needed */}
            </div>
        );
    };



    render() {
        const { loading } = this.state;

        return (
            <div>
                <h1>Air Quality</h1>
                {/* Button to trigger data fetching */}
                <button onClick={this.fetchData} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch City Data'}
                </button>
                {/* Render the fetched city data */}
                {this.renderCityData()}
            </div>
        );
    }
}
