import React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerPopup from '../BurgerPopup/BurgerPopup';


function Movies({onSearch, allMovies, isLoading, isApiError,onSaveMovie, onDeleteMovie, filteredMovies, loggedIn, setFilteredMovies}) {

    const [isBurgerPopupOpened, setIsBurgerPopupOpened] = useState(false);

    function handleBurgerPopupClick() {
    setIsBurgerPopupOpened(true);
    }

    function closePopup() {
    setIsBurgerPopupOpened(false);
    }

    return (
        <>
            <Header navType={'loggedInLinks'} onButtonClick={ handleBurgerPopupClick }/>
            <BurgerPopup isOpen={ isBurgerPopupOpened } onButtonClick={ closePopup }/>
            <main className="movies">
                <SearchForm 
                onSearch={onSearch}
                isLoading={isLoading}
                allMovies={allMovies}
                setFilteredMovies={setFilteredMovies}
                />
                <MoviesCardList 
                isLoading={isLoading}
                isApiError={isApiError}
                allMovies={allMovies || JSON.parse(localStorage.getItem('allMovies'))}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                filteredMovies={filteredMovies}
                loggedIn={loggedIn}
                />                               
            </main>
            <Footer />
        </>     
    )
}

export default Movies;