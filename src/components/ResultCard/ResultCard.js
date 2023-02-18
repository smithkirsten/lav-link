import React from 'react'
import './ResultCard.css'

const dummyBathroom = { name: 'Establishment', distance: '0.5', upvote: '2'}


const ResultCard = () => {
  return (
    <article className='result-card'>
      <img src='/assets/toilet.png' alt='toilet icon'/>
      <p className='result-name'>{dummyBathroom.name}</p>
      <p className='result-distance'>{dummyBathroom.distance} miles away</p>
      <p className='result-upvote'>{dummyBathroom.upvote} ⬆️ </p>
    </article>
  )
}

export default ResultCard