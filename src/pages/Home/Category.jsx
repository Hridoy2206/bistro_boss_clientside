import category1 from "../../assets/home/slide1.jpg"
import category2 from "../../assets/home/slide2.jpg"
import category3 from "../../assets/home/slide3.jpg"
import category4 from "../../assets/home/slide4.jpg"
import category5 from "../../assets/home/slide5.jpg"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
const Category = () => {

    return (
        <div className="lg:my-24 my-16">
            <Swiper
                slidesPerView={4}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                loop={true}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
            >
                <SwiperSlide><img className="w-full lg:h-96 h-80 object-cover relative" src={category1} alt="" /><h1 className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white">Salad</h1></SwiperSlide>
                <SwiperSlide><img className="w-full lg:h-96 h-80 object-cover relative" src={category2} alt="" /><h1 className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white">Salad</h1></SwiperSlide>
                <SwiperSlide><img className="w-full lg:h-96 h-80 object-cover relative" src={category3} alt="" /><h1 className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white">Salad</h1></SwiperSlide>
                <SwiperSlide><img className="w-full lg:h-96 h-80 object-cover relative" src={category4} alt="" /><h1 className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white">Salad</h1></SwiperSlide>
                <SwiperSlide><img className="w-full lg:h-96 h-80 object-cover relative" src={category5} alt="" /><h1 className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white">Salad</h1></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;