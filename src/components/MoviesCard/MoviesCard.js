import { useLocation } from 'react-router-dom';
import { MOVIESURL, MOVIE_DURATION } from '../../utils/config';
import './MoviesCard.css'


function MoviesCard({movie, onSaveMovie, onDeleteMovie, savedMovies}) {
    const location = useLocation();

    const isSaved = savedMovies.find((item) => item.movieId = movie.id);

    function handleSaveMovie(){
        if(isSaved) {
            onDeleteMovie(movie)
        } else {
            onSaveMovie(movie)
        }
    }

    function handleDeleteMovie(){
        onDeleteMovie(movie)
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
                    <button className={isSaved ? "movie-card__button-saved" : "movie-card__button"}type="button" onClick={handleSaveMovie}>
                        {!isSaved ? 'Сохранить' : ''}
                    </button>
                ):(
                    <button className="movie-card__button-del" type="button" onClick={handleDeleteMovie}></button>
                )}
            </div>                
        </li>        
    )    
}

export default MoviesCard;