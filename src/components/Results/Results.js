import React, { useEffect, useState } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import ResultsMap from "../ResultsMap/ResultsMap";
import './Results.css'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";
import { updateSearchResults } from "./searchSlice";
import ResultsMap from "../ResultsMap/ResultsMap";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";



const Results = () => {
  //global state data
  //add currentCoordinates
  const dispatch = useDispatch();
  const gpsCoordinates = useSelector((state) => state.landing.gpsCoordinates)
  const adaAccessible = useSelector((state) => state.landing.adaAccessible)
  const unisex = useSelector((state) => state.landing.unisex)
  const changingTable = useSelector((state) => state.landing.changingTable)
  const searchResults = useSelector((state) => state.search.searchResults)

  //const [ allResults, setAllResults ] = useState([]) //this will change to a dispatch to update global instead
  const [filteredResults, setFilteredResults] = useState([]);
  //fetch request data
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
    dispatch(updateSearchResults(data))
    //setAllResults(results)
  }
})

useEffect(() => {
  setFilteredResults(filter(searchResults))
  // eslint-disable-next-line
}, [searchResults])

useEffect(() => {
  setFilteredResults(filter(searchResults))
}, [gpsCoordinates, adaAccessible, unisex, changingTable])

const createCards = () => {
  return filteredResults.map((result) => <ResultCard key={result.id} data={result} />)
}

const filter = (results) => {
  //make more dynamic... pass in an array of what to filter instead of referencing the global variables?
    //if filters are passed it, can move filter function to util file
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
              {isError && <p>ERROR</p>}
            </div>
          </section>
        </div>
        <section className="results-map-section">
          <ResultsMap filteredResults={filteredResults}/>
        </section>
      </section>
    </>
  );

}

export default Results
