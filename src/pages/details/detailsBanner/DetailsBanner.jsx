/* eslint-disable react/prop-types */
import './detailsBanner.scss'
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImg/Img';
import { useFetch } from '../../../hooks/useFetch';
import NoPoster from '../../../images/no-poster.png';
import CircleRating from '../../../components/circleRating/CircleRating';
import PlayIcon from '../playIcon/PlayIcon';
import VideoPopUp from '../../../components/videoPopUp/VideoPopUp';


const DetailsBanner = ({video, crew}) => {

    console.log('DetailsBanner videoId', video)

    const {mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}`);

    console.log('DetailsBanner data', data);

    const {url} = useSelector((state)=>state.home);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    };

    const director = crew?.filter((d)=>d.job ==="Director");

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const playVideo = ()=>{
        setShow(true);
        setVideoId(video?.key);
    }


  return (
    <div className='detailsBanner'>
        {
            !loading ? (
                <>
                    {
                        !!data && (
                            <React.Fragment>

                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data?.backdrop_path}/>
                                </div>

                                <div className="opacity-layer"></div>

                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {
                                                data.poster_path ? (
                                                    <Img src={url.backdrop + data.poster_path} className='posterImg'/>
                                                ) : (
                                                    <Img src={NoPoster} className='posterImg'/>
                                                )
                                            }
                                        </div>
                                        <div className="right">

                                            <div className="title">{`${data.name || data.title} (${dayjs(data.release_date || data.first_air_date).format("YYYY")})`}</div>

                                            <div className="subtitle">{data.tagline}</div>

                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)}/>
                                                {/* <div className="playbtn" onClick={playVideo}>
                                                    <PlayIcon />
                                                    <span className="text">Watch Trailer</span>
                                                </div> */}
                                                {
                                                    video != undefined ? (
                                                        <div className="playbtn" onClick={playVideo}>
                                                            <PlayIcon />
                                                            <span className="text">Watch Trailer</span>
                                                        </div>
                                                    ) : (<></>)
                                                }
                                                
                                            </div>

                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">{data.overview}</div>
                                            </div>

                                            <div className="info">
                                                {data.release_date && (
                                                    <div className="infoItem">                                                       
                                                        <span className="text bold">Release Date: </span>                
                                                        <span className="text">{dayjs(data.release_date).format("MMM DD YYYY")}</span>
                                                    </div>
                                                )}
                                                {data.first_air_date && (
                                                    <div className="infoItem">                                                       
                                                        <span className="text bold">First Air Date: </span>               
                                                        <span className="text">{dayjs(data.first_air_date).format("MMM DD YYYY")}</span>
                                                    </div>
                                                )}
                                                {data.runtime && (
                                                    <div className="infoItem">                                                       
                                                        <span className="text bold">Runtime: </span>               
                                                        <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {
                                                director?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">Director: </span>
                                                        <span className="text">
                                                            {director?.map((d, i)=>(
                                                                <span key={i}>
                                                                    {d.name} 
                                                                    {director.length - 1 !== i && ", "}    {/* if we have multiple directote, separate them with , */}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </ContentWrapper>

                                <VideoPopUp 
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />

                            </React.Fragment>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                    <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )
        }
    </div>
  )
}

export default DetailsBanner