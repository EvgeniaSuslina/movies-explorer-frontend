import React from 'react';
import './FilterCheckbox.css';


function FilterCheckbox({isCheckboxChecked, handleCheckboxClick}) {
    return (
        <div className="checkbox-content">
        <input 
            className="checkbox-content__input"
            id={`checkbox__check`}
            type="checkbox"
            onChange={handleCheckboxClick}
            checked={isCheckboxChecked}
        />
        <label
            className="checkbox-content__label"
            htmlFor={`checkbox__check`}
        > 
            <span className={`checkbox-content__switch-button`} />
        </label>
        <p className="checkbox-content__text">Короткометражки</p>
        </div>
    )
}



export default FilterCheckbox;