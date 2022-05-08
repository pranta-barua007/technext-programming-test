import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLaunchStart } from './store/launch/launch.reducer';
import { selectLaunchData, selectLaunchError, selectLaunchPending } from './store/launch/launch.selector';
import CardList from './components/cardList';

// function useParamSelector(selector:any, ...params:any) {
//   return useSelector(state => selector(state, ...params));
// }


function App() {
  const [searchField, setSearchField] = useState('');

  const dispatch = useDispatch();
  
  const launchData = useSelector(selectLaunchData);
  const laucnPending = useSelector(selectLaunchError);
  const laucnError = useSelector(selectLaunchPending);

  useEffect(() => {
    dispatch(fetchLaunchStart())
  }, [dispatch]);

  const filteredLaunches = () : [] => {
    return launchData.filter((data: any) => data.mission_name.toLowerCase().includes(searchField.toLowerCase()))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input onChange={(e) => setSearchField(e.target.value)} />
        {
          laucnPending && <p>Loading</p>
        }
        <CardList launchesData={filteredLaunches()}/>
        {laucnError && <p>{laucnError}</p>}
      </header>
    </div>
  );
}

export default App;
