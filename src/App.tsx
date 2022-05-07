import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLaunchStart } from './store/launch/launch.reducer';

function App() {
  const dispatch = useDispatch();

  const launchData = useSelector((state: any) => state.launch.data);
  const laucnPending = useSelector((state: any) => state.launch.pending);
  const laucnError = useSelector((state: any) => state.launch.error);

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
        <button
          onClick={() => dispatch(fetchLaunchStart())}
        >
          HIT ME!!
        </button>
        {
          laucnPending && <p>Loading</p>
        }
        {
          launchData.map((data: any, i: number) => <div key={i}>{data.mission_name}</div>)
        }
        {laucnError && <p>{laucnError}</p>}
      </header>
    </div>
  );
}

export default App;
