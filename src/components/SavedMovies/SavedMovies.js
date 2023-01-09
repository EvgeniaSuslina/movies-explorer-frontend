import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({onSearch, onChangeCheckbox, onSaveMovie, onDeleteMovie, savedMovies, preloaderStatus}) {

    return(
        <>
            <Header navType={'loggedInLinks'}/>
            <SearchForm 
            onSearch={onSearch}
            onChangeCheckbox={onChangeCheckbox}
            />

            {preloaderStatus ? (
                <Preloader />
            ) : (
                <MoviesCardList 
                foundMovies={savedMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
                />
            )}
            <Footer />
        </>       
    )
}

export default SavedMovies;