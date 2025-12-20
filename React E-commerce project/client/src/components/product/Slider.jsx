import React from 'react';
import ProductStore from '../../store/ProductStore';
import SliderSkeleton from '../../skeleton/SliderSkeleton';
import { Link } from 'react-router-dom';

const Slider = () => {

    const { SliderList } = ProductStore();

    if (SliderList === null) {
        return <SliderSkeleton />
    } else {
        return (
            <div className="hero-section bg-light py-4 py-lg-5">
                <div
                    id="homepageHeroCarousel"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                >

                    {/* Indicators */}
                    <div className="carousel-indicators">
                        {SliderList.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                data-bs-target="#homepageHeroCarousel"
                                data-bs-slide-to={i}
                                className={i === 0 ? "active" : ""}
                                aria-current={i === 0 ? "true" : undefined}
                            />
                        ))}
                    </div>

                    {/* Slides */}
                    <div className="carousel-inner">
                        {SliderList.map((item, i) => (
                            <div
                                key={i}
                                className={`carousel-item ${i === 0 ? "active" : ""}`}
                                data-bs-interval="5000"
                            >
                                <div className="container">
                                    <div className="row align-items-center g-4 py-4 py-lg-5">

                                        {/* Text */}
                                        <div className="col-12 col-lg-6 text-center text-lg-start">
                                            <h1 className="fw-bold display-6 display-lg-4 mb-3 text-dark">
                                                {item.name}
                                            </h1>

                                            <h4 className="fw-semibold text-Success mb-3">
                                                {item.price}
                                            </h4>

                                            <p className="text-muted mb-4">
                                                {item.description}
                                            </p>

                                            <Link
                                                to={`/details/${item.productID}`}
                                                className="btn btn-Success btn-lg px-4 rounded-pill"
                                            >
                                                Buy Now
                                            </Link>
                                        </div>

                                        {/* Image */}
                                        <div className="col-12 col-lg-6 text-center">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="img-fluid rounded-4 shadow"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#homepageHeroCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#homepageHeroCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
                    </button>
                </div>
            </div>

        );
    }
};

export default Slider;