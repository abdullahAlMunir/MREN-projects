import React, { useEffect } from 'react';
import FeatureStore from '../store/FeatureStore';
import Layout from '../components/layout/Layout';
import LegalContent from '../components/features/LegalContent';



const TermsPage = () => {
    const { legalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async () => {
            await legalDetailsRequest("privacy");
        })()
    }, [legalDetailsRequest])

    return (
        <Layout>
            <LegalContent />
        </Layout>
    );
};

export default TermsPage;