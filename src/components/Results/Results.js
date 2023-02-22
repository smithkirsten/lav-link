import React, { useEffect } from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import './Results.css'
import { useSelector } from 'react-redux'
import { useGetLavsQuery } from "../../apicalls";

const Results = () => {
  //put links around individual cards
  const gpsCoordinates = useSelector((state) => state.landing.gpsCoordinates)
  // const getLavs = useGetLavsQuery(gpsCoordinates);

  // useEffect(() => {
  //   console.log(getLavs)

  //   // eslint-disable-next-line
  // }, [gpsCoordinates])

  // const cards = dummyResults.map(result => <ResultCard />).sort((a, b) => a.distance - b.distance)

  const {
    data: results,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLavsQuery(gpsCoordinates);

let content

if (isLoading) {
  //loading page is later problem
  content = <h2>Loading ...</h2>;
} else if (isSuccess) {
  console.log(results)
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