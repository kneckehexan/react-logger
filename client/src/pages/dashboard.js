import React from 'react'

const DashBoard = () => {
  return (
  <div>
    <div className='prompt'>
      <div className='promptHeader'>LOG</div>
      <div className='promptBody'>
        <div className='befLog'>
          <form>
            <div className='inputGroup'>
              <label htmlFor='searchLogName'>Befintlig LOG</label>
              <input type='text' name='searchLogName' id='searchLogName'/>
            </div>
            <button>Sök</button>
          </form>
          <div className='listLog'>
            <div className='listHead'>Senaste LOGGAR</div>
            <div id='logres' className='currentLogs'></div>
          </div>
        </div>
        <form>
          <div className='inputGroup'>
            <label htmlFor='logName'>Skapa Ny</label>
            <input type='text' name='logName' id='logName'/>
          </div>
          <button>Skapa log</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default DashBoard;