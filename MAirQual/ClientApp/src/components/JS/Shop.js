import React, { Component } from 'react';
import '../CSS/shoppingCart.css';
import AirPruifier from '../../Images/air_purifier.jpg';
import CarAirPruifier from '../../Images/car_air_purifier.jpg';
import AirQualMonitor from '../../Images/airqual_monitor.jpg';
import Respirator from '../../Images/3M_Particulate_Respirator.jpeg';
import Humidifier from '../../Images/humidifier.jpg';
import Dehumidifier from '../../Images/dehumidifier2.jpg';

export class Shop extends Component {
    state = {
        products: [
            { id: 1, name: "Air Purifier", price: 40, image: AirPruifier, description: "Keep your indoor air clean and fresh with this efficient air purifier." },
            { id: 2, name: "Car Air Purifier", price: 50, image: CarAirPruifier, description: "Enhance your driving experience with this compact car air purifier, ensuring you breathe cleaner air on every journey." },
            { id: 3, name: "Air Quality Monitor", price: 150, image: AirQualMonitor, description: "Stay informed about your indoor air with this intuitive air quality monitor, providing real-time updates for a healthier living environment." },
            { id: 4, name: "3M Particulate Respirator", price: 15, image: Respirator, description: "Classic disposable particulate respirator designed for personal safety." },
            { id: 5, name: "Humidifier", price: 35, image: Humidifier, description: "Restore optimal humidity levels in your home with this reliable humidifier, creating a comfortable atmosphere for better health and well-being." },
            { id: 6, name: "Dehumidifier", price: 100, image: Dehumidifier, description: "Combat excess moisture in your home with this powerful dehumidifier, keeping your space dry and comfortable while preventing mold and mildew growth." }
        ]
    };

    render() {
        return (
            <div className="shop-content">
                <div className="header-whole">
                    <h1 className="shop-header">Shop</h1>
                    <h5 className="shop-header">Clear skies ahead: Shop for cleaner air, right from your screen!</h5>
                </div>
                <div className="products-container">
                    <div className="product-grid">
                        {this.state.products.map(product => (
                            <div key={product.id} className="product-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <p className="product-price">{product.price}€</p>
                                </div>
                                <button className="add-to-cart-button">Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
