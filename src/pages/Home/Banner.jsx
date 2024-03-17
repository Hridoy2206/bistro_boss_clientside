import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Autoplay } from 'swiper/modules';
import { useEffect, useState } from "react"
const Banner = () => {
    const [bannerImg, setBannerImg] = useState([]);
    useEffect(() => {
        fetch("bannerImg.json")
            .then(res => res.json())
            .then(data => {
                setBannerImg(data);
            })
    }, [])
    return (
        <div>
            <Swiper
                effect="fade"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                speed={1000}


                modules={[Autoplay, EffectFade]}
                className="mySwiper"
                loop={true}
            >
                <div>
                    {
                        bannerImg.map((sigleImg, index) => <SwiperSlide key={index}>
                            <div
                                className="h-[450px] lg:h-[900px] flex justify-center items-center max-w-none"
                                style={{
                                    backgroundImage: `url(${sigleImg.image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></div>
                        </SwiperSlide>)
                    }
                </div>
            </Swiper>
        </div>
    );
};

export default Banner;