import axios from 'axios';
import React, { useEffect } from 'react'
import makeToast from '../Toaster';
import { Link, useNavigate } from 'react-router-dom';
import structuredClone from '@ungap/structured-clone';
import Logout from './logout';

const DashBoard = () => {

  const api = 'http://localhost:3000/api/v1';

  const navigate = useNavigate();

  const [listOfLogs, setListOfLogs] = React.useState([]);
  const [listOfSearchLogs, setListOfSearchLogs] = React.useState([]);
  const [tmplog, setTmplog] = React.useState();
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

  const addCreatedLog = (log) => {
    var cpyLog = structuredClone(listOfLogs);
    cpyLog.push(log);
    setListOfLogs(cpyLog);
    console.log(listOfLogs);
  }

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
          logname: inputs.latestlogs
        },
        reqConfig)
          .then(response => {
            console.log(response.data.log)
            addCreatedLog(response.data.log);
          })
          .catch(err => {
            console.log(err);
          })
    }

    createLog();
  }

  return (
  <div>
    <Logout />
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
                <div key={log._id}>
                  <div className='log'>
                    <div>{log.logname}</div>
                    <Link to='/logs' state={{log: log}}>
                      <div className='open'>Öppna</div>
                    </Link>
                  </div>
                  <hr/>
                </div>
              ))}
            </div>
            <div className='listHead'>Senast använda Loggar</div>
            <div id='logres' className='logs'>
              {listOfLogs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5).map(log => (
                <div key={log._id} >
                  <div className='log'>
                    <div>{log.logname}</div>
                    <Link to='/logs' state={{log}}>
                      <div className='open'>Öppna</div>
                    </Link>
                  </div>
                  <hr/>
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