import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({onSearch, onChangeCheckbox}){
    const [inputValue, setInputValue] =  useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState({ errorMessage: '', isValid: true});

    const location = useLocation()

    useEffect(() => {
        error.isValid && setError({errorMessage: '', isValid: true})
    }, [])

    useEffect(() => {
        if (location.pathname === '/movies') {
            setInputValue(localStorage.getItem('searchWord'));
            setIsChecked(JSON.parse(localStorage.getItem('checkboxPosition')));
        }  else if (location.pathname === '/saved-movies') {
            const checkboxPosition = JSON.parse(localStorage.getItem('checkboxPositionSaved'));
            setIsChecked(checkboxPosition);
            onChangeCheckbox(checkboxPosition);
        }
    }, [location])


    function handleInputChange(evt) {
        setInputValue(evt.target.value);

        if(evt.target.value.lenght === 0) {
            setError({
                errorMessage: 'Нужно ввести ключевое слово',
                isValid: evt.target.value.valid
            });
        } else {
            setError({
                errorMessage: '',
                isValid: evt.target.value.valid
            });
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        if(!inputValue) {
            return setError({
                isValid: false,
                errorMessage: 'Нужно ввести ключевое слово'
            });
        }

        onSearch(inputValue, isChecked);
    }

    function handleChekboxChange(){
        setIsChecked(!isChecked);
        onChangeCheckbox(!isChecked);
    }



    return (
        <div className="search-form-content">            
            <form className="search-form" onSubmit={handleSubmit} noValidate>                
                <input 
                className="search-form__input" 
                placeholder="Фильм"
                name="filmName"
                required
                type="text"
                minLength="1"
                value={inputValue || ""}
                onChange={handleInputChange}
                />
            <button className="search-form__button" type="submit"></button>            
            </form>
            <span className="search-form__error">{error.errorMessage}</span>
            <FilterCheckbox 
            isChecked={isChecked}
            onChangeCheckbox={handleCheckboxClick}
            />
        </div>
    )
}

export default SearchForm;