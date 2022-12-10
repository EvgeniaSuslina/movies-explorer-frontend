import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(){
    return (
        <div className="search-form__content">
            <form className="search-form">
                <input 
                className="search-form__input" 
                placeholder="Фильм"
                required
                type="text"
                minLength="1"
                />
            <button className="search__button" type="submit"></button>
            </form>
            <FilterCheckbox />
        </div>
    )
}

export default SearchForm;