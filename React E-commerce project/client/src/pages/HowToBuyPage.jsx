import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import FeatureStore from '../store/FeatureStore';
import LegalContent from '../components/features/LegalContent';

const HowToBuyPage = () => {
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

export default HowToBuyPage;