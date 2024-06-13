import React from 'react'

import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'; 

const Headerbash = ({OpenSidebar}) => {
  return (
    <header className='headers'>
        <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
        </div>
        <div className='header-left'>
        
            <BsSearch  className='icon'/>
            <input type='text' placeholder='Enter URL , IP Address or Hostname' />
            <button className='scan-button'>Scan Now</button>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
            
        </div>
    </header>
  )
}

export default Headerbash;