import React from 'react'
import './ResultCard.css'
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { selectBathroom } from './resultSlice.js'

const ResultCard = ({data}) => {
  const dispatch = useDispatch();
  return (
    <NavLink to={`/results/${data.id}`} onClick={() => dispatch(selectBathroom(data))}>
      <article className="result-card">
        <img src="/assets/toilet.png" alt="toilet icon" />
        <p className="result-name">{data.name}</p>
        <p className="result-distance">{(data.distance).toFixed(2)} miles away</p>
        <p className="result-upvote">{data.upvote} ⬆️ </p>
      </article>
    </NavLink>
  );
}

export default ResultCard