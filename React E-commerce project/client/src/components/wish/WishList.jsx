import React, { useEffect } from 'react';
import WishStore from '../../store/WishStore';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ProductsSkeleton from '../../skeleton/ProductsSkeleton';
import NoData from '../layout/NoData';
import ProductStore from '../../store/ProductStore';


const WishList = () => {
    const { WishListRequest, WishList, RemoveWishListRequest } = WishStore();

    const {DetailsRequest} = ProductStore();

    useEffect(() => {
        (async () => {
            (
                async () => {
                    await WishListRequest()
                }
            )
        })()
    }, [WishListRequest])

    const remove = async (_id) => {
        await RemoveWishListRequest(_id)
        await WishListRequest();
    }

    if (WishList === null) {
        return (
            <div className="container">
                <div className="row">
                    <ProductsSkeleton />
                </div>
            </div>
        )
    } else if (WishList.length === 0) {
        return (
            <NoData />
        )
    } else {
        return (
            <div className="container mt-3">
                <div className="text-center mb-5 pt-5">
                    <h2 className="fw-bold display-6">Your Wishlist</h2>
                    <p className="text-muted">Save Your Favorites and Keep Track of Must-Have Items <br />All in One Convenient Place</p>

                </div>
                <div className="row">

                    {
                        WishList.map((item, i) => {
                            let price = <p className="bodyMedium text-dark my-1">Price: ${item['product']['price']} </p>
                            if (item['product']['discount'] === true) {
                                price = <p className="bodyMedium  text-dark my-1">Price:<strike> ${item['product']['price']} </strike> ${item['product']['discountPrice']} </p>
                            }
                            return (
                                <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                    <div className="card shadow-sm h-100 rounded-3 bg-white">
                                        <img alt="" className="w-100 rounded-top-2" src={item['product']['image']} />
                                        <div className="card-body">
                                            <p className="bodySmal text-secondary my-1">{item['product']['title']}</p>
                                            {price}
                                            <StarRatings rating={parseFloat(item['product']['star'])} starRatedColor="gold" starDimension="15px" starSpacing="2px" />

                                            <p className="mt-3">
                                                <button onClick={async () => { await remove(item['product']['_id']) }} className="btn  btn-outline-danger btn-sm">Remove</button>
                                                <Link className="btn mx-2 btn-outline-Success btn-sm" to={`/details/${item['product']["_id"]}`}>Details</Link>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
};

export default WishList;