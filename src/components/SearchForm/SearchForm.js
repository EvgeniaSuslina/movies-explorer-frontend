import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)

    useEffect(() => {
        for (const validation in validations) {
            switch(validation) {
                case 'isEmpty' :
                    value ? setEmpty(false) : setEmpty(true) 
                break;  
                default: 
                break                        
            }
        }
    }, [value, validations])

    return {
        isEmpty
    }

}

const useInput = (initialValue, validations) =>{
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return{
        value, 
        isDirty,
        onChange,
        onBlur,
        ...valid
    }
}

function SearchForm(){
    const filmName = useInput('', {isEmpty: true})

    return (
        <div className="search-form-content">            
            <form className="search-form" noValidate>                
                <input 
                className="search-form__input" 
                placeholder="Фильм"
                name="filmName"
                required
                type="text"
                minLength="1"
                value={filmName.value}
                onChange={e => filmName.onChange(e)}
                onBlur={e => filmName.onBlur(e)}
                />
            <button className="search-form__button" type="submit"></button>            
            </form>
            {(filmName.isDirty && filmName.isEmpty) && <span className="search-form__error">Нужно ввести ключевое слово</span>}
            <FilterCheckbox />
        </div>
    )
}

export default SearchForm;