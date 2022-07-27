import axios from "axios";

export const url = "https://api.spacexdata.com/v3/launches";

interface IlaunchData {
  mission_name: string,
  rocket: object,
  launch_date_utc: string
}

export const getLaunchData = () =>
  axios.get<IlaunchData[]>(url);

export interface ResponseGenerator {
  config?: any,
  data?: any,
  headers?: any,
  request?: any,
  status?: number,
  statusText?: string
}