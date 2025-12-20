import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import LegalContent from '../components/features/LegalContent';
import FeatureStore from '../store/FeatureStore';

const ContactPage = () => {
    const { legalDetailsRequest } = FeatureStore();

    useEffect(() => {
        (async() => {
            await legalDetailsRequest("contact");
        })()
    }, [legalDetailsRequest])

    return (
        <Layout>
            <LegalContent />
        </Layout>
    );
};

export default ContactPage;