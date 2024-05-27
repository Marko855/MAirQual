import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/news_first.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import sahara_dust from '../../Images/Sahara_dust.jpg';
import mud_rain from '../../Images/mud_rain.jpg';


export class News_second extends Component {
    render() {
        return (
            <div className="page-container">
                <div className="news-container">
                    <div className="news-content">
                        <h1 className="news-title">Dust from the Sahara leads to air pollution throughout southern Europe</h1>
                        <div className="news-image-container">
                            <img className="news-image" src={sahara_dust} alt="Air pollution image" />
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
                                    <h5 bold>Saharan dust storm sweeps across Europe</h5>
                                    <p className="news-summary">A massive dust storm originating from the Sahara Desert is blanketing vast areas of southern and eastern Europe, impacting popular Mediterranean destinations like Greece and Malta.
                                        The surge in dust has led to air pollution levels soaring to as much as 10 times higher than recommended standards in affected regions.
                                        According to the Copernicus EU monitoring service, the dust cloud is not only affecting air quality but also causing reduced visibility and phenomena like mud rain—a mixture of rain and dust.</p>
                                    <img className="news-image" src={mud_rain} alt="Mud rain image" />
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>European response and impact</h5>
                                    <p>Following closely on the heels of a similar event in the Iberian Peninsula, where Spain and Portugal were significantly impacted, this latest dust cloud is causing concern across southern Italy, Malta, Greece, Libya, and Tunisia.
                                        In Athens, visibility has been notably reduced, prompting authorities in Greek islands like Crete to issue health advisories due to airborne particle concentrations surpassing safe levels.
                                        Vulnerable groups, including individuals with respiratory conditions, children, and the elderly, have been advised to limit outdoor activities and remain indoors whenever possible.</p>
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Forecast and public reaction</h5>
                                    <p>Meteorological experts predict that the dust and pollution should dissipate in the coming days as wind patterns shift.
                                        Theodoros Kolydas, director of Greece’s National Meteorological Centre, anticipates an improvement in air quality across the region.
                                        However, residents are grappling with the thick air caused by the dust cloud, with one individual likening the experience to "the air being full of custard powder."
                                        Satellite imagery shared by the Met Office at the RAF base in Akrotiri,
                                        Cyprus, illustrates the extent of the dust cloud's reach, indicating further challenges ahead for affected areas.</p>
                                </Fragment>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
