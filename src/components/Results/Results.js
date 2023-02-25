import React, { useCallback, useEffect, useState } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import ResultsMap from "../ResultsMap/ResultsMap";
import './Results.css'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";
import { updateSearchResults } from "./searchSlice";
import { cleanData } from '../../util'


const Results = () => {
  //global state data
  //add currentCoordinates
  const customEqual = (oldValue, newValue) => {
    //a custom equality function built to check whether the data from the cleanData function is the same as the data in state
    return JSON.stringify(oldValue) == JSON.stringify(newValue)
  }
  const dispatch = useDispatch();
  const gpsCoordinates = useSelector((state) => state.landing.gpsCoordinates)
  const adaAccessible = useSelector((state) => state.landing.adaAccessible)
  const unisex = useSelector((state) => state.landing.unisex)
  const changingTable = useSelector((state) => state.landing.changingTable)
  //added equality function as secong parameter
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

//added a useCallBack so that t only runs when there has been a change in the dependecy data
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
