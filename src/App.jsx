/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {fetchDataFromApi} from './utils/api';

import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './features/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=>state.home);

  const apiTesting = ()=>{
    fetchDataFromApi(`/movie/popular`).then((res)=>{
      console.log('apiRes',res);
      dispatch(getApiConfiguration(res));
    })
  }

  
  useEffect(()=>{
    apiTesting();
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/:mediaType/:id' element={<Details />}/>
          <Route path='/:search/:query' element={<SearchResult />}/>
          <Route path='/:explore/:mediaType' element={<Explore />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App;


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


  /* 
      tmdb => profile => settings => api =>
      1. application name  =>
      2. application url => http://localhost:5173/

      overview
      1.  API Read Access Token
  */

      // ------------------------------------------------

  /* 
      export const store = configureStore({
      reducer: {
        home: homeReducer
      },
})
      useSelector((state)=>state);

        here state return reducer object
  
  */

      // ------------------------------------------------