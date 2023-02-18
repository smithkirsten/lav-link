import React from 'react'
import './ResultCard.css'

const dummyBathroom = { name: 'Establishment Name', distance: '0.5', upvote: '2'}


const ResultCard = () => {
  return (
    <article className='result-card'>
      <img />
      <p className='result-name'>{dummyBathroom.name}</p>
      <p className='result-distance'>{dummyBathroom.distance}</p>
      <p className='result-upvote'>{dummyBathroom.upvote}</p>
    </article>
  )
}

export default ResultCard