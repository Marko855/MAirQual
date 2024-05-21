import React, { Component } from 'react';
import '../CSS/news.css'; 

export class News extends Component {
    render() {
        return (
            <div className="news-container">
                <h1>News</h1>

                <div className="article">
                    <img src="https://via.placeholder.com/150" alt="Article Image" />
                    <div className="article-content">
                        <h2>Article Title</h2>
                        <p>Article summary or introduction...</p>
                        <a href="#">Read More</a>
                    </div>
                </div>

                <div className="article">
                    <img src="https://via.placeholder.com/150" alt="Article Image" />
                    <div className="article-content">
                        <h2>Article Title</h2>
                        <p>Article summary or introduction...</p>
                        <a href="">Read More</a>
                    </div>
                </div>

                {/* Add more articles as needed */}

            </div>
        );
    }
}