import React from "react";
import wheelchair from "../../assets/wheelchair.png";
import transgender from "../../assets/transgender.png";
import baby from "../../assets/baby.png";
import "./Details.css";

const Details = () => {
  return (
    <section>
      <section className="top">
        <section className="details">
          <p>Name</p>
          <p>Distance</p>
          <div className="icon-container">
            <img className="icon wheelchair" src={wheelchair}></img>
            <img className="icon transgender" src={transgender}></img>
            <img className="icon baby" src={baby}></img>
          </div>
        </section>
        <section className="details-map">This is a map... trust me</section>
      </section>
      <summary className="summary">
        <p>address</p>
        <p>description</p>
      </summary>
      <section className="conclusion">
        <p>comment</p>
        <p>Upvotes</p>
        <p>Downvotes</p>
        <p>Last Updated</p>
      </section>
    </section>
  );
};

export default Details;
