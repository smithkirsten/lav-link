import React, { useEffect, useState } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import './Results.css'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";
import { updateSearchResults } from "./searchSlice";



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
    data: results,
    isLoading,
    isSuccess,
    isError,
    // eslint-disable-next-line
    error,
  } = useGetLavsQuery(gpsCoordinates);

let temp

useEffect(() => {
  if(isLoading) {
    // eslint-disable-next-line
    temp = <p>loading....</p>
  } else if(isError) {
    // eslint-disable-next-line
    temp = <p>Error City</p>
  } else if(isSuccess) {
    dispatch(updateSearchResults(results))
    //setAllResults(results)
  }
})

useEffect(() => {
  setFilteredResults(filter(searchResults))
  // eslint-disable-next-line
}, [searchResults])

const createCards = () => {
  return filteredResults.map((result) => <ResultCard key={result.id} data={result} />)
}

const filter = (results) => {
  //make more dynamic... pass in an array of what to filter instead of referencing the global variables?
    //if filters are passed it, can move filter function to util file
    console.log('about to filter: ', results)

  if(adaAccessible){
    console.log('filtering for ada')
    results = results.filter(result => result.accessible)
    console.log(results)
  }
  if(unisex) {
    console.log('filtering for unisex')
    results = results.filter(result => result.unisex)
    console.log(results)
  }
  if(changingTable) {
    
    console.log('filtering for big baby')
    results = results.filter(result => result.changing_table)
    console.log(results)
  }
  console.log('returning: ', results)
  return results;
}



  return (
    <>
      <ResultsHeader />
      <section className='cards-display'>
        <div className="cards-container">
          {temp}
          {filteredResults && createCards()}
        </div>
      </section>
    </>

    // <>
    //   <ResultsHeader />
    //   <section className='cards-display'>
    //     <div className="cards-container">
    //       {isError && <p>error city</p>}
    //       {isLoading && <p>loading....</p>}
    //       {filteredResults && content}
    //     </div>
    //   </section>
    // </>

    // <>
    //   <ResultsHeader />
    //   <section className='cards-display'>
    //     <div className="cards-container">
    //       {content}
    //     </div>
    //   </section>
    // </>
  )

}

export default Results







// useEffect(() => {
//   //trigger a re-get if gpsCoordinates change
//   setFilteredResults(filter(results))
// }, [ gpsCoordinates, adaAccessible, unisex, changingTable ])

// useEffect(() => {
//   content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />)
// }, [filteredResults])

// useEffect(() => {
//   setFilteredResults(filter(results))
// }, [results])


// content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />)

// if (isSuccess) {
//   setFilteredResults(filter(results))
//   const boop = filteredResults
//   content = boop.map((result) => <ResultCard key={result.id} data={result} />)
//   //put links around individual cards
//   // content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />);
// } 
// let temp;
// // display logic
// if (isLoading) {
//   //loading page is later problem
//   temp = <h2>Loading ...</h2>;
// } else if (isError) {
//   //Rae is making error page
//   temp = <h2>Error city</h2>
// } else if (isSuccess) {
    // setFilteredResults(filter(results))
  // const copy = filteredResults
  // content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />)
  //put links around individual cards
  // content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />);
//}
