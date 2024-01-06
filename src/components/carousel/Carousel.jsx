/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './carousel.scss';

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill,} from "react-icons/bs";
import dayjs from "dayjs";
import Img from '../lazyLoadImg/Img';
import NoPoster  from '../../images/no-poster.png'
import Genres from '../genres/Genres';
import CircleRating from '../circleRating/CircleRating';

const Carousel = ({data, loading, endPoint, title}) => {

  const {url} = useSelector((state)=>state.home);
  const navigate = useNavigate();
  
  const carouselContainer = useRef();

// --------------------------------------------------------

  const navigation = (direction)=>{
    const container = carouselContainer.current
    const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth) : container.scrollLeft + (container.offsetWidth);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }
// --------------------------------------------------------
  const skItems = ()=>{
    return(
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }
  // .skeleton is in index.scss
// --------------------------------------------------------
  return (
    <div className='carousel'>
      <ContentWrapper>

        {title && (<div className='carouselTitle'>{title}</div>)}

        <BsFillArrowLeftCircleFill
            className='arrow carouselLeftNav' onClick={()=>navigation("left")}
        />

        <BsFillArrowRightCircleFill
            className='arrow carouselRighttNav' onClick={()=>navigation("right")}
        />

        {
          !loading ? (
            <div className="carouselItems" ref={carouselContainer}>
                {
                  data?.map((item)=>{
                    const posterUrl = item?.poster_path ? url.poster + item.poster_path : NoPoster
                    return(
                      <div className="carouselItem" key={item?.id}
                          onClick={()=>navigate(`/${item.media_type || endPoint}/${item?.id}`)}
                      >

                          <div className="posterBlock">
                            <Img src={posterUrl} />
                            <CircleRating rating={item.vote_average.toFixed(1)}/>
                          </div>

                          <div className="textBlock">
                            <span className="title">{item?.title || item?.name}</span>
                            <span className="date">{dayjs(item?.release_date || item?.first_air_date).format("DD MMM YYYY")}</span>
                          </div>

                      </div>
                    )
                  })
                }
            </div>
          ) : (
            <div className="loadingSkeleton">
                {skItems()}
                {skItems()}
                {skItems()}
                {skItems()}
                {skItems()}
                {skItems()}           
            </div>
          )
        }

      </ContentWrapper>
    </div>
  )
}

export default Carousel