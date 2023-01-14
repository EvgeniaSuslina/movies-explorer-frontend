import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function SavedMovies({onSearch,  savedMovies, onSaveMovie, onDeleteMovie, onSubmitCheckbox, preloaderStatus}) {
   
    return(
        <>
            <Header navType={'loggedInLinks'}/>
            <main className="movies">
            <SearchForm 
            onSearch={onSearch}
            onSubmitCheckbox={onSubmitCheckbox} 
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
            </main>        
            <Footer />
        </>       
    )
}

export default SavedMovies;