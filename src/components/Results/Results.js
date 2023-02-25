import React, { useCallback, useEffect, useState } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import ResultsMap from "../ResultsMap/ResultsMap";
import './Results.css'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";
import { updateSearchResults } from "./searchSlice";
import { cleanData } from '../../util'




const Results = () => {
  const customEqual = (oldValue, newValue) => {
    return JSON.stringify(oldValue) === JSON.stringify(newValue)
  }
  const dispatch = useDispatch();
  const gpsCoordinates = useSelector((state) => state.landing.gpsCoordinates)
  const adaAccessible = useSelector((state) => state.landing.adaAccessible)
  const unisex = useSelector((state) => state.landing.unisex)
  const changingTable = useSelector((state) => state.landing.changingTable)
  const searchResults = useSelector((state) => (state.search.searchResults), customEqual)

  const [filteredResults, setFilteredResults] = useState([]);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    // eslint-disable-next-line
    error,
  } = useGetLavsQuery(gpsCoordinates);


useEffect(() => {
  if(isSuccess) {
    dispatch(updateSearchResults(cleanData(data)))
  }
})

const filter = useCallback((results) => {
  if(adaAccessible){
    results = results.filter(result => result.accessible)
  }
  if(unisex) {
    results = results.filter(result => result.unisex)
  }
  if(changingTable) {
    results = results.filter(result => result.changing_table)
  }
  return results;
}, [adaAccessible, unisex, changingTable])


useEffect(() => {
  setFilteredResults(filter(searchResults))
}, [gpsCoordinates, adaAccessible, unisex, changingTable, filter, searchResults])

const createCards = () => {
  return filteredResults.map((result) => <ResultCard key={result.id} data={result} />)
}

  return (
    <>
      <section className="results-section">
        <div>
          <ResultsHeader />
          <section className="cards-display">
            <div className="cards-container">
              {isSuccess && createCards()}
              {isLoading && <img src="/assets/spinnerblue.gif" alt="loading" className="loading-spinner"/>}
              {isError && <p>Whoops! Something went wrong. Please try a new zipcode.</p>}
            </div>
          </section>
        </div>
        {isSuccess && <section className="results-map-section">
          <ResultsMap filteredResults={filteredResults}/>
        </section>}
      </section>
    </>
  );
}

export default Results
