import React, { useEffect, useState } from 'react';
import ProductStore from '../../store/ProductStore';
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import { Link } from 'react-router-dom';

const PorductList = () => {

    const { ListProduct, BrandListRequest, BrandList, CategoryListRequest, CategoryList, ListByFilterRequest } = ProductStore();

    let [Filter, SetFilter] = useState({ brandID: "", categoryID: "", priceMax: "", priceMin: "" });

    let inputOnChange = async (name, value) => {
        SetFilter((data) => ({
            ...data,
            [name]: value
        }))
    }

    useEffect(() => {
        (async () => {
            BrandList === null ? await BrandListRequest() : null;
            CategoryList === null ? await CategoryListRequest() : null;

            let isEveryFilterPropertyEmpty = Object.values(Filter).every(value => value === "");
            !isEveryFilterPropertyEmpty ? await ListByFilterRequest(Filter) : null
        })()
    }, [Filter]);

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card vh-100 p-3 shadow-sm">
                        <label className="form-label mt-3">Brands</label>
                        <select value={Filter.brandID} onChange={async (e) => { await inputOnChange("brandID", e.target.value) }} className="form-control form-select">
                            <option value="">Choose Brands</option>
                            {
                                BrandList !== null ? (
                                    BrandList.map((item, i) => {
                                        return (
                                            <option key={i} value={item["_id"]}>{item["brandName"]}</option>
                                        )
                                    })
                                ) : <option></option>
                            }
                        </select>
                        <label className="form-label mt-3">Categories</label>
                        <select value={Filter.categoryID} onChange={async (e) => { await inputOnChange("categoryID", e.target.value) }} className="form-control form-select">
                            <option value="">Choose Category</option>
                            {
                                CategoryList !== null ? (
                                    CategoryList.map((item, i) => {
                                        return (
                                            <option key={i} value={item["_id"]}>{item["categoryName"]}</option>
                                        )
                                    })
                                ) : <option></option>
                            }
                        </select>
                        <label className="form-label mt-3">Maximum Price ${Filter.priceMax}</label>
                        <input value={Filter.priceMax} onChange={async (e) => { await inputOnChange("priceMax", e.target.value) }} min={0} max={1000000} step={1000} type='range' className='form-range' />

                        <label className="form-label mt-3">Minimum Price ${Filter.priceMin}</label>
                        <input value={Filter.priceMin} onChange={async (e) => { await inputOnChange("priceMin", e.target.value) }} min={0} max={1000000} step={1000} type='range' className='form-range' />
                    </div>
                </div>
                <div className="col-md-9 p-2">
                    <div className="container">
                        <div className="row">
                            {
                                ListProduct === null ? (
                                    <ProductsSkeleton />
                                ) : (
                                    <div className="row g-4">
                                        {
                                            ListProduct.map((item, i) => {
                                                const hasDiscount = item['discount'] === true;
                                                const priceDisplay = hasDiscount ? (
                                                    <p className="mb-1">
                                                        <span className="text-muted text-decoration-line-through me-2">${item['price']}</span>
                                                        <span className="fw-bold text-dark">${item['discountPrice']}</span>
                                                    </p>
                                                ) : (
                                                    <p className="mb-1 text-dark fw-medium">Price: ${item['price']}</p>
                                                );

                                                return (
                                                    <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                                        <Link to={`/details/${item['_id']}`} className="card h-100 shadow-sm border-0 hover-shadow rounded-4 text-decoration-none bg-white">
                                                            <img src={item['image']} className="card-img-top rounded-top-4" alt={item['title']} />
                                                            <div className="card-body">
                                                                <h6 className="text-dark fw-semibold">{item['title']}</h6>
                                                                {hasDiscount && <span className="badge bg-danger mb-2">Sale</span>}
                                                                {priceDisplay}
                                                                <StarRatings
                                                                    rating={parseFloat(item['star'])}
                                                                    starRatedColor="gold"
                                                                    starDimension="16px"
                                                                    starSpacing="2px"
                                                                />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PorductList;