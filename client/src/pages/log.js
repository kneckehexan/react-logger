import axios from 'axios';
import React, { useEffect } from 'react'

const Log = ({match}) => {

  const logid = match.params.id;

  useEffect(() => {
    const getLog = async () => {
      axios.get()
    }
  })

  return (
  <div>
    <div className='log'>
      <h1 className='logHeader'>Log</h1>
      <div className='logContent' id='logContent'>

      </div>
    </div>
  </div>
  );
}

export default Log;