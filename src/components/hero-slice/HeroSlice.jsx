import React, {useState} from "react";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const HeroSlice = () => {

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1};
            try {
                const response = await tmdbApi.get(`/discover/movie`, {params});
                setMovieItems(response.data.results);
            }
        }
    }, []);

  return <div className="hero-slide">HeroSlice</div>;
};

export default HeroSlice;
