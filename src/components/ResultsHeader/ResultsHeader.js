import React, { useState, useEffect } from "react";
import './ResultsHeader.css'
//want forms to hold state for onChange (user typing) but send that state to the store onClick 
//should display checkboxes as user selected them on homepage(will get that info from store and display accordingly on update)



const ResultsHeader = () => {
  const [ zipcode, setZipcode ] = useState('')
  const [ ada, setAda ] = useState(false) //will be grabbed from store
  const [ unisex, setUnisex ] = useState(false) //will be grabbed from store
  const [ changingTable, setChangingTable ] = useState(false) //will be grabbed from store
  const zip = 'zipcode' //this will come from the store
  return (
    <header className='results-header'>
      <h1 className='heading'>LavLink</h1>
      <p className='showing'>showing results for...</p>
      <p className='zip'>{zip}</p>
      <form className='filterForm'>
        <div>
          <label htmlFor='zipcode' className='hidden input-label text-label'>zipcode</label>
            <input type='text' name='zipcode' value={zipcode} onChange={(event) => setZipcode(event.target.value)}placeholder='zipcode...' className='zip-input'></input>
          <label htmlFor='ada' className='input-label'><img src='/assets/wheelchair.png'/></label>
            <input type='checkbox' name='ada' checked={ada} onChange={(event) => setAda(event.target.value)}></input>
          <label htmlFor='unisex' className='input-label'><img src='/assets/transgender.png'/></label>
            <input type='checkbox' name='unisex' checked={unisex} onChange={(event) => setUnisex(event.target.value)}></input>
          <label htmlFor='changingTable' className='input-label'><img src='/assets/baby.png'/></label>
            <input type='checkbox' name='changingTable' checked={changingTable} onChange={(event) => setChangingTable(event.target.value)}></input>
        </div>
        <button className='changeButton'>change</button>
      </form>
      
    </header>
  )
}
//currently checkboxes can be checked but not unchecked
  //state reads as "on"

export default ResultsHeader