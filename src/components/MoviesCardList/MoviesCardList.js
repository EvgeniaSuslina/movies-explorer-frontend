import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import useWindowWidth from '../../utils/useWindowWidth'
import { MOVIES_DEFAULT, MOVIES_AT_DESKTOP,  MOVIES_AT_TABLETS, MOVIES_AT_MOBILES, ADD_MOVIES_DEFAULT, ADD_MOVIES_DESKTOP, ADD_MOVIES_TABLETS, ADD_MOVIES_MOBILES } from '../../utils/config';


function MoviesCardList({foundMovies, onSaveMovie, onDeleteMovie, savedMovies}){
 
  const widthOfWindow = useWindowWidth();
  const location = useLocation();

  const [content, setContent] = useState([]);
  const [maxMovies, setMaxMovies] = useState(MOVIES_DEFAULT);

  useEffect(() => {
    setMovies();
  }, [maxMovies]);

  useEffect(() => {
    checkWidthOfWindow();
  }, [widthOfWindow, foundMovies, location])

  function setMovies(){
    let movies = [];
    foundMovies.forEach((item, i) => {
      if(i < maxMovies) {
        movies.push(item);
      }
    });
    setContent(movies);
  }

  function setFoundMovies(count) {
    setMaxMovies(count);
    let movies = [];
    foundMovies.forEach((item, i) => {
      if(i < count) {
        movies.push(item);
      }
    });
    setContent(movies);
  }

  function checkWidthOfWindow(){
    if(widthOfWindow >= 1200) {

      setFoundMovies(MOVIES_AT_DESKTOP);

    } else if (widthOfWindow >= 940) {

      setFoundMovies(MOVIES_AT_TABLETS);

    } else if (widthOfWindow >= 550) {

      setFoundMovies(MOVIES_AT_MOBILES);
    }

    if (location.pathname === '/saved-movies') {
      setMaxMovies(MOVIES_DEFAULT);
    }
  }

  function showAdditionalMovies(){
    if(widthOfWindow >= 1200) {

      setMaxMovies(maxMovies + ADD_MOVIES_DESKTOP);

    } else if (widthOfWindow >= 940) {

      setMaxMovies(maxMovies + ADD_MOVIES_TABLETS);

    } else if (widthOfWindow >= 550) {

      setMaxMovies(maxMovies + ADD_MOVIES_MOBILES);

    } else {

      setMaxMovies(maxMovies + ADD_MOVIES_DEFAULT);

    }
  }

  return(
  <section className="movies-card-list">            
        <ul className="movies-card-list__grid">
          {content.map((item => {
             <MoviesCard
             movie={item}
             key={item.id || item._id}
             onSaveMovie={onSaveMovie}         
             onDeleteMovie={onDeleteMovie}
             savedMovies={savedMovies}             
             />
          }))}        
        </ul>
        {foundMovies.length !== content.length ? (
          <button className="movies-card-list__button" type="button" onClick={showAdditionalMovies}>Ещё</button>
        ):  ( '' )}        
  </section>
  )
} 

export default MoviesCardList;