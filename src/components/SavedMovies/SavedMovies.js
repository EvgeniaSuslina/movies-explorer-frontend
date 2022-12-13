import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
    return(
        <>
            <Header navType={'loggedInLinks'}/>
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>       
    )
}

export default SavedMovies;