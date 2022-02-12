import React from 'react'

const DashBoard = () => {
  return (
  <div>
    <div className='prompt'>
      <div className='promptHeader'>LOG</div>
      <div className='promptBody'>
        <form>
          <div className='inputGroup'>
            <label htmlFor='logName'>LOG Namn</label>
            <input type='text' name='logName' id='logName'/>
          </div>
          <button>Skapa log</button>
        </form>
        <div className='befLog'>
          <div className='befLogHeader'>Gå till befintlig LOG</div>
          <form>
            <div className='inputGroup'>
              <label htmlFor='searchLogName'>Sök på LOG-namn</label>
              <input type='text' name='searchLogName' id='searchLogName'/>
              <button>Sök</button>
            </div>
          </form>
          <div id='logres' className='searchLogResults'>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DashBoard;