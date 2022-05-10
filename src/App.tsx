import React, { ReactElement, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchLaunchStart } from "./store/launch/launch.reducer";
import {
  selectLaunchData,
  selectLaunchError,
  selectLaunchPending,
} from "./store/launch/launch.selector";
import CardList from "./components/cardList";
import FilterContainer from "./components/filterContainer";
import SearchField from "./components/searchField";

function App(): ReactElement {
  const dispatch = useDispatch();

  const launchData = useSelector(selectLaunchData);
  const laucnPending = useSelector(selectLaunchPending);
  const laucnError = useSelector(selectLaunchError);

  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    //useEffect fire twice onMount https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    //React.strictMode is causing the re-render nothing else but it will work fine in production
    if (launchData.length < 1) {
      dispatch(fetchLaunchStart());
    }
    setLaunches(launchData); //again subscribing to launch data
  }, [launchData]);

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="container">
        <SearchField 
          placeholder="Search spaceX launches" 
          setLaunches={setLaunches}
        />
        <FilterContainer setLaunches={setLaunches} />
        {laucnPending && <p>Loading</p>}
        <CardList launchesData={launches} />
        {laucnError && <p>{laucnError}</p>}
      </div>
    </div>
  );
}

export default App;
