import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// CSS
import 'swiper/swiper-bundle.css';
import './Slider.css';
// import '../../App.css';

import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

import slide1 from '../../assets/images/slider/1.jpg';
import slide2 from '../../assets/images/slider/2.jpg';
import slide3 from '../../assets/images/slider/3.jpg';
import slide4 from '../../assets/images/slider/4.jpg';
import slide5 from '../../assets/images/slider/5.jpg';
import slide6 from '../../assets/images/slider/6.jpg';

function MySlider() {
    const images = [slide1, slide2, slide3, slide4, slide5, slide6];

    return (
        <main className="slider">
            <Swiper
                className='slider-container'
                modules={[Navigation, Pagination]}
                spaceBetween={
                    images.length > 1 ? 0 : 0
                }
                slidesPerView={1}
                navigation={{
                    prevEl: ".custom-prev-button",
                    nextEl: ".custom-next-button"
                }}
                pagination={{
                    clickable: true,
                }}
                loop
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className='slider-slide'>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="nav-btn custom-prev-button">
                <KeyboardBackspaceOutlinedIcon />
            </div>
            <div className="nav-btn custom-next-button">
                <EastOutlinedIcon />
            </div>
        </main>
    );
}

export default MySlider;
