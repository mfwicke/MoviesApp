import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./hero-slice.scss";

const HeroSlice = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(1, 4));
        console.log(response);
      } catch {
        console.log("Error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        //autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSliceItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSliceItem = (props) => {
  let history = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  // eslint-disable-next-line
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slice__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slice__item__content container">
        <div className="hero-slice__item__content__info">
          <h2 className="title"> {item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.pushState("/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={() => console.log("trailer")}>
              Wacht trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slice__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="'trailer'"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlice;
