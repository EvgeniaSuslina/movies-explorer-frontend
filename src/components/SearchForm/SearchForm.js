import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//import savedMovies from '../SavedMovies/SavedMovies';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesFilter from '../MoviesFilter/MoviesFilter';


function SearchForm({onSearch, isLoading, setFilteredMovies, allMovies, setSavedMovies, savedMovies}){

    const [inputValue, setInputValue] =  useState(localStorage.getItem('searchRequest') || '');
    const [errorShown, setErrorShown] = useState(false);
    const [inputValidity, setInputValidity] = useState(false);

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(inputValidity);

    const location = useLocation()

//search request
    useEffect(() => {
        if (location.pathname === '/movies') {
            if(localStorage.getItem('searchRequest')) {
                setInputValue(localStorage.getItem('searchRequest'));
            }

            if (JSON.parse(localStorage.getItem('isCheckboxChecked'))) {
                setIsCheckboxChecked(JSON.parse(localStorage.getItem('isCheckboxChecked')));
            }
        }
        if (location.pathname === '/saved-movies') {
            setInputValue('');
            setIsCheckboxChecked(false);

            if (inputValue.length === 0) {
                setErrorShown(true);
            }
        }
    }, []);


//update local storage
    useEffect(() => {
        if (location.pathname === '/movies') updateLocalStorage();
    }, [isCheckboxChecked]);


//pathname = movies
     useEffect(() => {
        if (localStorage.getItem('allMovies') && location.pathname === '/movies') {
            const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('allMovies')), 
            inputValue, isCheckboxChecked);

            if (!(filteredMovies === undefined)) {
                localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                setFilteredMovies(filteredMovies);
            }
        }
     }, [allMovies, isCheckboxChecked])


//pathname = saved-movies
     useEffect(() => {
        if (location.pathname === '/saved-movies' && localStorage.getItem('savedMovies')) {
            const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('savedMovies')),
            inputValue, isCheckboxChecked);

            if(!(filteredMovies === undefined)) {
                localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                setSavedMovies(filteredMovies);
            }
        }
     }, [isCheckboxChecked]);

//update local storage
    function updateLocalStorage(){
        localStorage.setItem('searchRequest', inputValue);
        localStorage.setItem('isCheckboxChecked', JSON.stringify(isCheckboxChecked));
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
    function handleCheckboxClick(){
        setIsCheckboxChecked(!isCheckboxChecked);

        if(location.pathname === '/movies') {
            if (localStorage.getItem('allMovies')) {
                const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('allMovies')), 
                inputValue, isCheckboxChecked);
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
                inputValue, isCheckboxChecked);
                localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
                setFilteredMovies(filteredMovies);
            } else {
                onSearch()
            }
        }

        if (location.pathname === '/saved-movies') {
            if(savedMovies) {
                const filteredMovies = MoviesFilter(JSON.parse(localStorage.getItem('savedMovies')),
                inputValue, isCheckboxChecked);

                if(!(filteredMovies === undefined)) {
                    setSavedMovies(filteredMovies);
                }
            }
        }        
    }
 
    return (
        <div className="search-form-content">            
            <form className="search-form" onSubmit={handleSubmitForm} noValidate={true}>                
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
            isCheckboxChecked={isCheckboxChecked}
            onChange={handleCheckboxClick}
            />
        </div>
    )
}

export default SearchForm;