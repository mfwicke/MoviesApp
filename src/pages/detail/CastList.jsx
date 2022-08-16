import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const CastList = (props) => {
  const { category } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCradits = async () => {
      const responce = await tmdbApi.credits(category, props.id);
      setCast(responce.cast.slice(0, 5));
    };
    getCradits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {CastList.map((item, i) => (
        <div className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};
