import React from "react";
import { NavLink } from "react-router-dom";
import "./Error.css";

export default function Error() {
  return (
    <section className="error-page">
      <div className="error-content">
        <section className="landing-header">
          <h1 className="site-title">Lav Link</h1>
          <p className="landing-copy">find safer relief near you</p>
          <p className="poop-emoji">💩</p>
        </section>
        <p className="not-found">Page Not Found</p>
        <NavLink to={"/"}>
          <button className="return-to-main-button">Back To Main</button>
        </NavLink>
      </div>
    </section>
  );
}
