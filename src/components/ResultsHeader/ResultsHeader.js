import React from "react";
import './ResultsHeader.css'
//want forms to hold state for onChange (user typing) but send that state to the store onClick 
//should display checkboxes as user selected them on homepage
const ResultsHeader = () => {
  const zip = 'zipcode'
  return (
    <header className='results-header'>
      <h1 className='heading'>LavLink</h1>
      <p className='showing'>showing results for...</p>
      <p className='zip'>{zip}</p>
      <form className='filterForm'>
        <label for='zipcode' className='hidden input-label text-label'>zipcode</label>
        <input type='text' name='zipcode' placeholder='zipcode...' className='zip-input'></input>
        <label for='ada' className='input-label'><img src='/assets/wheelchair.png'/></label>
        <input type='checkbox' name='ada'></input>
        <label for='unisex' className='input-label'><img src='/assets/transgender.png'/></label>
        <input type='checkbox' name='unisex'></input>
        <label for='changingTable' className='input-label'><img src='/assets/baby.png'/></label>
        <input type='checkbox' name='changingTable'></input>
        <label for='numResults' className='input-label text-label'>show</label>
        <input type='number' name='numResults' min='5' max='100' className='num-input' placeholder='5'></input>
        <button className='changeButton'>change</button>
      </form>
    </header>
  )
}

export default ResultsHeader