import React from "react";

import { useParams } from "react-router";

import PageHeader from "../components/page-header/PageHeader.jsx";

import { category as cate } from "../api/tmdbApi";
import MovieGrig from "../components/movie-grid/MovieGrid.jsx";

const Catalog = () => {
  const { category } = useParams();

  return (
    <>
      <PageHeader>{category === cate.movie ? "Movies" : "TV Shows"}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrig category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
