import React, { useCallback, useEffect, useState } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import './Results.css'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";
import { updateSearchResults } from "./searchSlice";
import { cleanData } from '../../util'

const Results = () => {
  //global state data
  //add currentCoordinates
  const customEqual = (oldValue, newValue) => {

    return JSON.stringify(oldValue) == JSON.stringify(newValue)
  }
  const dispatch = useDispatch();
  const gpsCoordinates = useSelector((state) => state.landing.gpsCoordinates)
  const adaAccessible = useSelector((state) => state.landing.adaAccessible)
  const unisex = useSelector((state) => state.landing.unisex)
  const changingTable = useSelector((state) => state.landing.changingTable)
  const searchResults = useSelector((state) => (state.search.searchResults), customEqual)

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
  // eslint-disable-next-line
}, [searchResults])


useEffect(() => {
  setFilteredResults(filter(searchResults))
}, [gpsCoordinates, adaAccessible, unisex, changingTable, filter, searchResults])

const createCards = () => {
  console.log(filteredResults)
  console.log(searchResults)
  return filteredResults.map((result) => <ResultCard key={result.id} data={result} />)
}

  return (
    <>
      <ResultsHeader />
      <section className="cards-display">
        <div className="cards-container">
          {isSuccess && createCards()}
          {isLoading && <img src="/assets/spinnerblue.gif" alt="loading" className="loading-spinner"/>}
          {isError && <p>ERROR</p>}
        </div>
      </section>
    </>
  );

}

export default Results
