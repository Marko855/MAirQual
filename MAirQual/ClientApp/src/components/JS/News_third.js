import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/news_first.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import canada_wildfire from '../../Images/canada_wildfire.jpeg';
import smoke_masks from '../../Images/smoke_masks.jpg'

export class News_third extends Component {
    render() {
        return (
            <div className="page-container">
                <div className="news-container">
                    <div className="news-content">
                        <h1 className="news-title">When are specialists predicting the dispersal of the wildfire smoke?</h1>
                        <div className="news-image-container">
                            <img className="news-image" src={canada_wildfire} alt="Canada wildfire image" />
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
                                    <h5 bold>Smoke blankets Northeastern US</h5>
                                    <p className="news-summary">The northeastern region of the United States is grappling with dense smoke originating from over 400 wildfires raging across Canada.
                                        These wildfires have scorched over six million acres of land and triggered mass evacuations.
                                        The smoke has significantly dimmed the skies and posed breathing difficulties in numerous states and major cities, including New York, Toronto, Ottawa, Washington DC, and Philadelphia, alongside extensive areas of Canada.</p>
                                    <img className="news-image" src={smoke_masks} alt="Smoke masks image" />
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Health risks and recommendations</h5>
                                    <p>Public health officials are advising individuals, especially vulnerable populations such as children, the elderly, and those with underlying health conditions like asthma and heart disease, to remain indoors as much as possible in areas with "unhealthy" levels of air pollution.
                                        Wearing masks when venturing outside is also encouraged to mitigate the risks associated with inhaling the smoky air.
                                        However, despite these precautions, the situation remains critical, with Canadian officials warning of potentially record-breaking wildfire activity.</p>
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Improving conditions and continued concerns</h5>
                                    <p>While conditions in the Northeast have started to ameliorate, with the Air Quality Index (AQI) showing signs of improvement in cities like New York, Washington DC, and Philadelphia, concerns persist as smoke continues to drift southward.
                                        The National Weather Service predicts a shift in the smoke flow towards a more westerly direction by the weekend, potentially affecting states in the Mid-Atlantic region.
                                        As the fires in Canada continue to burn and generate smoke, the situation remains fluid, with ongoing monitoring and precautionary measures necessary to safeguard public health.</p>
                                </Fragment>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
