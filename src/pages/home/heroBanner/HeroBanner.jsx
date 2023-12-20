/* eslint-disable no-unused-vars */
import './style.scss';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useFetch} from '../../../hooks/useFetch'
import { useSelector, useDispatch } from 'react-redux';
import Img from '../../../components/lazyLoadImg/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {

const [background, setBackground] = useState("");
const [query, setQuery] = useState("");

const navigate = useNavigate();

const {loading, data} = useFetch(`/movie/upcoming`);

const {url} = useSelector((state)=>state.home)
// console.log('HeroBanner', url.backdrop);   //   https://image.tmdb.org/t/p/original

// ---------on click of Enter---------------------------------
const searchQueryHandler = (e)=>{
  // console.log('searchQuery', e)
  if(e.key == "Enter" && query.length > 0){
    navigate(`/search/${query}`);
    // <Route path='/search/:query' element={<SearchResult />}/>
    setQuery("");
  }
}

const clickHandler = ()=>{
  navigate(`/search/${query}`);
  setQuery("");
}

//----------- pick random image from '/movie/upcoming'---------
useEffect(()=>{
//  const bg = data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
//  console.log('bg',bg)   //...   /jBOyi3ibJbVa1imTCcddPUxTVAV.jpg
 const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
//  console.log('bg',bg)   //...   https://image.tmdb.org/t/p/original/jBOyi3ibJbVa1imTCcddPUxTVAV.jpg
 setBackground(bg);
},[data, url.backdrop])


  return (
    <div className='heroBanner'>  

        {
          !loading && (
          <div className="backdrop_img">
            <Img src={background}/>
          </div>)
        }

        <ContentWrapper>  
            <div className="heroBannerContent">

                <span className="title">MovieX.</span>             
                <span className="subtitle">The biggest Indian hits. The best Indian stories. All streaming here.</span>
                <div className="searchInput">
                  <input type="text" placeholder="search for movies and tv shows..."
                    onChange={(e)=>setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                  />
                  <button onClick={clickHandler}>Search</button>
                </div>

            </div>
        </ContentWrapper>

        {/* opacity_layer is for giving style */}
        <div className="opacity_layer"></div>

        

    </div>
  )
}

export default HeroBanner


/* 
   In order to generate a fully working image URL, you'll need 3 pieces of data. 
   Those pieces are a base_url, a file_size and a file_path.

   1).The first two pieces can be retrieved by calling the /configuration API
    const res = https://api.themoviedb.org/3/configuration  =>   res?.images?.secure_base_url. => "https://image.tmdb.org/t/p/original"

   2).and the third is the file you're wishing to grab on a particular media object.



   https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
      for images we have above url => 
      original => is file size =>    tmdb has different sizes available to choose from , we have choosen original
      image url => /wwemzKWzjKYJFfCeiB57q3r4Bcm.png
 */