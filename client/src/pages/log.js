import React  from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import structuredCopy from '@ungap/structured-clone';
import axios from 'axios';
import { confirm } from 'react-confirm-box';
import Logout from './logout';
import reqConfig from '../app/vars';

const api = process.env.REACT_APP_API;

const EditLogName = ({logentry, setLogentry}) => {

  const token = localStorage.getItem('accessToken');

  const [logname, setLogname] = React.useState(logentry.logname)


  const handleChange = (e) => {
    setLogname(e.target.value);
  }

  const updateLogEntry = () => {
    var cpyLog = structuredCopy(logentry);
    cpyLog.logname = logname;
    cpyLog.show = false;
    setLogentry(cpyLog);
  }

  const changeLogName = (e) => {
    e.preventDefault();
    const cln = async () => {
      await axios.patch(
        api + '/logs',
        {
          logid: logentry._id,
          logname: logname,
          logtype: 'Övrigt', //<-- HARDCODED FOR NOW
          logstatus: 'Pågående' //<-- HARDCODED FOR NOW
        },
        reqConfig(token)
        )
        .catch(err => console.error(err));
      }
    cln();
    updateLogEntry();
  }

  return (
    <div>
      <form onSubmit={changeLogName} className='changelogname'>
        <input type='text' defaultValue={logname} onChange={handleChange} />
        <button type='submit'>Skicka</button>
      </form>
    </div>
  )
}

const NewEntry = ({logentry, setLogentry}) => {

  const token = localStorage.getItem('accessToken');

  const [newEntry, setNewEntry] = React.useState('');

  const handleChange = (e) => {
    setNewEntry(e.target.value);
  }

  const addLogEntry = (entry) => {
    entry.show = false
    var cpyLog = structuredCopy(logentry);
    cpyLog.entries.push(entry)
    setLogentry(cpyLog);
  }

  const createNewEntry = (e) => {
    e.preventDefault();
    const cne = async () => {
      await axios.post(
        api + '/entry',
        {
          entry: newEntry,
          logid: logentry._id
        },
        reqConfig(token)
      )
      .then(response => {
        addLogEntry(response.data);
      })
      .catch(err => console.error(err));
    }

    cne();
  }

  return (
    <div>
      <form onSubmit={createNewEntry}>
        <textarea onChange={handleChange}/>
        <button type='submit'>Skicka</button>
      </form>
    </div>
  )
}

const EditLog = ({entrytext, entryId, logentry, setLogentry}) => {

  const [entry, setEntry] = React.useState(entrytext);

  const handleChange = (e) => {
    setEntry(e.target.value)
  }

  const updateLogEntry = (entryid, entrytext) => {
    var cpyLog = structuredCopy(logentry);
    for (let l in cpyLog.entries) {
      if (cpyLog.entries[l]._id === entryid) {
        cpyLog.entries[l].entry = entrytext;
        cpyLog.entries[l].show = false;
        break;
      }
    }
    setLogentry(cpyLog);
  }

  const token = localStorage.getItem('accessToken');

  const updateEntry = (e) => {
    e.preventDefault();

    const update = async () => {
      await axios.patch(
        api + '/entry',
        {
          entry: entry,
          logid: logentry._id,
          entryid: entryId
        },
        reqConfig(token)
        ).then(response => {
        })
          .catch(err => {
            console.error(err);
          });
    }
    update();
    updateLogEntry(entryId, entry);
  }

  return (
  <div className='entryedit'>
    <form onSubmit={updateEntry}>
      <textarea defaultValue={entrytext} onChange={handleChange}/>
      <button type='submit'>Skicka</button>
    </form>
  </div>
  )
}

