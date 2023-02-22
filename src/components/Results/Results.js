import React, { useEffect, useState } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import './Results.css'
import { useSelector } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";


const Results = () => {
  //global state data
  const gpsCoordinates = useSelector((state) => state.landing.gpsCoordinates)
  const adaAccessible = useSelector((state) => state.landing.adaAccessible)
  const unisex = useSelector((state) => state.landing.unisex)
  const changingTable = useSelector((state) => state.landing.changingTable)
  //fetch request data
  const {
    data: results,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLavsQuery(gpsCoordinates);

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
  //local state
  const [filteredResults, setFilteredResults] = useState([]);

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



//add results to global state

let content
// content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />)

// if (isSuccess) {
//   setFilteredResults(filter(results))
//   const boop = filteredResults
//   content = boop.map((result) => <ResultCard key={result.id} data={result} />)
//   //put links around individual cards
//   // content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />);
// } 

// display logic
if (isLoading) {
  //loading page is later problem
  content = <h2>Loading ...</h2>;
} else if (isSuccess) {
  setFilteredResults(filter(results))
  const copy = filteredResults
  content = copy.map((result) => <ResultCard key={result.id} data={result} />)
  //put links around individual cards
  // content = filteredResults.map((result) => <ResultCard key={result.id} data={result} />);
} else if (isError) {
  //Rae is making error page
  content = <h2>Error city</h2>
}
  return (
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

    <>
      <ResultsHeader />
      <section className='cards-display'>
        <div className="cards-container">
          {content}
        </div>
      </section>
    </>
  )

}

export default Results