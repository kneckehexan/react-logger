import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import makeToast from '../Toaster';

const Log = () => {

  const api = 'http://localhost:3000/api/v1';
  const params = useParams();
  //const logid = params.state.logid;
  const { logid } = useParams();
  const [curLog, setCurLog] = React.useState([]);

  const token = localStorage.getItem('accessToken');
  const reqConfig = {
    headers: {
      Authorization:  `Bearer ${token}`
    }
  };

  useEffect(() => {
    const getLog = async () => {
      const result = await axios.get(api + '/logs/' + logid, reqConfig)
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          makeToast("error", err.response.data.msg);
        })
        setCurLog(result.data);
    }

    getLog();
  }, []);

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