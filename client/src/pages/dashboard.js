import axios from 'axios';
import React, { useEffect } from 'react'
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

  const api = 'http://localhost:3000/api/v1';

  const navigate = useNavigate();

  const [listOfLogs, setListOfLogs] = React.useState([]);
  const [listOfSearchLogs, setListOfSearchLogs] = React.useState([]);

  const [inputs, setInputs] = React.useState({});
  const handleInputChange = (e) => {
    setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}));
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

  const handleSearch = (e) => {
    const val = e.target.value;
    var filteredArray = listOfLogs.filter((log) => {
      return log.logname.toLowerCase().includes(val.toLowerCase())
    });
    if (val === '') {
      filteredArray = [];
    } else {
      setListOfSearchLogs(filteredArray);
    }
  }

  const handleCreate = (e) => {
    e.preventDefault();

    const createLog = async () => {
      await axios.post(
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

    createLog();
  }

  return (
  <div>
    <div className='prompt'>
      <div className='promptHeader'>LOG</div>
      <div className='promptBody'>
        <div className='befLog'>
          <div className='inputGroup'>
            <label htmlFor='searchlog'>Sök Befintlig LOG</label>
            <input type='text' name='searchlog' onChange={handleSearch} id='searchlog'/>
          </div>
          <div className='listLog'>
            <div className='listHead'>Sökt Log</div>
            <div className='logs'>
              {listOfSearchLogs.map(log => (
                <div key={log.logname} className='log'>
                  <div>{log.logname}</div>
                  <div className='open'>Öppna</div>
                </div>
              ))}
            </div>
            <div className='listHead'>Senast använda Loggar</div>
            <div id='logres' className='logs'>
              {listOfLogs.slice(0, 5).map(log => (
                <div key={log.logname} className='log'>
                  <div>{log.logname}</div>
                  <div className='open'>Öppna</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleCreate}>
          <div className='inputGroup'>
            <label htmlFor='logname'>Skapa Ny</label>
            <input type='text' name='latestlogs' id='logname' onChange={handleInputChange} placeholder='Namn på ny log'/>
          </div>
          <button type='submit'>Skapa log</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default DashBoard;