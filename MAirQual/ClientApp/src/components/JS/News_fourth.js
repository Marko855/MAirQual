import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/news_first.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import dubai_floods from '../../Images/dubai_floods.jpg';
import dubai_floods2 from '../../Images/dubai_flood2.jpg';
import cloud_seeding from '../../Images/cloud_seeding.jpg';



export class News_fourth extends Component {
    render() {
        return (
            <div className="page-container">
                <div className="news-container">
                    <div className="news-content">
                        <h1 className="news-title">What is cloud seeding and did it cause Dubai flooding?</h1>
                        <div className="news-image-container">
                            <img className="news-image" src={dubai_floods} alt="Dubai floods image" />
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
                                    <h5 bold>Unprecedented rainfall hits Dubai</h5>
                                    <p className="news-summary">The northeastern region of the United States is grappling with dense smoke originating from over 400 wildfires raging across Canada.
                                        Dubai, known for its arid climate, experienced an extraordinary weather event as heavy rainfall inundated the region, with the city of Al-Ain recording a staggering 256mm (10in) of rain in just 24 hours.
                                        This deluge, far surpassing the area's annual average rainfall of less than 100mm (3.9in), left streets flooded and residents grappling with the aftermath of the extreme weather..</p>
                                    <img className="news-image" src={dubai_floods2} alt="Dubai floods image" />
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Climate change's influence on extreme rainfall</h5>
                                    <p>While the exact role of climate change in exacerbating the intensity of the rainfall is still under investigation, experts suggest that warmer temperatures, a hallmark of climate change, can lead to increased moisture in the atmosphere, thereby intensifying rainfall events.
                                        This aligns with the record-breaking intensity of the rain observed in Dubai, highlighting the potential consequences of a warming climate on weather patterns and extreme events.</p>
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Cloud seeding and adaptation measures</h5>
                                    <p>Amid speculation about the role of cloud seeding in the extreme weather, experts emphasize that while cloud seeding may have a marginal effect on rainfall, the primary drivers of such intense weather events are broader climatic factors.
                                        As the UAE grapples with the impacts of more frequent and intense rainfall, adaptation measures such as robust drainage systems and infrastructure adjustments become imperative to mitigate the risks of flooding and safeguard against future weather extremes.</p>
                                    <img className="news-image" src={cloud_seeding} alt="Cloud seeding image" />
                                </Fragment>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
