import { useState } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { updateFilters } from './landingSlice'
import { useDispatch } from 'react-redux'
import { zipConverter } from "../../util";

export default function Landing() {
  const [currentLocation, setCurrentLocation] = useState(false);
  const [currentCoords, setCurrentCoords] = useState("")
  const [zipcode, setZipcode] = useState("");
  const [adaAccessible, setAdaAccessible] = useState(false);
  const [unisex, setUnisex] = useState(false);
  const [changingTable, setChangingTable] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const locationFetchSuccess = (position) => {
    setCurrentCoords({ 'lat':`${position.coords.latitude}`, 'long':`${position.coords.longitude}`})
  };
  
  const locationFetchFailure = () => {
    setError("There was an error using your current location. Please try again or enter zip.");
    setCurrentLocation(false);
    setTimeout(() => {setError('')}, 3000);
  };

  const getUserLocation = () => {
    if (currentCoords) {
      setCurrentLocation(false);
      setCurrentCoords("");
      return;
    }
    setCurrentLocation(true);
    setZipcode('');
    navigator.geolocation.getCurrentPosition(locationFetchSuccess, locationFetchFailure);
  }

  const currentLocationDisplay = () => {
    if (!currentLocation) {
      return 'use current location';
    } else if (currentLocation && !currentCoords) {
      return 'finding your location...'
    } else if (currentCoords) {
      return `${(+currentCoords.lat).toFixed(5)}, ${(+currentCoords.long).toFixed(5)}`;
    }
  }

  const checkInputs = () => {
    if (!zipConverter(zipcode) && zipcode) {
      setError("Please enter a valid zipcode before searching.");
      setTimeout(() => {setError('')}, 3000);
      return;
    } else if (!currentCoords && !zipConverter(zipcode)) {
      setError("Please enter zipcode or select current location.");
      setTimeout(() => {setError('')}, 3000);
      return;
    } else {
      dispatch(updateFilters({ currentLocation, currentCoords, zipcode, adaAccessible, unisex, changingTable }));
      navigate('/results');
    }
  }

  const errorMessageDisplay = () => {
    if (error) {
      return (
        <div className="error-div">
          <p className="landing-error-message">{error}</p>
        </div>
      )
    } else {
      return null;
    }
  }
  let isDisabled = currentLocation ? true : false
  return (
    <section className="landing-main">
      <section className="landing-content">
        <section className="landing-header">
          <h1 className="site-title">Lav Link</h1>
          <p className="landing-copy">find safer relief near you</p>
          <img
            className="landing-toilet-icon"
            src="/assets/toilet.png"
            alt="toilet icon"
          />
        </section>
        <div className="current-location-button">
          <input
            name="currentLocation"
            id="currentLocation"
            type="checkbox"
            checked={currentLocation}
            onChange={() => getUserLocation()}
          />
          <label className="landing-labels" htmlFor="currentLocation">{currentLocationDisplay()}</label>
        </div>
        <p className="landing-copy">or</p>
        <input
          name="zipcodeInput"
          type="text"
          className="zipcode-input"
          placeholder="zipcode..."
          maxLength={5}
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
          disabled={isDisabled}
        />
        {errorMessageDisplay()}
        <section className="filter-section">
          <div className="ada-filter">
            <input
              name="adaAccessible"
              id="adaAccessible"
              type="checkbox"
              checked={adaAccessible}
              onChange={(event) => setAdaAccessible(event.target.checked)}
            />
            <img className="wheelchair-icon" src="/assets/wheelchair.png" alt="wheelchair icon" />
            <label className="landing-labels" htmlFor="adaAccessible">ada accessible</label>
          </div>
          <div className="unisex-filter">
            <input
              name="unisex"
              id="unisex"
              type="checkbox"
              checked={unisex}
              onChange={(event) => setUnisex(event.target.checked)}
            />
            <img className="unisex-icon" src="/assets/transgender.png" alt="unisex icon" />
            <label className="landing-labels" htmlFor="unisex">unisex</label>
          </div>
          <div className="changing-table-filter">
            <input
              name="changingTable"
              id="changingTable"
              type="checkbox"
              checked={changingTable}
              onChange={(event) => setChangingTable(event.target.checked)}
            />
            <img className="baby-icon" src="/assets/baby.png" alt="changing table icon" />
            <label className="landing-labels" htmlFor="changingTable">changing table</label>
          </div>
        </section>
        <button name="searchButton" className="search-button" onClick={() => checkInputs()} >search</button>
      </section>
    </section>
  );
}
