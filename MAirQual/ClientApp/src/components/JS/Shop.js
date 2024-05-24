import React, { Component } from 'react';
import '../CSS/shop.css';
import AirPruifier from '../../Images/air_purifier.jpg';
import CarAirPruifier from '../../Images/car_air_purifier.jpg';
import AirQualMonitor from '../../Images/airqual_monitor.jpg';
import Respirator from '../../Images/3M_Particulate_Respirator.jpeg';
import Humidifier from '../../Images/humidifier.jpg';
import Dehumidifier from '../../Images/dehumidifier2.jpg';

export class Shop extends Component {
    state = {
        products: [
            {
                id: 1, name: "Air Purifier", price: "20€ - 300€", image: AirPruifier, description: "Keep your indoor air clean and fresh with air purifier.",
                amazonLink: "https://www.amazon.com/s?k=air+purifier&crid=35H3VEPPD94A1&sprefix=air+purifier%2Caps%2C280&ref=nb_sb_ss_ts-doa-p_1_12"
            },
            {
                id: 2, name: "Car Air Purifier", price: "10€ - 250€", image: CarAirPruifier, description: "Enhance your driving experience with car air purifier, ensuring you breathe cleaner air on every journey.",
                amazonLink: "https://www.amazon.com/s?k=car+air+purifier&crid=Q5CYKWW7ICBB&sprefix=car+air+%2Caps%2C274&ref=nb_sb_ss_ts-doa-p_1_8"
            },
            {
                id: 3, name: "Air Quality Monitor", price: "30€ - 300€", image: AirQualMonitor, description: "Stay informed about your indoor air with air quality monitor, providing real-time updates for a healthier living environment.",
                amazonLink: "https://www.amazon.com/s?k=air+quality+monitor&crid=1CZ432BI3UYCM&sprefix=air+quali%2Caps%2C215&ref=nb_sb_ss_ts-doa-p_1_9"
            },
            {
                id: 4, name: "3M Particulate Respirator", price: "10€ - 100€", image: Respirator, description: "Classic disposable particulate respirator designed for personal safety.",
                amazonLink: "https://www.amazon.com/s?k=3M+Particulate+Respirator&crid=6SNBT8VT3VU0&sprefix=3m+particulate+respirato%2Caps%2C213&ref=nb_sb_noss_2"
            },
            {
                id: 5, name: "Humidifier", price: "15€ - 350€", image: Humidifier, description: "Restore optimal humidity levels in your home with humidifier, creating a comfortable atmosphere for better health and well-being.",
                amazonLink: "https://www.amazon.com/s?k=humidifier&crid=1W4CKRIV1XWHR&sprefix=humidi%2Caps%2C216&ref=nb_sb_ss_ts-doa-p_1_6"
            },
            {
                id: 6, name: "Dehumidifier", price: "40€ - 400€", image: Dehumidifier, description: "Combat excess moisture in your home with dehumidifier, keeping your space dry and comfortable while preventing mold and mildew growth.",
                amazonLink: "https://www.amazon.com/s?k=dehumidifier&crid=W4Z4HDWOVSXR&sprefix=dehumidifier%2Caps%2C218&ref=nb_sb_noss_1"
            }
        ]
    };

    render() {
        return (
            <div className="shop-frame">
                <div className="shop-content">
                    <h1 className="shop-header">Shop</h1>
                    <h5 className="shop-header">Shop for cleaner air, right from your screen!</h5>
                    <div className="products-container">
                        <div className="product-grid">
                            {this.state.products.map(product => (
                                <div key={product.id} className="product-container">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-description">{product.description}</p>
                                        <p className="product-price">{product.price}</p>
                                    </div>
                                    <a href={product.amazonLink} target="_blank" rel="noopener noreferrer">
                                        <button className="add-to-cart-button">Find a deal</button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
