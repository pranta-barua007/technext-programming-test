import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLaunchStart } from './store/launch/launch.reducer';
import { selectLaunchData, selectLaunchError, selectLaunchPending } from './store/launch/launch.selector';
import CardList from './components/cardList';
import FilterSelector from './components/filterSelector';
import { getPreviousDate } from './utils/date.util';

// function useParamSelector(selector:any, ...params:any) {
//   return useSelector(state => selector(state, ...params));
// }


function App() {
  const dispatch = useDispatch();

  const launchData = useSelector(selectLaunchData);
  const laucnPending = useSelector(selectLaunchPending);
  const laucnError = useSelector(selectLaunchError);

  const [searchField, setSearchField] = useState('');
  const [launches, setLaunches] = useState([]);
  const [filterByDate, setFilterByDate] = useState('');
  const [filterByLaunchStatus, setFilterByLaunchStatus] = useState('');
  const [filterByUpcoming, setFilterByUpcoming] = useState('');

  useEffect(() => {
    //useEffect fire twice onMount https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    //React.strictMode is causing the re-render nothing else but it will work fine in production
    if (launchData.length < 1) {
      dispatch(fetchLaunchStart())
    }
    setLaunches(launchData); //again subscribing to launch data 
  }, [launchData]);

  const filteredLaunchesBySearch = (searched: string): [] => {
    return launchData.filter((data: any) =>
      data.mission_name.toLowerCase().includes(searched.toLowerCase())
      || data.rocket.rocket_name.toLowerCase().includes(searched.toLowerCase())
      || data.launch_date_utc.includes(searched.toLowerCase())
    )
  }

  useEffect(() => {
    // subscribe on changes of searchField and filter the launches data
    setLaunches(filteredLaunchesBySearch(searchField))
  }, [searchField])

  const filteredLaunchesByOptions = (fieldTobeFiltered: any, filterOption: any) => {

    const toBool = (param: any) => {
      if (param === 'true') {
        return true;
      } else if (param === 'false') {
        return false;
      } else {
        return param;
      }
    }

    if (filterOption === '') {
      //for handlding error on launchStatus and upcoming
      fieldTobeFiltered = 'launch_date_utc';
    }

    return typeof (toBool(filterOption)) === 'boolean'
      ? launchData.filter((data: any) =>
        data[fieldTobeFiltered] === toBool(filterOption)
      )
      : launchData.filter((data: any) =>
        data[fieldTobeFiltered].includes(filterOption)
      )
  }

  useEffect(() => {
    const data = filteredLaunchesByOptions('launch_date_utc', filterByDate)
    setLaunches(data)
  }, [filterByDate])

  useEffect(() => {
    const data = filteredLaunchesByOptions('launch_success', filterByLaunchStatus)
    setLaunches(data)
  }, [filterByLaunchStatus])

  useEffect(() => {
    const data = filteredLaunchesByOptions('upcoming', filterByUpcoming)
    setLaunches(data)
  }, [filterByUpcoming])

  let lastWeek = getPreviousDate(7);
  let lastMonth: any = getPreviousDate(30);
  lastMonth = lastMonth.split('-')
  lastMonth = `${lastMonth[0]}- ${lastMonth[1]}`;
  let lastYear: any = getPreviousDate(365);
  lastYear = lastYear.split('-')
  lastYear = `${lastYear[0]}`;

  const filterByDateArray: Array<any> = [
    { name: 'Select Filter By Date', value: '' },
    { name: 'Last week', value: lastWeek },
    { name: 'Last month', value: lastMonth },
    { name: 'Last year', value: lastYear }
  ];

  const filterByLaunchStatusArray: Array<any> = [
    { name: 'Select Filter By Launch status', value: '' },
    { name: 'Success', value: true },
    { name: 'Failure', value: false },
  ];

  const filterByUpcomingArray: Array<any> = [
    { name: 'Select Filter By Upcoming status', value: '' },
    { name: 'Is Upcoming', value: true },
    { name: 'Not Upcoming', value: false },
  ];

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
        <FilterSelector
          filterOptions={filterByDateArray}
          onSelectorChange={(e: React.SyntheticEvent<HTMLSelectElement>) => setFilterByDate(e.currentTarget.value)}
        />
        <FilterSelector
          filterOptions={filterByLaunchStatusArray}
          onSelectorChange={(e: React.SyntheticEvent<HTMLSelectElement>) => setFilterByLaunchStatus(e.currentTarget.value)}
        />
        <FilterSelector
          filterOptions={filterByUpcomingArray}
          onSelectorChange={(e: React.SyntheticEvent<HTMLSelectElement>) => setFilterByUpcoming(e.currentTarget.value)}
        />
        {
          laucnPending && <p>Loading</p>
        }
        <CardList launchesData={launches} />
        {laucnError && <p>{laucnError}</p>}
      </header>
    </div>
  );
}

export default App;
