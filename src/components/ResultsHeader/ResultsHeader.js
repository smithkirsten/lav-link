import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import './ResultsHeader.css'
import { updateFilters } from "../Landing/landingSlice";

const ResultsHeader = () => {
  const [ zipcode, setZipcode ] = useState(useSelector( state => state.landing.zipcode))
  const [ adaAccessible, setAdaAccessible ] = useState(useSelector( state => state.landing.adaAccessible))
  const [ unisex, setUnisex ] = useState(useSelector( state => state.landing.unisex))
  const [ changingTable, setChangingTable ] = useState(useSelector( state => state.landing.changingTable))
  
  const dispatch = useDispatch();

  return (
    <header className="results-header">
      <NavLink to={"/"} className="logo-link" >
        <h1 className="heading">LavLink</h1>
      </NavLink>
      <p className="showing">showing results for...</p>
      <form className="filterForm">
        <div>
          <label htmlFor="zipcode" className="hidden input-label text-label">
            zipcode
          </label>
          <input
            type="text"
            name="zipcode"
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
            placeholder="zipcode..."
            className="zip-input"
          ></input>
          <label htmlFor="adaAccessible" className="input-label">
            <img src="/assets/wheelchair.png" alt="wheelchair icon" />
            <input
             type="checkbox"
             name="adaAccessible"
              checked={adaAccessible}
              onChange={(event) => setAdaAccessible(event.target.checked)}>
            </input>
          </label>
          <label htmlFor="unisex" className="input-label">
            <img src="/assets/transgender.png" alt="unisex icon" />
            <input
              type="checkbox"
              name="unisex"
              checked={unisex}
              onChange={(event) => setUnisex(event.target.checked)}
              >
            </input>
          </label>
          <label htmlFor="changingTable" className="input-label">
            <img src="/assets/baby.png" alt="changing table icon"/>
            <input
              type="checkbox"
              name="changingTable"
              checked={changingTable}
              onChange={(event) => setChangingTable(event.target.checked)}>
            </input>
          </label>
        </div>
        <button
          className="changeButton"
          onClick={(event) => {
            event.preventDefault()
            dispatch(
              updateFilters({
                zipcode,
                adaAccessible,
                unisex,
                changingTable,
              })
            );
          }}
        >
          change
        </button>
      </form>
    </header>
  );
}

export default ResultsHeader