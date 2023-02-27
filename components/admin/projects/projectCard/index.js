import styles from "./styles.module.scss";
import { Swiper, SwiperSlide, Scrollbar } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay} from "swiper";
import EmblaCarousel from "../../../carousel/EmblaCarousel"
import Image from "next-images";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/navigation";
//import { Navigation } from "swiper";

import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import TextInput from "./TextInput";

SwiperCore.use([Autoplay,Navigation, Pagination,]);
export default function ProjectCard({ project}) {
  // SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

  return (
    <div className={styles.project}>
      <h1 className={styles.project__name}>{project.name}</h1>
      <h2 className={styles.project__category}>#{project.category_docs.name}
      <Link href={`/project/${project.slug}`} style={{height:50}}>
                  <TbEdit  />
                </Link>
      </h2>
  
      <EmblaCarousel slides={project.images} />

    </div>
  );
}

/*
--------------23/02/23
      {/* 
      <Swiper
     
      modules={[Autoplay, Pagination]}
      pagination={{clickable: true}}
      slidesPerView={1}
      autoplay={{delay:1000,pauseOnMouseEnter: true, disableOnInteraction: false}}
      centeredSlides={true} 
      loop={true}
        spaceBetween={10}
        navigation={true}
        touchRatio={1}
        speed= {400}
        style={{ padding: "5px 0 5px 5px" }}
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
      {project.images.map((p, i) => (
          <SwiperSlide key={`i`}> 
            <div className={styles.project__item}>
              <div className={styles.project__item_img}>
            
            <img 
							src={`${p.url}`}
				
							objectFit="cover"
							alt=""
						/>
             
              </div>
              <div className={styles.project__actions}>
                <Link href={`/project/${project.slug}`}>
                  <TbEdit />
                </Link>
                <Link href={`/project/${project.slug}?style=${i}`}>
                  <AiOutlineEye />
                </Link>
                <Link href="">
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </div>
          </SwiperSlide>
))}
      </Swiper>
*
------------- swiper 
<Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        touchRatio={2}
        speed= {400}
        className="project__swiper"
        style={{ padding: "5px 0 5px 5px" }}
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
      {project.images.map((p, i) => (
          <SwiperSlide key={`i`}> 
            <div className={styles.project__item}>
              <div className={styles.project__item_img}>
            
              <img src={p.url} alt="" />
             
              </div>
              <div className={styles.project__actions}>
                <Link href={`/project/${project.slug}`}>
                  <TbEdit />
                </Link>
                <Link href={`/project/${project.slug}?style=${i}`}>
                  <AiOutlineEye />
                </Link>
                <Link href="">
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </div>
          </SwiperSlide>
))}
      </Swiper>
-------------- swiper
{project.images.map((p, i) => (
          <SwiperSlide key={`project._id`}> 
            <div className={styles.product__item}>
              <div className={styles.project__item_img}>
                <img src={p[i].url} alt="" />
              </div>
              <div className={styles.project__actions}>
                <Link href={`/admin/dashboard/project/${project._id}`}>
                  <TbEdit />
                </Link>
                <Link href={`/product/${project.slug}?style=${i}`}>
                  <AiOutlineEye />
                </Link>
                <Link href="">
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
*/