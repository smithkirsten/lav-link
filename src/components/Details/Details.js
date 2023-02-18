import React from "react";
import wheelchair from "../../assets/wheelchair.png";
import transgender from "../../assets/transgender.png";
import baby from "../../assets/baby.png";
import "./Details.css";

const Details = () => {
  return (
    <section className="Details-page">
      <section className="top">
        <section className="background details">
          <p>Dairy queen</p>
          <p className="distance" >.45 mi</p>
          <div className="icon-container">
            <img alt="Wheelchair" className="icon" src={wheelchair}></img>
            <img alt="Unisex" className="icon" src={transgender}></img>
            <img alt="Changing Table" className="icon" src={baby}></img>
          </div>
        </section>
        <section className="background details-map">
          This is a map... trust me
          <button className="back-to-main-button" >X</button>
        </section>
      </section>
      <summary className="background summary">
        <div className="address" >
          <p>3335 Arapahoe rd.STE 10</p> 
          <p>Erie, CO</p>
        </div>
        <p className="directions" >Go through the electronic doors, walk forward three steps and turn right</p>
      </summary>
      <section className="background conclusion">
        <p className="comment">Between Chipotle and Cocola Bakery near the 19th Ave. mall entrance on the east side</p>
        <div className="votes" >
          <p>0</p>
          <p>0</p>
          <p>Last Updated: </p>
        </div>
      </section>
    </section>
  );
};

export default Details;
