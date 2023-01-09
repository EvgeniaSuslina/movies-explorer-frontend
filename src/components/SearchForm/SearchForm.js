import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesFilter from '../MoviesFilter/MoviesFilter';

function SearchForm({onSearch, isLoading, setFilteredMovies, allMovies, setSavedMovies, savedMovies}){

    const [inputValue, setInputValue] =  useState(localStorage.getItem('searchRequest') || '');
    const [errorShown, setErrorShown] = useState(false);
    const [inputValidity, setInputValidity] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(inputValidity);

    const location = useLocation()

//search request
    useEffect(() => {
        if (location.pathname === '/movies') {
            if(localStorage.getItem('searchRequest')) {
                setInputValue(localStorage.getItem('searchRequest'));
            }

            if (JSON.parse(localStorage.getItem('searchRequest'))) {
                setIsChecked(JSON.parse(localStorage.getItem('searchRequest')))
            }
        }
        if (location.pathname === '/saved-movies') {
            setInputValue('');
            setIsChecked(false);

            if (inputValue.length === 0) {
                setErrorShown(true);
            }
        }
    }, []);


//update local storage
    useEffect(() => {
        if (location.pathname === '/movies') updateLocalStorage();
    }, [isChecked]);


//pathname = movies
     useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem('allMovies')) {
            const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('allMovies')), 
            inputValue, isChecked);

            if (!(filteredMovies === undefined)) {
                localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                setFilteredMovies(filteredMovies);
            }
        }
     }, [allMovies, isChecked])


//pathname = saved-movies
     useEffect(() => {
        if (location.pathname === '/saved-movies' && localStorage.getItem('savedMovies')) {
            const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('savedMovies')),
            inputValue, isChecked);

            if(!(filteredMovies === undefined)) {
                localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                setSavedMovies(filteredMovies);
            }
        }
     })

//update local storage
    function updateLocalStorage(){
        localStorage.setItem('searchRequest', inputValue);
        localStorage.setItem('isChecked', JSON.stringify(isChecked));
        localStorage.removeItem('moviesContent')
        localStorage.removeItem('moviesMoreButton')
    }

//input change
    function handleInputChange(evt) {
        setInputValue(evt.target.value);
        setInputValidity(evt.target.validity.valid);

        if(!evt.target.validity.valid || evt.target.value.length < 2) {
            setErrorShown(true);
            setButtonDisabled(true);
        } else {
            setErrorShown(false);
            setButtonDisabled(false);
        }
    }

//checkbox change
    function handleChekboxChange(){
        setIsChecked(!isChecked);

        if(location.pathname === '/movies') {
            if (localStorage.getItem('allMovies')) {
                const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('allMovies')), 
                inputValue, isChecked);
                if (!(filteredMovies === undefined)) {
                    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                    setFilteredMovies(filteredMovies);
                }
            }            
        }        
    }

//form submit
    function handleSubmitForm(evt) {
        evt.preventDefault();

        if (inputValidity && !errorShown && location.pathname === '/movies') {
            updateLocalStorage();

            if(localStorage.getItem('allMovies')) {
                const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('allMovies')), 
                inputValue, isChecked);
                localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                setFilteredMovies(filteredMovies);
            } else {
                onSearch()
            }
        }

        if (location.pathname === '/saved-movies') {
            if(savedMovies) {
                const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('savedMovies')),
                inputValue, isChecked);

                if(!(filteredMovies === undefined)) {
                    setSavedMovies(filteredMovies);
                }
            }
        }        
    }
 
    return (
        <div className="search-form-content">            
            <form className="search-form" onSubmit={handleSubmitForm} noValidate>                
                <input 
                className="search-form__input" 
                placeholder="Фильм"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                disabled={isLoading}
                />
                <button  
                className={`search-form__button ${(isLoading || isButtonDisabled) && 'search-form__button_disabled'}`}
                disabled={(isLoading || isButtonDisabled)} 
                type="submit">
                </button>            
            </form>
            <span className="search-form__error">{errorShown && 'Нужно ввести ключевое слово'}</span>
            <FilterCheckbox 
            isChecked={isChecked}
            onChangeCheckbox={handleChekboxChange}
            />
        </div>
    )
}

export default SearchForm;