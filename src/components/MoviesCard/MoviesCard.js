import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MOVIESURL, MOVIE_DURATION } from '../../utils/config';
import './MoviesCard.css'


function MoviesCard({movie, onSaveMovie, onDeleteMovie, savedMovies, allMovies, filteredMovies}) {

    const location = useLocation();
    const [isLiked, setIsLiked] = useState(false);

//check movies and data for like
    useEffect(() => {
        checkMovieData();

        if(JSON.parse(localStorage.getItem('savedMovies'))) {
            checkForLike(JSON.parse(localStorage.getItem('savedMovies')));
        }
    }, []);

    useEffect(() => {
        if(savedMovies) {
            checkForLike(savedMovies);
        }
    }, [savedMovies, allMovies, filteredMovies, movie])

   
//check if movie data is correct
   function checkMovieData() {
    if(movie.nameRU === null || !(/[\Wа-яА-ЯёЁ0-9\s\-?]+/g.test(movie.nameRU))) {
        movie.nameRU = 'не указано';
    }
    if (movie.nameEN === null || !(/[\w\d\s\-?]+/gi.test(movie.nameEN))) {
        movie.nameEN = 'not specified';
    }
    if (movie.country === null) {
        movie.country = 'не указано';
    }  
   }


   function checkForLike(listOfMovies) {
    if(listOfMovies) {
        listOfMovies.forEach((item) => {
            if(item.nameRU === movie.nameRU | item.nameEN === movie.nameEN) {
                setIsLiked(true);
            }
        })
    }
   };

//delete from saved
   function handleMovieDelete(){
    onDeleteMovie(movie._id);
   }


//save (or like)
   function handleMovieSave(){
    const movieImage = MOVIESURL+ movie.image.url;    
    const movieThumbnail = MOVIESURL + movie.image.formats.thumbnail.url;

    if(isLiked) {
        const savedMovie = JSON.parse(localStorage.getItem('savedMovies'))
        .filter((savedMovie) => movie.id === savedMovie.movieId)[0];

        if(savedMovie) {
            onDeleteMovie(savedMovie._id);
        }
    } else {
        checkMovieData();
        onSaveMovie(
            movie.country,
            movie.director, 
            movie.duration, 
            movie.year, 
            movie.description,
            movieImage, 
            movie.trailerLink, 
            movieThumbnail,
            movie.id, 
            movie.nameRU, 
            movie.nameEN,
        )
    }
   }



    return(
        <li className="movie-card">
            <div className="movie-card__container">
                <a href={movie.trailerLink} target='blank'>
                    <img className="movie-card__img" src={ movie.image.url ? `${MOVIESURL}/${movie.image.url}`: movie.image } alt={`Баннер фильма "${movie.nameRU}"`}/>
                </a>
                <div className="movie-card__info">
                    <p className="movie-card__name">{movie.nameRU}</p>
                    <p className="movie-card__duration"> {MOVIE_DURATION(movie)}</p>
                </div>
                {(location.pathname === '/movies') ? (
                    <button className={isLiked ? "movie-card__button-saved" : "movie-card__button"}type="button" onClick={handleMovieSave}>
                        {!isLiked ? 'Сохранить' : ''}
                    </button>
                ):(
                    <button className="movie-card__button-del" type="button" onClick={handleMovieDelete}></button>
                )}
            </div>                
        </li>        
    )    
}

export default MoviesCard;