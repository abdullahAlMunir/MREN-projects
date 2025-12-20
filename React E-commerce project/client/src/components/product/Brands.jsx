import React from 'react';
import ProductStore from '../../store/ProductStore';
import BrandsSkeleton from '../../skeleton/BrandsSkeleton';
import { Link } from 'react-router-dom';

const Brands = () => {

    const { BrandList } = ProductStore();

    if (BrandList === null) {
        return <BrandsSkeleton />
    } else {
        return (
            <div className="section py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-6">Top Brands</h2>
                        <p className="text-muted">Explore a World of Choices Across Our Most Popular <br />Shopping Categories</p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {BrandList.map((item, i) => (
                            <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <Link to={`/byBrand/${item['_id']}`} className="text-decoration-none">
                                    <div className="card rounded-4 border-0 shadow-lg h-100 text-center brands-card hover-shadow transition">
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                            <img src={item['brandImg']} alt={item['brandName']} className="img-fluid mb-3" />
                                            <p className="text-dark fw-semibold small">{item['brandName']}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        );
    }
};

export default Brands;