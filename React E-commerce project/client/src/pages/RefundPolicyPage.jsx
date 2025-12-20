import React, { useEffect } from 'react';
import FeatureStore from '../store/FeatureStore';
import Layout from '../components/layout/Layout';
import LegalContent from '../components/features/LegalContent';


const RefundPolicyPage = () => {
    const { legalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async() => {
            await legalDetailsRequest("refund");
        })()
    }, [legalDetailsRequest])

    return (
        <Layout>
            <LegalContent />
        </Layout>
    );
};

export default RefundPolicyPage;