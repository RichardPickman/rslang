import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './styles.scss';

interface SwiperProps {
  slides: JSX.Element[],
}

const CustomSwiper = ({ slides }: SwiperProps) => {

  return (
    <div style={{position:'relative'}}>
    <div className={'swiper-container'}>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={3}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="custom-swiper"
      >
        {slides.map((slide) => <SwiperSlide className={'slide'} key={slide.key}>{slide}</SwiperSlide>)}
      </Swiper>
    </div>
    </div>
  );
};

export default CustomSwiper;