import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ isLoading, onUpdateUser, onSignout}) {
    const [isBurgerPopupOpened, setIsBurgerPopupOpened] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    const [data, setData] = useState({
        name: {
            value : "",
            isValid: true,
            errorMessage: ""
        },
        email: {
            value : "",
            isValid: true,
            errorMessage: ""
        }
    })
    
    const [disabled, setDisabled] = useState(false);

    const isValid = data.name.isValid && data.email.isValid;

    useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);
    

    useEffect(() => {
        isValid === true ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    useEffect(() => {
        if(currentUser.name === data.name.value && currentUser.email === data.email.value){
            setDisabled(true);
        } else if (isValid) {
            setDisabled(false);
        }   else if(!isValid) {
            setDisabled(true);        
        }
    }, [currentUser, data, isValid]);
    
    useEffect(() => {
        setData({
            name: {
                value: currentUser.name,
                isValid: true,
                errorMessage: ""
            },
            email: {
                value: currentUser.email,
                isValid: true,
                errorMessage: ""
            }
        });
    }, [currentUser]);

    const handleChange = (evt) => {
        const { name, value, validity, validationMessage } = evt.target;

        setData((prevState) => ({
            ...prevState,
            [name]: {
                ...data[name],
                value,
                isValid: validity.valid,
                errorMessage: validationMessage
            }
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser({
            name: data.name.value,
            email: data.email.value
        });
    }
   

    function handleBurgerPopupClick() {
    setIsBurgerPopupOpened(true);
    }

    function closePopup() {
    setIsBurgerPopupOpened(false);
    }

    return(
        <>
        <Header navType={'loggedInLinks'} onButtonClick={ handleBurgerPopupClick }/>
        <BurgerPopup isOpen={ isBurgerPopupOpened } onButtonClick={ closePopup }/>
        <section className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}</h2>
            <form className="profile__form" onSubmit={ handleSubmit }>
            <label className="profile__label">
                <p className="profile__label-text">Имя</p>
                <input 
                className="profile__input"
                type="text"
                name="name"
                required
                minLength="2"
                maxLength="20"
                value={data.name.value|| ""}
                onChange={handleChange}
                />
            </label>
            <span className="auth__form-error">
                {data.name.errorMessage}
            </span>
            <label className="profile__label">
                <p className="profile__label-text">Почта</p>
                <input 
                className="profile__input"
                type="email"
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                value={data.email.value|| ""}
                onChange={handleChange}
                />
            </label>
            <span className="auth__form-error">
                {data.email.errorMessage}
            </span>
            <button className={`${isValid && !isLoading ? "profile-button" : "profile-button_disabled"}`} type="button" disabled={disabled}>
                Редактировать
            </button>
            <Link className="profile__exit-link" to="/" target="_blank">Выйти из аккаунта</Link>
            </form>
        </section>
        </>        
    )
}

export default Profile;