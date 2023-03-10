import React from 'react';
import './ResultCard.css';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { selectBathroom } from './resultSlice.js';
import PropTypes from 'prop-types';

const ResultCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <NavLink to={'/results/details'} onClick={() => dispatch(selectBathroom(data))}>
      <article className="result-card">
        <img src="/assets/toilet.png" alt="toilet icon" />
        <p className="result-name">{data.name}</p>
        <p className="result-distance">{data.distance} miles away</p>
      </article>
    </NavLink>
  );
}

export default ResultCard;

ResultCard.propTypes = {
  data: PropTypes.object.isRequired
};