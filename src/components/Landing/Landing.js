import './Landing.css'


export default function Landing() {


  return (
    <section className="landing-main">
      <section className="landing-content">
        <section className="landing-header">
          <h1>Lav Link</h1>
          <p>find safer relief near you</p>
          <img className='landing-toilet-icon' src='/assets/toilet.png' alt='toilet icon' />
        </section>
        <div className='current-location-button' >
          <input name="currentLocation" type="checkbox" value='' />
          <label htmlFor='currentLocation'>use current location</label>
        </div>
        <p>or</p>
        <input name='zipcodeInput' type='text' className='zipcodeInput' placeholder='enter your zipcode' />
        <section className='filter-section'>
          <div className='ada-filter'>
            <input name="adaAccessible" type="checkbox" value='' />
            {/* eslint-disable-next-line */}
            <img className='wheelchair-icon' src='/assets/wheelchair.png' />
            <label htmlFor='adaAccessible'>ada accessible</label>
          </div>
          <div className='unisex-filter'>
            <input name="unisex" type="checkbox" value='' />
            {/* eslint-disable-next-line */}
            <img className='unisex-icon' src='/assets/transgender.png'/>
            <label htmlFor='unisex'>unisex</label>
          </div>
          <div className='changing-table-filter'>
            <input name="changingTable" type="checkbox" value='' />
            {/* eslint-disable-next-line */}
            <img className='baby-icon' src='/assets/baby.png' />
            <label htmlFor='changingTable'>changing table</label>
          </div>
        </section>
        <button name='searchButton' className='search-button'>search</button>
      </section>
    </section>
  )
}