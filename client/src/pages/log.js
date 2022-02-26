import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation} from 'react-router-dom';
import makeToast from '../Toaster';

const Log = () => {

  const token = localStorage.getItem('accessToken');
  const reqConfig = {
    headers: {
      Authorization:  `Bearer ${token}`
    }
  };

  const api = 'http://localhost:3000/api/v1';
  const location = useLocation();
  //const { logid } = location.state;
  const { log } = location.state;
  //const [entries, setEntries] = React.useState([]);
  //const [curLog, setCurLog] = React.useState(() => {
  //  const getLog = async () => {
  //    const result = await axios.get(api + '/logs/' + logid, reqConfig);
  //    setEntries(result.data.log.entries);
  //  }
  //  return getLog();
  //});


  //useEffect(() => {
  //  const getLog = async () => {
  //    const result = await axios.get(api + '/logs/' + logid, reqConfig);
  //    setCurLog(result.data);
  //    //console.log(curLog.log);
  //  }

  //  getLog();
  //}, []);

  return (
  <div className='logcard'>
      <h1 className='logheader'>{log.logname}</h1>
      <div className='logupdated'>Log senast uppdaterad: {new Date(log.updatedAt).toLocaleString()}</div>
      <div className='logcontent' id='logcontent'>
        {log.entries.map(entry => (
          <div key={entry._id} className='entrycontent'>
            <div className='entrydate'>{new Date(entry.createdAt).toLocaleDateString()}:</div>
            <div className='entry'>{entry.entry}</div>
            <div className='entrybtns'>
              <div>Redigera</div>
              <div>Radera</div>
            </div>
          </div>
        ))}
      </div>
  </div>
  );
}

export default Log;