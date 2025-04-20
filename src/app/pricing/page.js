import React from 'react';

const page = () => {
    return (
        <div>
            <h1>Pricing</h1>
            <p>Explore our range of services designed to elevate your brand.</p>
            {/* Add your service-related components here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Content Creation</h2>
                    <p>High-quality content tailored to your brand's voice.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Influencer Marketing</h2>
                    <p>Connect with top influencers to boost your brand visibility.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Analytics & Insights</h2>
                    <p>Data-driven insights to optimize your marketing strategies.</p>
                </div>
                </div>
        </div>
    );
};

export default page;