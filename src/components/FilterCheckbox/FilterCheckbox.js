import React from 'react';
import './FilterCheckbox.css';


function FilterCheckbox() {
    return (
        <div className="checkbox__content">
        <input 
            className="checkbox"
            id={`checkbox__check`}
            type="checkbox"
        />
        <label
            className="checkbox__label"
            htmlFor={`checkbox__check`}
        > 
            <span className={`checkbox__switch-button`} />
        </label>
        <p className="checkbox__text">Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;