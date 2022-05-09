import React, { ReactElement, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchLaunchStart } from "./store/launch/launch.reducer";
import {
  selectLaunchData,
  selectLaunchError,
  selectLaunchPending,
} from "./store/launch/launch.selector";
import CardList from "./components/cardList";
import FilterContainer from "./components/filterContainer";

function App() : ReactElement {
  const dispatch = useDispatch();

  const launchData = useSelector(selectLaunchData);
  const laucnPending = useSelector(selectLaunchPending);
  const laucnError = useSelector(selectLaunchError);

  const [searchField, setSearchField] = useState("");
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    //useEffect fire twice onMount https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    //React.strictMode is causing the re-render nothing else but it will work fine in production
    if (launchData.length < 1) {
      dispatch(fetchLaunchStart());
    }
    setLaunches(launchData); //again subscribing to launch data
  }, [launchData]);

  const filteredLaunchesBySearch = (searched: string): [] => {
    return launchData.filter(
      (data: any) =>
        data.mission_name.toLowerCase().includes(searched.toLowerCase()) ||
        data.rocket.rocket_name
          .toLowerCase()
          .includes(searched.toLowerCase()) ||
        data.launch_date_utc.includes(searched.toLowerCase())
    );
  };

  useEffect(() => {
    // subscribe on changes of searchField and filter the launches data
    setLaunches(filteredLaunchesBySearch(searchField));
  }, [searchField]);

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
        <input onChange={(e): any => setSearchField(e.target.value)} />
        <FilterContainer setLaunches={setLaunches} />
        {laucnPending && <p>Loading</p>}
        <CardList launchesData={launches} />
        {laucnError && <p>{laucnError}</p>}
      </header>
    </div>
  );
}

export default App;
