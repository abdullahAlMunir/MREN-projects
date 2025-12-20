import React from 'react';
import FeatureStore from '../../store/FeatureStore';
import LegalContentSkeleton from '../../skeleton/LegalContentSkeleton';
import parse from 'html-react-parser';

const LegalContent = () => {

    const { legalDetails } = FeatureStore();


    if (!legalDetails) {
        return <LegalContentSkeleton />
    } else {
        return (
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            {parse(legalDetails.description)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default LegalContent;