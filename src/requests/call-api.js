import axios from "axios";

export const url ='https://api.spacexdata.com/v3/launches';

export const callApi = async (fetcher=axios, url) => {
    return await fetcher(url)
};