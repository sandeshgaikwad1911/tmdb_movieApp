/* eslint-disable react/prop-types */
import Carousel from "../../../components/carousel/Carousel"
import { useFetch } from "../../../hooks/useFetch"

const Simillar = ({mediaType, id}) => {
    const {data, loading,} = useFetch(`/${mediaType}/${id}/similar`)
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movie";
  return (
    <Carousel title={title} 
        loading={loading}
        endPoint={mediaType}
        data={data?.results}
    />
  )
}

export default Simillar