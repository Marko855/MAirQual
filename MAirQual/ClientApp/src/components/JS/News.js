import React, { Component } from 'react';
import '../CSS/news.css';
import air_pollution from '../../Images/air_pollution.jpg';
import { Link } from 'react-router-dom';
import sahara_dust from '../../Images/Sahara_dust.jpg';
import smoke from '../../Images/smoke.jpg';
import dubai_floods from '../../Images/dubai_floods.jpg';
import hospital from '../../Images/hospital.jpg';

export class News extends Component {
    render() {
        return (
            <div className="page-container">
                <div className="news-container">
                    <h1 className="title">News</h1>

                    <div className="article">
                        <img src={air_pollution} alt="Air pollution image" />
                        <div className="article-content">
                            <h4>Breathing Easy: Countries with the cleanest air revealed</h4>
                            <p>Only seven countries worldwide have air quality that meets safety standards...</p>
                            <a href="/News_first">Read Full Story</a>
                        </div>
                    </div>

                    <div className="article">
                        <img src={sahara_dust} alt="Sahara dust image" />
                        <div className="article-content">
                            <h4>Dust from the Sahara leads to air pollution throughout southern Europe</h4>
                            <p>Authorities in Crete recommended children and the elderly stay indoors...</p>
                            <a href="/News_second">Read Full Story</a>
                        </div>
                    </div>

                    <div className="article">
                        <img src={smoke} alt="Sahara dust image" />
                        <div className="article-content">
                            <h4>When are specialists predicting the dispersal of the wildfire smoke?</h4>
                            <p>Potential rain showers and winds may shift smoky conditions towards the west over the weekend for the Northeastern region of the United States...</p>
                            <a href="/News_third">Read Full Story</a>
                        </div>
                    </div>

                    <div className="article">
                        <img src={hospital} alt="Hospital image" />
                        <div className="article-content">
                            <h4>The Critical Importance of Air Quality in Hospitals and Doctor Offices</h4>
                            <p>Ensuring optimal air quality in hospitals and doctor offices is paramount to safeguarding both patients and healthcare professionals against potential health risks associated with airborne pollutants...</p>
                            <a href="/News_fifth">Read Full Story</a>
                        </div>
                    </div>

                    <div className="article">
                        <img src={dubai_floods} alt="Dubai floods image" />
                        <div className="article-content">
                            <h4>What is cloud seeding and did it cause Dubai flooding?</h4>
                            <p>Dubai has been hit by record floods over the past 24 hours, sparking misleading speculation about cloud seeding...</p>
                            <a href="/News_fourth">Read Full Story</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}