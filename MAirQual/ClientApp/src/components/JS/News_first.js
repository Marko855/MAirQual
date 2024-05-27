import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/news_first.css';
import air_pollution from '../../Images/air_pollution.jpg';
import PM2Concentration from '../../Images/PM2.5_concentracion.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faLinkedin, faFacebook} from '@fortawesome/free-brands-svg-icons';


export class News_first extends Component {
    render() {
        return (
            <div className="page-container">
                <div className="news-container">
                    <div className="news-content">
                        <h1 className="news-title">Breathing Easy: Countries with the Cleanest Air Revealed</h1>
                        <div className="news-image-container">
                            <img className="news-image" src={air_pollution} alt="Air pollution image" />
                            <p></p>
                            <p>Share this article:</p>
                            <div className="share-icons">
                                <a href="https://www.whatsapp.com" className="icon-link"><FontAwesomeIcon icon={faWhatsapp} /></a>
                                <a href="https://www.instagram.com" className="icon-link"><FontAwesomeIcon icon={faInstagram} /></a>
                                <a href="https://www.linkedin.com" className="icon-link"><FontAwesomeIcon icon={faLinkedin} /></a>
                                <a href="https://www.facebook.com" className="icon-link"><FontAwesomeIcon icon={faFacebook} /></a>
                            </div>

                        </div>
                        <Fragment>
                            <div className="news-details">
                                <Fragment>
                                    <h5 bold>Researchers describe air pollution as a significant worldwide health crisis.</h5>
                                    <p className="news-summary">According to a recent report by IQAir, air pollution has been deemed a worldwide health crisis by scientists.
                                        Out of 134 countries, territories, and regions surveyed, only seven met the criteria for safe air quality in 2023.
                                        Drawing data from over 30,000 monitoring stations, the World Air Quality Report highlights the alarming prevalence of PM2.5 particles,
                                        which exceed recommended levels in 124 locations.
                                        These tiny pollutants, measuring less than 2.5 microns, pose severe health risks, including respiratory and cardiovascular diseases,
                                        hypertension, asthma, mental health issues, and premature mortality.</p>
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Which seven nations have air quality that meets safety standards?</h5>
                                    <p>Seven countries, including Australia, Estonia, Finland, Grenada, Iceland, Mauritius, and New Zealand, maintain air quality within safe guidelines.
                                        Iceland leads in Europe with the cleanest air, followed by Estonia and Finland.
                                        Many European countries have improved air quality since the previous year.</p>
                                    <img className="news-image" src={PM2Concentration} alt="PM2.5 Concentration" />
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Which are the most polluted countries in the world?</h5>
                                    <p>South and Central Asia are home to the world's top 10 most polluted cities, with Bangladesh ranking highest, surpassing WHO guidelines by over 15 times.
                                        Pakistan and India follow closely, with pollution levels exceeding safe standards by 14 and 10 times, respectively.
                                        Canada is reported as North America's most polluted country, hosting 13 of the region's highly polluted cities.</p>
                                </Fragment>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
