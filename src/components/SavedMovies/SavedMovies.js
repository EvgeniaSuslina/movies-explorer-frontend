import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import {useEffect} from 'react';

function SavedMovies({isLoading, getSavedMovies, onDeleteMovie, savedMoviesByUser, setSavedMovies}) {

    useEffect(() =>{
        getSavedMovies();
    }, [])

    return(
        <>
            <Header navType={'loggedInLinks'}/>
            <SearchForm 
            isLoading={isLoading}
            savedMovies={savedMoviesByUser}
            setSavedMovies={setSavedMovies}
            />
            <MoviesCardList                 
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMoviesByUser}
            />            
            <Footer />
        </>       
    )
}

export default SavedMovies;