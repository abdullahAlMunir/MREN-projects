import React from 'react';
import ProductStore from '../../store/ProductStore';
import StarRatings from "react-star-ratings/build/star-ratings.js";


const Reviews = () => {

    const { ReviewList } = ProductStore();


    return (
        <div>
            <ul className="list-group list-group-flush">
                {
                    ReviewList !== null ? (
                        ReviewList.map((item, i) => {
                            return <li key={i} className="list-group-item bg-transparant">
                                <h6><i className="bi bi-person"></i> {item["profile"]["customerName"]}</h6>
                                <StarRatings rating={parseFloat(item['rating'])} starRatedColor="gold" starDimension="16px" starSpacing="2px" />
                                <p className='mt-3'>{item["des"]}</p>
                            </li>
                        })
                    ) : (<span></span>)
                }
            </ul>
        </div>
    );
};

export default Reviews;