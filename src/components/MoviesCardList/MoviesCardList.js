import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import useWindowWidth from '../../utils/useWindowWidth'
import { MOVIES_AT_DESKTOP,  MOVIES_AT_TABLETS, MOVIES_AT_MOBILES, ADD_MOVIES_DESKTOP, ADD_MOVIES_TABLETS, ADD_MOVIES_MOBILES } from '../../utils/config';


function MoviesCardList({isLoading, isApiError, onSaveMovie, onDeleteMovie, savedMovies, filteredMovies, allMovies, loggedIn}){
 
  const widthOfWindow = useWindowWidth();
  const location = useLocation();

  const [content, setContent] = useState(null);
  const [maxMovies, setMaxMovies] = useState(12);
  const [maxAdditionalMovies, setMaxAdditionalMovies] = useState(3);
  const [buttonShown, setButtonShown] = useState(false);

  const notFoundMessage = (<p className="movies-card-list__text">Увы! Фильмы не найдены</p>);
  const apiErrorMessage = (<p className="movies-card-list__text">Во время запроса произошла ошибка.Подождите немного и попробуйте ещё раз</p>);

   //checking the width of screen
  useEffect(() => {
    checkWidthOfWindow();
  }, [widthOfWindow]);


  //render movies
  useEffect(() => {
    checkWidthOfWindow();

    if(location.pathname === '/movies' && (!(filteredMovies === undefined))) {
      setContent(
        <ul className="movies-card-list__grid">
          {renderMovies(filteredMovies)}
        </ul>);
    }
  }, []);

//check if user logged in
   useEffect(() => {
    if (!loggedIn) {
      setContent(null)
    }
   }, [loggedIn]);


//preloader
   useEffect(() => {
    if (isLoading) {
      setContent(<Preloader/>);
    }
   }, [isLoading]);


//render saved movies
  useEffect(() => {
    if(location.pathname === '/saved-movies' && savedMovies && savedMovies.length > 0) {
      if(maxMovies >= savedMovies.length) {
        setButtonShown(false);
      } else {
        setButtonShown(true);
      }

      setContent(
        <ul className="movies-card-list__grid">
          {renderMovies(savedMovies)}
        </ul>);
    } else if (location.pathname === '/saved-movies' && savedMovies && savedMovies.length === 0) {
        setContent(notFoundMessage);
        setButtonShown(false);
    }
  }, [savedMovies, location.pathname, maxMovies]);


//render filtered movies
  useEffect(() => {
    if (localStorage.getItem('searchRequest')) {
      if(filteredMovies && filteredMovies.length > 0) {
        if(maxMovies >= filteredMovies.length) {
          setButtonShown(false);
        } else {
          setButtonShown(true);
        }
        setContent(
          <ul className="movies-card-list__grid">
            {renderMovies(filteredMovies)}
          </ul>);
      } else if (filteredMovies && filteredMovies.length === 0) {
        setContent(notFoundMessage);
      }
    }
  }, [filteredMovies, maxMovies]);

//check api error
  useEffect(() => {
    if (isApiError) {
      setContent(apiErrorMessage);
      setButtonShown(false);
    } else {
      setContent(null)
    }
  }, [isApiError])


//checking the width of screen
  function checkWidthOfWindow(){
    if(widthOfWindow >= 1100) {

      setMaxMovies(MOVIES_AT_DESKTOP);
      setMaxAdditionalMovies(ADD_MOVIES_DESKTOP)

    } else if (widthOfWindow >= 625) {
      
      setMaxMovies(MOVIES_AT_TABLETS);
      setMaxAdditionalMovies(ADD_MOVIES_TABLETS);

    } else if (widthOfWindow >= 320) {

      setMaxMovies(MOVIES_AT_MOBILES);
      setMaxAdditionalMovies(ADD_MOVIES_MOBILES);
    }    
  }

//render Movies at the page
  function renderMovies(listOfMovies) {
    if (!listOfMovies) {
      return;
    }

    return (
      <>
        {
          listOfMovies.slice(0, maxMovies).map((movie) => {
            return <MoviesCard
            movie={movie}
            key={movie.id || movie.movieId}
            onSaveMovie={onSaveMovie}         
            onDeleteMovie={onDeleteMovie}
            savedMovies={savedMovies} 
            allMovies={allMovies}
            filteredMovies={filteredMovies}
             />
          })
        }
      </>
    )
  }

//handle button click
function handleButtonClick(){
  if (location.pathname === '/movies') {
    setMaxMovies(maxMovies + maxAdditionalMovies)
  }

  if(location.pathname === '/saved-movies') {
    setMaxMovies(maxMovies + maxAdditionalMovies);

    if(savedMovies && savedMovies.length > 0) {
      const movieElement = <ul className="movies-card-list__grid">
      {renderMovies(savedMovies)}
    </ul>;

      setContent(movieElement);

      if(maxMovies > savedMovies.length) {
        setButtonShown(false);
      } else {
        setButtonShown(true);
      }
    }
  }
}
  

  return(
  <section className="movies-card-list">            
        {content}
        {buttonShown && 
          <button className="movies-card-list__button" type="button" onClick={handleButtonClick}>Ещё</button>
        }           
  </section>
  )
} 

export default MoviesCardList;