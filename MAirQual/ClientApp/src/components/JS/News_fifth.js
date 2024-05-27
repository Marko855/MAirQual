import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/news_first.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import hospital from '../../Images/hospital.jpg';
import HAI_infection from '../../Images/HAI_infection.jpg';

export class News_fifth extends Component {
    render() {
        return (
            <div className="page-container">
                <div className="news-container">
                    <div className="news-content">
                        <h1 className="news-title">What is cloud seeding and did it cause Dubai flooding?</h1>
                        <div className="news-image-container">
                            <img className="news-image" src={hospital} alt="Hospital image" />
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
                                    <h5 bold>Understanding the yhreat of healthcare-acquired infections (HAIs)</h5>
                                    <p className="news-summary">Healthcare-acquired infections (HAIs) pose a significant risk to patients, healthcare workers, and entire health systems, particularly in the context of the COVID-19 pandemic.
                                        HAIs, often referred to as nosocomial infections, are infections contracted within medical facilities, contributing to millions of cases and thousands of deaths globally each year.
                                        However, accurate documentation of HAIs remains a challenge, with many countries lacking surveillance systems to track these infections effectively.</p>
                                    <img className="news-image" src={HAI_infection} alt="HAI infection" />
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>The Impact of HAIs on developed nations</h5>
                                    <p>HAIs are alarmingly prevalent in developed nations, with millions of cases reported annually in countries like the United States, Canada, and across the European Union. The COVID-19 pandemic further exacerbated the situation, highlighting the urgent need for robust infection control measures in healthcare settings.
                                        Despite advancements in medical technology, the incidence of HAIs continues to rise, necessitating proactive strategies to mitigate transmission and improve patient outcomes.</p>
                                </Fragment>
                                <div className="content-spacing"></div>
                                <Fragment>
                                    <h5 bold>Addressing the challenge: Strategies for infection control</h5>
                                    <p>ATo combat the spread of HAIs, healthcare facilities must prioritize infection control protocols, including comprehensive HVAC systems, air filtration technologies, and strict isolation precautions.
                                        Filtration equipment, such as HEPA filters, plays a crucial role in removing airborne pathogens, while negative pressure ventilation helps contain contaminated air. Additionally, environmental control measures, such as source capture systems, contribute to reducing the transmission of infectious agents.
                                        By implementing these strategies, healthcare providers can create safer environments for patients and staff, minimizing the risk of HAIs and safeguarding public health.</p>
                                </Fragment>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
