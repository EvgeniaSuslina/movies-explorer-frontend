import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../Header/Header";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import './Profile.css';


function Profile() {

    const [isBurgerPopupOpened, setIsBurgerPopupOpened] = useState(false);

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
            <h2 className="profile__title">Привет, Евгения!</h2>
            <form className="profile__form">
            <label className="profile__label">
                <p className="profile__label-text">Имя</p>
                <input 
                className="profile__input"
                type="text"
                required
                name="name"
                value="Евгения"
                />
            </label>
            <label className="profile__label">
                <p className="profile__label-text">Почта</p>
                <input 
                className="profile__input"
                type="text"
                required
                name="name"
                value="pochta@yandex.ru"
                />
            </label>
            <button className="profle-button" type="button">Редактировать</button>
            <Link className="profile__exit-link" to="/" target="_blank">Выйти из аккаунта</Link>
            </form>
        </section>
        </>        
    )
}

export default Profile;