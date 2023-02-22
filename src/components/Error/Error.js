import React from "react";
import { NavLink } from "react-router-dom";
import "./Error.css";

export default function Error() {
  return (
    <section className="error-page">
      <div className="error-content">
        <div>
          <h1>Lav Link</h1>
          <p>find safer relief near you</p>
        </div>
        <p className="poop-emoji">💩</p>
        <p className="not-found">Page Not Found</p>
        <NavLink to={'/'}>
          <button className="return-to-main-button">Back To Main</button>
        </NavLink>
      </div>
    </section>
  );
}
