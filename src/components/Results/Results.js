import React from "react";
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import ResultCard from "../ResultCard/ResultCard";
import './Results.css'

const dummyBathroom = { name: 'Establishment Name', distance: '0.5', upvote: '2'}
const dummyResults = [ dummyBathroom, dummyBathroom, dummyBathroom, dummyBathroom, dummyBathroom ]

const Results = () => {
  const cards = dummyResults.map(result => <Card />)
  return (
    <>
      <ResultsHeader />
      <section>
        {cards}
      </section>
    </>
  )

}

export default Results