import React from 'react';
import ProductStore from '../../store/ProductStore';
import CategoriesSkeleton from '../../skeleton/CategoriesSkeleton';
import { Link } from 'react-router-dom';

const Categories = () => {

    const { CategoryList } = ProductStore();

    if (CategoryList === null) {
        return <CategoriesSkeleton />
    } else {
        return (
            <div className="section py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-6">Top Categories</h2>
                        <p className="text-muted">Explore a World of Choices Across Our Most Popular <br />Shopping Categories</p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {CategoryList.map((item, i) => (
                            <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <Link to={`/byCategory/${item['_id']}`} className="text-decoration-none">
                                    <div className="card rounded-4 h-100 border-0 shadow-sm text-center category-card">
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                            <img
                                                src={item['categoryImg']}
                                                alt={item['categoryName']}
                                                className="img-fluid mb-3"
                                                style={{ maxHeight: '70px' }}
                                            />
                                            <p className="text-dark fw-semibold small">{item['categoryName']}</p>
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

export default Categories;