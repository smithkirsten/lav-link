import React from "react";
import "./Details.css";
import { useSelector } from "react-redux";
import { roundDistance, reformatDate } from "../../util";
import { NavLink } from "react-router-dom";

const Details = () => {

  const bathroom = useSelector((state) => state.result.selectedBathroom);
  return (
    <section className="Details-page">
      <NavLink to={'/results'} >
        <button className="back-to-main-button">Back to All Results</button>
      </NavLink>
      <section className="top">
        <section className="background details">
          <p>{`${bathroom.name}`}</p>
          <p className="distance">{`${roundDistance(bathroom)} miles`}</p>
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
        <section className="background details-map">
          This is a map... trust me
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
          <p>{`Upvotes: ${bathroom.upvote}`}</p>
          <p>{`Downvotes: ${bathroom.downvote}`}</p>
          <p>{`Last Updated: ${reformatDate(bathroom)}`}</p>
        </div>
      </section>
    </section>
  );
};

export default Details;
