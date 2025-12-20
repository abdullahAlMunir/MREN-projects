import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import LegalContent from '../components/features/LegalContent';
import FeatureStore from '../store/FeatureStore';

const AboutPage = () => {

    const { legalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async() => {
            await legalDetailsRequest("about");
        })()
    }, [legalDetailsRequest])

    return (
        <Layout>
            <LegalContent />
        </Layout>
    );
};

export default AboutPage;