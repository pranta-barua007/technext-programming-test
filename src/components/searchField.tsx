import React, { useState, useEffect, ReactElement } from "react";
import { useSelector } from "react-redux";

import { selectLaunchData } from "../store/launch/launch.selector";

interface SearchFieldProps {
  placeholder: string
  setLaunches(data: any): any;
}

const SearchField = ({ placeholder, setLaunches }: SearchFieldProps): ReactElement => {
  const launchData = useSelector(selectLaunchData);
  const [searchField, setSearchField] = useState("");

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
    <input
      type={"search"}
      placeholder={placeholder}
      onChange={(e) : any => setSearchField(e.target.value)}
    />
  );
};

export default SearchField;
