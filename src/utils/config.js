export const BASEURL = 'http://localhost:3001';
export const MOVIESURL = 'https://api.nomoreparties.co';


//кол-во карточек, которые выдает поиск в зависимости от экрана
export const MOVIES_DEFAULT = 12;
export const MOVIES_AT_DESKTOP = 12;
export const MOVIES_AT_TABLETS = 8;
export const MOVIES_AT_MOBILES = 5;

//кол-во карточек при нажатии кнопки Еще
export const ADD_MOVIES_DEFAULT = 4;
export const ADD_MOVIES_DESKTOP = 3;
export const ADD_MOVIES_TABLETS = 2;
export const ADD_MOVIES_MOBILES = 2;

const MOVIE_DURATION = (movie) => `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;

export {MOVIE_DURATION}