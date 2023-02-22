import React, { useEffect } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import './Results.css'
import { useSelector } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";


const Results = () => {

  const [filteredResults, setFilteredResults] = useState(false);
  //add a local state that listens for changes to any of the below variables
    //state will hold filtered results

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
  
  console.log(filtered)
  return filtered;
}

//display logic
let content
if (isLoading) {
  //loading page is later problem
  content = <h2>Loading ...</h2>;
} else if (isSuccess) {
  console.log(results)
  //filter results
    //grab filters from state and determine which to apply
      //create filter functions in util file
  let filteredResults = filter(results)


  //put links around individual cards

  content = results.map((result) => <ResultCard key={result.id} data={result} />);
} else if (isError) {
  //Rae is making error page
  content = <h2>Error city</h2>
}
  return (
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