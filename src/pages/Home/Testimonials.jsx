import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
//Star rating input
import { Rating } from '@smastrom/react-rating'
import { AiOutlineCluster } from 'react-icons/ai';
import '@smastrom/react-rating/style.css'
import SectionHeading from '../../components/SectionHeading';

const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('https://bistro-boss-server-two-sage.vercel.app/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className='lg:w-10/12 mx-auto mb-16'>
            <SectionHeading
                subheading="-- What our clients say --"
                heading="Testimonials"
            />

            <Swiper
                navigation={true}
                modules={[Navigation]}
                loop={true}
                className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className='text-center lg:px-24 px-10'>
                            <Rating className='w-full mx-auto lg:mb-5 mb-2'
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <AiOutlineCluster className='text-center w-full text-5xl mb-5 hidden lg:block' />

                            <p>{review.details}</p>
                            <p className='text-orange-400 text-2xl font-semibold'>{review.name}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;