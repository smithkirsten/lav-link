import React, { useEffect, useRef } from "react";
import "./Details.css";
import { useSelector } from "react-redux";
import { createMapLink } from "../../util";
import { NavLink, useNavigate } from "react-router-dom";
import DetailMap from "../DetailMap/DetailMap";

const Details = () => {
  const bathroom = useSelector((state) => state.result.selectedBathroom);
  const navigate = useNavigate();
  const mapLink = useRef(null);

  useEffect(() => {
    if (!bathroom) {
      navigate('/')
    } else {
      mapLink.current = createMapLink(bathroom);
    }
    // eslint-disable-next-line
  }, [bathroom])

  return (
    <section className="Details-page">
      <NavLink to={"/results"}>
        <button className="back-to-main-button">Back to All Results</button>
      </NavLink>
      <section className="top">
        <section className="background details">
          <p className="name">{`${bathroom.name}`}</p>
          <p className="distance">{`${bathroom.distance} miles`}</p>
          <a href={mapLink} alt={`Link to ${bathroom.name} directions`} target="_blank" rel="noopener noreferrer">
            <button className="directions-button" >Directions</button>
          </a>
          <div className="icon-container">
            {bathroom.accessible && (
              <img
                alt="Wheelchair"
                className="icon"
                src="/assets/wheelchair.png"
              ></img>
            )}
            {bathroom.unisex && (
              <img
                alt="Unisex"
                className="icon"
                src="/assets/transgender.png"
              ></img>
            )}
            {bathroom["changing_table"] && (
              <img
                alt="Changing Table"
                className="icon"
                src="/assets/baby.png"
              ></img>
            )}
          </div>
        </section>
        <section className="details-map">
          <DetailMap bathroom={bathroom} link={mapLink} />
        </section>
      </section>
      <summary className="background summary">
        <div className="address">
          <p>{`${bathroom.street}`}</p>
          <p>{`${bathroom.city}, ${bathroom.state}`}</p>
        </div>
        {bathroom.directions && (
          <p className="directions">{`Directions: ${bathroom.directions}`}</p>
        )}
      </summary>
      <section className="background conclusion">
        {bathroom.comment && (
          <p className="comment">{`Comments: ${bathroom.comment}`}</p>
        )}
        <div className="votes">
          <p className="upvotes">{`Upvotes: ${bathroom.upvote}`}</p>
          <p className="downvotes">{`Downvotes: ${bathroom.downvote}`}</p>
          <p className="update">{`Last Updated: ${bathroom.updated_at}`}</p>
        </div>
      </section>
    </section>
  );
};

export default Details;
