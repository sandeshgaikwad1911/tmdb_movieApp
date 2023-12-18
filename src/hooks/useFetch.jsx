/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import {fetchDataFromApi} from '../utils/api';

export const useFetch = (url)=>{

    const [loading, setLoading] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    console.log('useFetch_data', data);

    useEffect(()=>{

        setLoading("Loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url).then((res)=>{
            console.log('useFetch_res', res)
            setData(res);
            setLoading(false)
            setError(false)
        }).catch((error)=>{
            setLoading(false);
            setError("something went wrong!")
        })

    },[url])

    return {loading, error, data};

}
