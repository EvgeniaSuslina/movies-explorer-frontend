import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({onSearch, onSubmitCheckbox, isChecked,setIsChecked}){

    const [inputValue, setInputValue] =  useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [searchError, setSearchError] = useState({
        errorMessage: "",
        isValid: true
    });

    const location = useLocation();

//get data & checkbox state from localstorge
useEffect(() => { 
    if (location.pathname === '/movies') { 
        setInputValue(localStorage.getItem("searchWord")); 
        setIsCheckboxChecked(isChecked)        

    } else if (location.pathname === '/saved-movies') { 
        setIsCheckboxChecked(false);         
    }           
}, [location]);

    useEffect(() => {
        searchError.isValid && setSearchError({errorMessage: '', isValid: true});
    }, [])

//input change
    function handleInputChange(evt) {
        setInputValue(evt.target.value);       

        if(evt.target.value.length === 0) {
            setSearchError({               
                isValid: evt.target.validity.valid,
                errorMessage: "Нужно ввести ключевое слово",
            });
        } else {
            setSearchError({         
                isValid: evt.target.validity.valid,
                errorMessage: " "
            });
        }
    }

//checkbox change
    function handleCheckboxClick(){
        setIsCheckboxChecked(!isCheckboxChecked);
        onSubmitCheckbox(!isCheckboxChecked);
        setIsChecked(!isCheckboxChecked); 
    }


//form submit
    function handleSubmitForm(evt) {
        evt.preventDefault();

        if (!inputValue) {
            return setSearchError({
                isValid: false,
                errorMessage: "Нужно ввести ключевое слово",
            })
        }
        onSearch(inputValue, isCheckboxChecked);
    }   
 
    return (
        <div className="search-form-content">            
            <form className="search-form" onSubmit={handleSubmitForm} noValidate>                
                <input 
                className="search-form__input" 
                placeholder="Фильм"
                type="text"
                value={inputValue || ""}
                onChange={handleInputChange}
                />
                <button  
                className='search-form__button' 
                type="submit">
                </button>            
            </form>
            <span className="search-form__error">{searchError.errorMessage}</span>
            <FilterCheckbox 
            isCheckboxChecked={isCheckboxChecked}
            onSubmitCheckbox={handleCheckboxClick}
            />
        </div>
    )
}

export default SearchForm;