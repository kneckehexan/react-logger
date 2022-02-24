import axios from 'axios';
import React, { useEffect } from 'react'
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

  const api = 'http://localhost:3000/api/v1';

  const navigate = useNavigate();

  const [listOfLogs, setListOfLogs] = React.useState([]);

  const [inputs, setInputs] = React.useState({});
  const handleInputChange = (e) => {
    setInputs(prevState => ({...prevState, [e.target.id]: e.target.value}));
  }

  const token = localStorage.getItem('accessToken');
  const reqConfig = {
    headers: {
      Authorization:  `Bearer ${token}`
    }
  };

  useEffect(() => {
    const getLogData = async (config) => {
      const result = await axios.get(api + '/logs', config)

      setListOfLogs(result.data.logs);
    }

    getLogData(reqConfig);
  }, []);

  const handleSearch = () => {

  }

  const handleCreate = () => {
    axios.post(
      api + '/logs',
      {
        logname: inputs.logname
      },
      reqConfig)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        })
  }

  return (
  <div>
    <div className='prompt'>
      <div className='promptHeader'>LOG</div>
      <div className='promptBody'>
        <div className='befLog'>
          <form onSubmit={handleSearch}>
            <div className='inputGroup'>
              <label htmlFor='searchLogName'>Befintlig LOG</label>
              <input type='text' name='searchLogName' value={inputs.log || ''} onChange={handleInputChange} id='searchLogName'/>
            </div>
            <button type='submit'>Sök</button>
          </form>
          <div className='listLog'>
            <div className='listHead'>Senaste LOGGAR</div>
            <div id='logres' className='currentLogs'>
              {listOfLogs.map(log => (<li>{log.logname}</li>))}
            </div>
          </div>
        </div>
        <form onSubmit={handleCreate}>
          <div className='inputGroup'>
            <label htmlFor='logname'>Skapa Ny</label>
            <input type='text' name='logname' id='logname' onChange={handleInputChange} placeholder='Namn på ny log'/>
          </div>
          <button type='submit'>Skapa log</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default DashBoard;