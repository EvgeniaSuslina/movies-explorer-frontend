import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
import movieBanner from '../../images/movie__beg.svg'


function MoviesCard() {

    const location = useLocation();

    return(
        <li className="movie-card">
            <div className="movie-card__container">
                <img className="movie-card__img" src={ movieBanner } alt="Баннер фильма"/>
                <div className="movie-card__info">
                    <p className="movie-card__name">Бег это свобода</p>
                    <p className="movie-card__duration"> 1ч 17м</p>
                </div>
                {(location.pathname === '/movies') ? (
                    <button className="movie-card__button" type="button">Сохранить</button>
                ):(
                    <button className="movie-card__button-del" type="button"></button>
                )}
            </div>                
        </li>        
    )    
}

export default MoviesCard;