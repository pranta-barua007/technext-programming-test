import axios from "axios";

export const url = "https://api.spacexdata.com/v3/launches";

interface IlaunchData {
  mission_name: string,
  rocket: object,
  launch_date_utc: string
}
export interface ResponseGenerator {
  config?: any,
  data?: any,
  headers?: any,
  request?: any,
  status?: number,
  statusText?: string
}

export const getLaunchData = (): Promise<ResponseGenerator> =>
  axios.get<IlaunchData[]>(url);
