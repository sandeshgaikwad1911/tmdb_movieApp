/* eslint-disable no-unused-vars */
import { useFetch } from '../../hooks/useFetch'
import {useParams} from 'react-router-dom';
import './details.scss'
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';

const Details = () => {

  const {mediaType, id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditLoading} = useFetch(`/${mediaType}/${id}/credits`); 
  console.log('details data', data)
  console.log('details credits', credits);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]}crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditLoading}/>
    </div>
  )
}

export default Details