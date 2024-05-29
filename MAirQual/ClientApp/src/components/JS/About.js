import React, { Component } from 'react';
import '../CSS/About.css'; 

export class About extends Component {
    render() {
        return (
            <div className="about-container">
                <header className="header">
                    <h1>About Our App</h1>
                </header>
                <section className="section">
                    <h2>Introduction</h2>
                    <p>Welcome to MAirQual! Our app offers real-time updates and detailed analysis of both air quality
                        and weather conditions, ensuring you're always informed about the environment around you. Whether you're
                        in your local neighborhood or exploring new destinations,
                        MAirQual keeps you prepared and aware of the air you breathe and the weather you encounter.</p>
                </section>
                <section className="section">
                    <h2>Features</h2>
                    <ul className="feature-list">
                        <li>Real-Time Air Quality Monitoring</li>
                        <li>Location-Based Data</li>
                        <li>Weather Data</li>
                        <li>Health Recommendations</li>
                        <li>User-Friendly Interface</li>
                        <li>News</li>
                        <li>Shop</li>
                        <li>Account Management</li>
                    </ul>
                </section>
                <section className="section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions, feedback, or need support, please contact us at <a href="mailto:md54148@fer.hr">md54148@fer.hr</a>.</p>
                </section>
                <section className="section">
                    <h2>Credits & Thanks</h2>
                    <div className="credit">
                        <p>Thanks to AirVisual API for providing essential data!</p>
                    </div>
                </section>
                <footer className="footer">
                    <h2>Version History</h2>
                    <p>Version 1.1</p>
                </footer>
            </div>
        );
    }
}
