import React from 'react';
import Layout from '../components/layout/Layout';
import Brands from '../components/product/Brands';
import ProductStore from '../store/ProductStore';
import FeatureStore from '../store/FeatureStore';
import { useEffect } from 'react';
import Slider from '../components/product/Slider';
import Features from '../components/features/Features';
import Categories from '../components/product/Categories';
import Products from '../components/product/Products';

const HomePage = () => {

    const { BrandListRequest, CategoryListRequest, SliderListRequest, ListByRemarkRequest } = ProductStore();
    const { FeatureListRequest } = FeatureStore();

    useEffect(() => {
        (async () => {
            await SliderListRequest();
            await FeatureListRequest();
            await CategoryListRequest();
            await ListByRemarkRequest("new");
            await BrandListRequest();
        })()
    }, []);

    return (
        <Layout>
            <Slider />
            <Features />
            <Categories />
            <Products />
            <Brands />
        </Layout>
    );
};

export default HomePage;
