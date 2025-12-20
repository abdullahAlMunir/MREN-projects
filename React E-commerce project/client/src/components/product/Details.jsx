import React, { useState } from 'react';
import ProductImages from './ProductImages';
import ProductStore from '../../store/ProductStore';
import ProductDetailsSkeleton from '../../skeleton/ProductDetailsSkeleton';
import parse from 'html-react-parser';
import Reviews from './Reviews';
import CartStore from '../../store/CartStore';

import { toast } from 'react-hot-toast';
import CartSubmitButton from '../cart/CartSubmitButton';
import WishStore from '../../store/WishStore';
import WishSubmitButton from '../wish/WishSubmitButton';

const Details = () => {

    const { Details } = ProductStore();
    const [Quantity, SetQuantity] = useState(1);

    const { CartFromOnChange, CartForm, CartSaveRequest, CartListRequest } = CartStore();


    const incrementQuantity = (() => {
        SetQuantity(Quantity => Quantity + 1);
    })

    const decrementQuantity = (() => {
        if (Quantity > 1) {
            SetQuantity(Quantity => Quantity - 1);

        }
    })

    const AddToCart = async (productID) => {
        // Set price in CartForm before saving, multiply by Quantity to get total price
        let priceToSet = Details[0]["discount"] ? Details[0]["discountPrice"] : Details[0]["price"];
        CartFromOnChange("price", priceToSet * Quantity);

        const PostBody = {
            ...CartForm,
            price: priceToSet * Quantity
        }

        // let res = await CartSaveRequest(CartForm, productID, Quantity);
        let res = await CartSaveRequest(PostBody, productID, Quantity);

        if (res) {
            toast.success("This product is added to Cart successfully.");
            await CartListRequest();
        }
    }

    const { WishSaveRequest, WishListRequest } = WishStore();

    const AddToWish = async (_id) => {
        let res = await WishSaveRequest(_id);       
        if (res) {
            toast.success("This product is added in your Wish list.");
            await WishListRequest();
        }
    }

    if (Details === null) {
        return <ProductDetailsSkeleton />;
    } else {
        return (
            <div className="container py-5">
                <div className="row gy-4 align-items-start">
                    {/* Product Image Section */}
                    <div className="col-lg-6">
                        <div className="bg-light rounded-4 shadow-lg p-3 position-relative overflow-hidden">
                            <ProductImages />
                            <span className="badge bg-danger position-absolute top-0 end-0 m-3 px-3 py-2 fs-6">
                                {

                                }
                            </span>
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="col-lg-6">
                        <div className="rounded-4 p-4 bg-white shadow-lg">
                            <h2 className="fw-bold mb-3">{Details[0]["title"]}</h2>
                            <p className="text-muted mb-1">Category: <strong className="text-dark">{Details[0]["category"]["categoryName"]}</strong></p>

                            <p className="text-muted mb-3">Brands: <strong className="text-dark">{Details[0]["brand"]["brandName"]}</strong></p>

                            <p className="text-secondary small mb-4">

                            </p>

                            <div className="d-flex align-items-center gap-3 mb-4">
                                <span className='bodyXLarge'>
                                    {
                                        Details[0]["discount"] ? (
                                            Quantity > 1 ? <span>Price: <strike className="text-danger fw-bold mb-0">${Details[0]["price"] * Quantity}</strike> ${Details[0]["discountPrice"] * Quantity}</span> : (
                                                <span>Price: <strike className="text-danger fw-bold mb-0">${Details[0]["price"]}</strike> ${Details[0]["discountPrice"]}</span>
                                            )
                                        ) : (
                                            <span>Price: {Details[0]["price"]}</span>
                                        )
                                    }
                                </span>
                            </div>

                            <div className="row gy-3">
                                {/* Size */}
                                <div className="col-md-4">
                                    <label className="form-label small text-muted">Size</label>
                                    <select
                                        className="form-select shadow-sm rounded-3"
                                        value={CartForm.size}
                                        onChange={(e) => CartFromOnChange("size", e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {
                                            Details[0]["details"]["size"].split(",").map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                {/* Color */}
                                <div className="col-md-4">
                                    <label className="form-label small text-muted">Color</label>
                                    <select
                                        className="form-select shadow-sm rounded-3"
                                        value={CartForm.color}
                                        onChange={(e) => CartFromOnChange("color", e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {
                                            Details[0]["details"]["color"].split(",").map((item, i) => {
                                                return <option key={i} value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                {/* Quantity */}
                                <div className="col-md-4">
                                    <label className="form-label small text-muted">Quantity</label>
                                    <div className="input-group shadow-sm rounded-3 overflow-hidden">
                                        <button onClick={decrementQuantity} className="btn btn-outline-dark">-</button>
                                        <input value={Quantity} type="text" className="form-control text-center" readOnly />
                                        <button onClick={incrementQuantity} className="btn btn-outline-dark">+</button>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="d-flex flex-wrap gap-3 mt-4">
                                <CartSubmitButton className="btn btn-dark px-4 py-2 w-100 w-md-auto" onClick={async () => { await AddToCart(Details[0]["_id"]) }} text="Add to Cart" />

                                <WishSubmitButton className="btn btn-outline-dark px-4 py-2 w-100 w-md-auto" onClick={async () => { await AddToWish(Details[0]["_id"]) }} text="WishList" />

                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="row mt-5">
                    <div className="col-lg-12">
                        <div className="bg-white rounded-4 shadow-lg p-4">
                            <ul className="nav nav-pills mb-3" id="productTabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="specs-tab" data-bs-toggle="pill" data-bs-target="#specs"
                                        type="button" role="tab">Specifications</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="reviews-tab" data-bs-toggle="pill" data-bs-target="#reviews"
                                        type="button" role="tab">Reviews</button>
                                </li>
                            </ul>

                            <div className="tab-content" id="productTabContent">
                                <div className="tab-pane fade show active" id="specs" role="tabpanel">
                                    <p className="text-secondary small">
                                        {
                                            parse(Details[0]["details"]["description"])
                                        }
                                    </p>

                                </div>
                                <div className="tab-pane fade" id="reviews" role="tabpanel">
                                    <Reviews />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Details;
