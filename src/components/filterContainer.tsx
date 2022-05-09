import React, { useState, useEffect, ReactElement } from "react";
import { useSelector } from "react-redux";

import FilterSelector from "./filterSelector";

import { selectLaunchData } from "../store/launch/launch.selector";
import { getPreviousDate } from "../utils/date.util";

interface FilterContainerProps {
  setLaunches(data: any): any;
}

const FilterContainer = ({ setLaunches }: FilterContainerProps) : ReactElement => {
  const launchData = useSelector(selectLaunchData);

  const [filterByDate, setFilterByDate] = useState("");
  const [filterByLaunchStatus, setFilterByLaunchStatus] = useState("");
  const [filterByUpcoming, setFilterByUpcoming] = useState("");

  const filteredLaunchesByOptions = (
    fieldTobeFiltered: any,
    filterOption: any
  ): [] => {
    const toBool = (param: any) : any => {
      if (param === "true") {
        return true;
      } else if (param === "false") {
        return false;
      } else {
        return param;
      }
    };

    if (filterOption === "") {
      //for handlding error on launchStatus and upcoming
      return launchData;
    }

    return typeof toBool(filterOption) === "boolean"
      ? launchData.filter(
        (data: any) => data[fieldTobeFiltered] === toBool(filterOption)
      )
      : launchData.filter((data: any) =>
        data[fieldTobeFiltered].includes(filterOption)
      );
  };

  useEffect(() => {
    const data = filteredLaunchesByOptions("launch_date_utc", filterByDate);
    setLaunches(data);
  }, [filterByDate]);

  useEffect(() => {
    const data = filteredLaunchesByOptions(
      "launch_success",
      filterByLaunchStatus
    );
    setLaunches(data);
  }, [filterByLaunchStatus]);

  useEffect(() => {
    const data = filteredLaunchesByOptions("upcoming", filterByUpcoming);
    setLaunches(data);
  }, [filterByUpcoming]);

  let lastWeek = getPreviousDate(7);
  let lastMonth: any = getPreviousDate(30);
  lastMonth = lastMonth.split("-");
  lastMonth = `${lastMonth[0]}- ${lastMonth[1]}`;
  let lastYear: any = getPreviousDate(365);
  lastYear = lastYear.split("-");
  lastYear = `${lastYear[0]}`;

  const filterByDateArray: Array<any> = [
    { name: "Select Filter By Date", value: "" },
    { name: "Last week", value: lastWeek },
    { name: "Last month", value: lastMonth },
    { name: "Last year", value: lastYear },
  ];

  const filterByLaunchStatusArray: Array<any> = [
    { name: "Select Filter By Launch status", value: "" },
    { name: "Success", value: true },
    { name: "Failure", value: false },
  ];

  const filterByUpcomingArray: Array<any> = [
    { name: "Select Filter By Upcoming status", value: "" },
    { name: "Is Upcoming", value: true },
    { name: "Not Upcoming", value: false },
  ];

  return (
    <div>
      <FilterSelector
        filterOptions={filterByDateArray}
        onSelectorChange={(e: React.SyntheticEvent<HTMLSelectElement>) => // eslint-disable-line
          setFilterByDate(e.currentTarget.value)
        }
      />
      <FilterSelector
        filterOptions={filterByLaunchStatusArray}
        onSelectorChange={(e: React.SyntheticEvent<HTMLSelectElement>) => // eslint-disable-line
          setFilterByLaunchStatus(e.currentTarget.value)
        }
      />
      <FilterSelector
        filterOptions={filterByUpcomingArray}
        onSelectorChange={(e: React.SyntheticEvent<HTMLSelectElement>) => // eslint-disable-line
          setFilterByUpcoming(e.currentTarget.value)
        }
      />
    </div>
  );
};

export default FilterContainer;
