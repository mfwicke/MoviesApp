import React from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button.jsx";
import HeroSlice from "../components/hero-slice/HeroSlice.jsx";
import MovieList from "../components/movie-list/MovieList.jsx";

import { category, movieType, tvType } from "../api/tmdbApi";

const Home = () => {
  return (
    <>
      <HeroSlice />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
        </div>
        <MovieList category={category.tv} type={tvType.top_rated} />
      </div>
    </>
  );
};

export default Home;
