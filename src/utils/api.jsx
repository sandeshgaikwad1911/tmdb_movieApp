/* eslint-disable no-unused-vars */

import axios from "axios";

const base_url = "https://api.themoviedb.org/3";
const tmdb_token = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + tmdb_token,
}

export const fetchDataFromApi = async(url, params)=>{
    try {
       const {data} =  await axios.get(base_url + url, { headers: headers, params: params});
       return data;
    } catch (error) {
        console.log('apiError',error);
        return error;
    }
}