const Log = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  const location = useLocation();
  const { log } = location.state;

  log.entries.forEach(item => (item.show = false));
  log.show = false;

  log.entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [logentry, setLogentry] = React.useState(log);

  const startEdit = (id) => {
    var cpyLog = structuredCopy(logentry);
    for (let e in logentry.entries) {
      if (logentry.entries[e]._id === id && logentry.entries[e].show === false) {
        cpyLog.entries[e].show = true;
        break;
      } else if (logentry.entries[e]._id === id && logentry.entries[e].show === true) {
        cpyLog.entries[e].show = false;
        break;
      }
    }
    setLogentry(cpyLog);
  }

  const startEditLogName = () => {
    var cpyLog = structuredCopy(logentry);
    if (logentry.show === false) {
      cpyLog.show = true;
    } else {
      cpyLog.show = false;
    }

    setLogentry(cpyLog);
  }

  const popEntry = (id) => {
    var cpyLog = structuredCopy(logentry);
    const index = cpyLog.entries.findIndex(x => x._id === id);
    if (index > -1) {
      cpyLog.entries.splice(index, 1);
    }

    setLogentry(cpyLog);
  }

  const confirmoptions = {
    labels: {
      confirmable: 'Ja',
      cancellable: 'Nej'
    }
  }

  const deleteEntry = (entryid) => {
    const de = async () => {
      const ans = await confirm('Är du säker?', confirmoptions);
      if (!ans){
        return;
      }
      await axios.delete(
        api + '/entry',
        {headers: {
          Authorization: reqConfig(token).Authorization
        },
        data: {
          logid: logentry._id,
          entryid: entryid
        }
      })
      .then(response => {
        popEntry(entryid);
      })
      .catch(err => console.error(err));
    }

    de()
  }

  const deleteLog = () => {
    const dl = async () => {
      const ans = await confirm('Är du säker?', confirmoptions);
      if (!ans) {
        return;
      }
      await axios.delete(
        api + '/logs',
        {headers: {
          Authorization: reqConfig(token).Authorization
        },
        data: {
          logid: logentry._id
        }}
      )
      .then(response => {
        console.log(response);
        navigate('/dashboard');
      })
      .catch(err => console.error(err));
    }

    dl();
  }

  return (
    <div>
      <Logout />
      <div className='back'>
        <Link to='/dashboard'><div className='open'>&larr;</div></Link>
      </div>
      <div className='logcard'>
        <div className='logtop'>
          <div>
            <h1 className='logheader'>{logentry.logname}</h1>
            <div className='logupdated'>Log senast uppdaterad: {new Date(logentry.updatedAt).toLocaleString()}</div>
          </div>
          <div>
            {logentry.show ? <EditLogName logentry={logentry} setLogentry={setLogentry}/> : null}
          </div>
          <div className='entrybtns'>
            <div className='fntAwe' onClick={startEditLogName}><FontAwesomeIcon icon={faPenToSquare} title='Redigera lognamn'/></div>
            <div className='fntAwe' onClick={deleteLog}><FontAwesomeIcon icon={faTrash} title='Radera log'/></div>
          </div>
        </div>
          <div>
            Nytt inlägg:
            <NewEntry logentry={logentry} setLogentry={setLogentry}/>
          </div>
          <div className='logcontent' id='logcontent'>
            {logentry.entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(entry => (
              <div key={entry._id}>
                <div className='entrycontent'>
                  <div className='entrydate'>{new Date(entry.createdAt).toLocaleDateString()}:</div>
                  <div className='entry'>{entry.entry}</div>
                  <div className='entrybtns'>
                    <div className='fntAwe' onClick={() => startEdit(entry._id)} value={entry._id}>
                      <FontAwesomeIcon icon={faPenToSquare} title='Redigera inlägg'/>
                    </div>
                    <div className='fntAwe' onClick={() => deleteEntry(entry._id)}>
                      <FontAwesomeIcon icon={faTrash} title='Radera inlägg'/>
                    </div>
                  </div>
                </div>
                {entry.show ? <EditLog entrytext={entry.entry} logentry={logentry} entryId={entry._id} setLogentry={setLogentry}/> : null}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

export default Log;