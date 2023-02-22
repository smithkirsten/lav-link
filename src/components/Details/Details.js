import React from "react";
import "./Details.css";
import { useSelector } from "react-redux";

const Details = () => {
   const bathroom = useSelector((state) => state.result.selectedBathroom);
   console.log("br", bathroom)
  return (
    <section className="Details-page">
      <section className="top">
        <section className="background details">
          <p>{`${bathroom.name}`}</p>
          <p className="distance">{`${bathroom.distance}`}</p>
          <div className="icon-container">
            <img
              alt="Wheelchair"
              className="icon"
              src="/assets/wheelchair.png"
            ></img>
            <img
              alt="Unisex"
              className="icon"
              src="/assets/transgender.png"
            ></img>
            <img
              alt="Changing Table"
              className="icon"
              src="/assets/baby.png"
            ></img>
          </div>
        </section>
        <section className="background details-map">
          This is a map... trust me
          <button className="back-to-main-button">X</button>
        </section>
      </section>
      <summary className="background summary">
        <div className="address">
          <p>3335 Arapahoe rd.STE 10</p>
          <p>Erie, CO</p>
        </div>
        <p className="directions">
          Go through the electronic doors, walk forward three steps and turn
          right
        </p>
      </summary>
      <section className="background conclusion">
        <p className="comment">
          Between Chipotle and Cocola Bakery near the 19th Ave. mall entrance on
          the east side
        </p>
        <div className="votes">
          <p>Upvote: 0</p>
          <p>Downvote: 0</p>
          <p>Last Updated: 12/21/2022</p>
        </div>
      </section>
    </section>
  );
};

export default Details;
