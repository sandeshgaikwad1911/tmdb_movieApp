/* eslint-disable no-unused-vars */
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Popular = () => {

    const [endPoint, setEndpoint] = useState("movie");

    const {data,loading} = useFetch(`/${endPoint}/popular`);

    const onTabChange = (tab)=>{
        setEndpoint(tab == "Movies" ? "movie" : "tv");
    }

  return (
    <div className="carouselSection">
        <ContentWrapper>

            <span className="carouselTitle">Popular</span>
            <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />  

        </ContentWrapper>

        <Carousel data={data?.results} 
            loading={loading}
            endPoint={endPoint}
        />

    </div>
  )
}

export default Popular;