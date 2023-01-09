import React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerPopup from '../BurgerPopup/BurgerPopup';
import Preloader from "../Preloader/Preloader";

function Movies({onSearch, onChangeCheckbox, foundMovies, savedMovies, onSaveMovie, onDeleteMovie, preloaderStatus}) {

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
                onChangeCheckbox={onChangeCheckbox}
                />
                { preloaderStatus ? (
                    <Preloader />
                ) : (
                    <MoviesCardList 
                    foundMovies={foundMovies}
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

export default Movies;