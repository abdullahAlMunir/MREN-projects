import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import LegalContent from '../components/features/LegalContent';
import FeatureStore from '../store/FeatureStore';

const ComplainPage = () => {
    const { legalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async () => {
            await legalDetailsRequest("howtobuy");
        })()
    }, [legalDetailsRequest])

    return (
        <Layout>
            <LegalContent />
        </Layout>
    );
};

export default ComplainPage;