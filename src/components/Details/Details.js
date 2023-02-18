import React from 'react'

import './Details.css'

const Details = () => {
  return (
    <section>
      <section className='top'>
        <section className='details'>
          <p>Name</p>
          <p>Distance</p>
          <div className='icon-container'>

          </div>
        </section>
        <section className='details-map'>This is a map... trust me</section>
      </section>
      <summary className='summary'>
        <p>address</p>
        <p>description</p>
      </summary>
      <section className='conclusion'>
        <p>comment</p>
        <p>Upvotes</p>
        <p>Downvotes</p>
        <p>Last Updated</p>
      </section>
    </section>
  )
}

export default Details