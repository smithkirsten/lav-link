import React from 'react'
import './ResultCard.css'
import { NavLink } from "react-router-dom";

const dummyBathroom = { name: 'Establishment', distance: '0.5', upvote: '2'}

const ResultCard = () => {
  return (
    <NavLink to={`/results/${dummyBathroom.name}`}>
      <article className="result-card">
        <img src="/assets/toilet.png" alt="toilet icon" />
        <p className="result-name">{dummyBathroom.name}</p>
        <p className="result-distance">{dummyBathroom.distance} miles away</p>
        <p className="result-upvote">{dummyBathroom.upvote} ⬆️ </p>
      </article>
    </NavLink>
  );
}

export default ResultCard