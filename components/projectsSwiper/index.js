import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
export default function ProjectsSwiper({ header, products, bg }) {
  return (
    <div className={styles.wrapper}>
      {header && (
        <div
          className={styles.header}
          style={{ background: `${bg ? bg : ""}` }}
        >
          {header}
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {products.map((project,id) => (
          // eslint-disable-next-line react/jsx-key
          <SwiperSlide>
            <div className={styles.project}>
              <div className={styles.project__img}>
                <img key={id} src={project.image} alt="" />
              </div>
              <div className={styles.project__infos}>
                <h1>
                  {project.name.length > 30
                    ? `${project.name.slice(0, 30)}...`
                    : project.name}
                </h1>
                {project.price}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}