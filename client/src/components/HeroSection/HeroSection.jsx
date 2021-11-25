import React from 'react'
import banner1 from '../assets/images/adidas-banner.jpg';
import banner2 from '../assets/images/balance-banner.jpg';
import banner3 from '../assets/images/converse-banner.jpg';
import banner4 from '../assets/images/jordan-banner.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';


function HeroSection() {
    return (
        
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={banner1} className="d-block w-100" alt="Banner 1"/>
                    </div>
                    <div className="carousel-item">
                    <img src={banner2} className="d-block w-100" alt="Banner 2"/>
                    </div>
                    <div className="carousel-item">
                    <img src={banner3} className="d-block w-100" alt="Banner 3"/>
                    </div>
                    <div className="carousel-item">
                    <img src={banner4} className="d-block w-100" alt="Banner 4"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        
    )
}

export default HeroSection