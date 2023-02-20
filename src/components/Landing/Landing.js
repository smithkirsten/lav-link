import { useState } from "react";
import "./Landing.css";
import { NavLink } from "react-router-dom";
import { updateFilters } from './landingSlice'
import { useDispatch } from 'react-redux'

export default function Landing() {
  const [currentLocation, setCurrentLocation] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [adaAccessible, setAdaAccessible] = useState(false);
  const [unisex, setUnisex] = useState(false);
  const [changingTable, setChangingTable] = useState(false);

  const dispatch = useDispatch();

  return (
    <section className="landing-main">
      <section className="landing-content">
        <section className="landing-header">
          <h1>Lav Link</h1>
          <p>find safer relief near you</p>
          <img
            className="landing-toilet-icon"
            src="/assets/toilet.png"
            alt="toilet icon"
          />
        </section>
        <div className="current-location-button">
          <input
            name="currentLocation"
            type="checkbox"
            checked={currentLocation}
            onChange={(event) => setCurrentLocation(event.target.checked)}
          />
          <label htmlFor="currentLocation">use current location</label>
        </div>
        <p>or</p>
        <input
          name="zipcodeInput"
          type="text"
          className="zipcode-input"
          placeholder="zipcode..."
          maxLength={5}
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
        />
        <section className="filter-section">
          <div className="ada-filter">
            <input
              name="adaAccessible"
              type="checkbox"
              checked={adaAccessible}
              onChange={(event) => setAdaAccessible(event.target.checked)}
            />
            {/* eslint-disable-next-line */}
            <img className="wheelchair-icon" src="/assets/wheelchair.png" />
            <label htmlFor="adaAccessible">ada accessible</label>
          </div>
          <div className="unisex-filter">
            <input
              name="unisex"
              type="checkbox"
              checked={unisex}
              onChange={(event) => setUnisex(event.target.checked)}
            />
            {/* eslint-disable-next-line */}
            <img className="unisex-icon" src="/assets/transgender.png" />
            <label htmlFor="unisex">unisex</label>
          </div>
          <div className="changing-table-filter">
            <input
              name="changingTable"
              type="checkbox"
              checked={changingTable}
              onChange={(event) => setChangingTable(event.target.checked)}
            />
            {/* eslint-disable-next-line */}
            <img className="baby-icon" src="/assets/baby.png" />
            <label htmlFor="changingTable">changing table</label>
          </div>
        </section>
        <NavLink to="/results">
          <button name="searchButton" className="search-button" onClick={() => dispatch(updateFilters( { currentLocation, zipcode, adaAccessible, unisex, changingTable }))}>
            search
          </button>
        </NavLink>
      </section>
    </section>
  );
}
