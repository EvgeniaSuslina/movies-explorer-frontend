import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import {useEffect} from 'react';

function SavedMovies({getAllSavedMovies, savedMovies, onDeleteMovie, setSavedMovies, isLoading}) {

    useEffect(() => {
        getAllSavedMovies();
    }, []);

    return(
        <>
            <Header navType={'loggedInLinks'}/>
            <SearchForm 
            isLoading={isLoading}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            />
            <MoviesCardList 
            onDeleteMovie={onDeleteMovie}
            savedMovies={savedMovies}
            />
            <Footer />
        </>       
    )
}

export default SavedMovies;