import React, { useEffect } from 'react';
import ProductStore from '../store/ProductStore';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductList from '../components/product/ProductList';

const ProductByKeyword = () => {
    const { ListByKeywordRequest } = ProductStore();
    const { Keyword } = useParams();

    useEffect(() => {
        (async () => {
            await ListByKeywordRequest(Keyword);
        })()
    }, [ListByKeywordRequest, Keyword])

    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByKeyword;