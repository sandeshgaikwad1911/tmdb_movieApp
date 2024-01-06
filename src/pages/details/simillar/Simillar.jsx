/* eslint-disable react/prop-types */
import Carousel from "../../../components/carousel/Carousel"
import { useFetch } from "../../../hooks/useFetch"

const Simillar = ({mediaType, id}) => {
    const {data, loading,} = useFetch(`/${mediaType}/${id}/similar`)
    console.log('Simillar movies or tv shows', data?.results.length);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movie";
  return (
    <>
        {
            data?.results.length > 0 ? (<Carousel 
                title={title} 
                loading={loading}
                endPoint={mediaType}
                data={data?.results}
            />) : (<></>)
        }
        
    </>
  )
}

export default Simillar