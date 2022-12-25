import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import {useState} from "react"

function SearchForm(){

    const [isValid, setIsValid] = useState(false);
    const [isError, setIsError] = useState(false);
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(evt) {
        setInputValue(evt.target.value);
        setIsError(false);
        setIsValid(evt.target.validity.valid);
    }

    function handleSubmitForm(evt) {
        evt.preventDefault();

        if (!isValid || inputValue.length === 0) {
            setIsErrorShown(true);
        } else {
            setIsErrorShown(false);
        }
    }


    return (
        <div className="search-form-content">
            <form className="search-form" noValidate onSubmit={handleSubmitForm}>
                <input 
                className="search-form__input" 
                placeholder="Фильм"
                required
                type="text"
                minLength="1"
                onChange={handleInputChange}
                />
            <button className="search-form__button" type="submit"></button>
            <span className="error-message">{isError && 'Нужно ввести ключевое слово'}</span>
            </form>
            <FilterCheckbox />
        </div>
    )
}

export default SearchForm;