import React from "react";
import { useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerPopup from '../BurgerPopup/BurgerPopup';

function Movies(foundMovies) {

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
                <SearchForm />
                <MoviesCardList 
                foundMovies={foundMovies}
                />
            </main>
            <Footer />
        </>     
    )
}

export default Movies;