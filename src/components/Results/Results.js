import React from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import './Results.css'

const dummyBathroom = { name: 'Establishment Name', distance: '0.5', upvote: '2'}
const dummyResults = [ dummyBathroom, dummyBathroom, dummyBathroom, dummyBathroom, dummyBathroom ]
//order results by distance or by upvote? but Rae said a lot of them dont have upvotes

//did not insert props because....store vs props?
const Results = () => {
  //put links around individual cards
  const cards = dummyResults.map(result => <ResultCard />).sort((a, b) => a.distance - b.distance)
  return (
    <>
      <ResultsHeader />
      <section className='cards-display'>
        {cards}
      </section>
    </>
  )

}

export default Results