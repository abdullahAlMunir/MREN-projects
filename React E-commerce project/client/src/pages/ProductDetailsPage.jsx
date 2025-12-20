import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useParams } from 'react-router-dom';
import Brands from '../components/product/Brands';
import ProductStore from '../store/ProductStore';
import Details from '../components/product/Details';

const ProductdetailsPage = () => {

    const {DetailsRequest, ReviewListRequest, BrandsListRequest, BrandsList} = ProductStore();
    const {id} = useParams();
    

    useEffect(() => {
        (async() => {
            await DetailsRequest(id);
            await ReviewListRequest(id);
            BrandsList === null ? await BrandsListRequest() : null;
        })()
    }, [BrandsList, BrandsListRequest, DetailsRequest, ReviewListRequest, id])


    return (
        <Layout>
            <Details />
            <Brands />
        </Layout>
    );
};

export default ProductdetailsPage;