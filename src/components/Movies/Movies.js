import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";


function Movies() {
    return (
        <>
            <Header navType={'loggedInLinks'}/>
            <main className="movies">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>     
    )
}

export default Movies;