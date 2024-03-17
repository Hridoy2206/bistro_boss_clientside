import React from 'react';

const CoverBanner = ({ bgImage, title }) => {
    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className='bg-cover lg:p-32 p-8'>
            <div className='bg-gray-800 bg-opacity-60 lg:px-32 px-10 lg:py-20 py-8 mt-24 mx-auto text-white text-center'>
                <h1 className='uppercase text-3xl lg:text-5xl font-semibold font-serif mb-2'>{title}</h1>
                <p className='text-sm uppercase'>would you like to try a dish?</p>
            </div>
        </div>
    );
};

export default CoverBanner;