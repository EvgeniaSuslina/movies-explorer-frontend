import { Link } from "react-router-dom";
import Header from "../Header/Header";
import './Profile.css';


function Profile() {
    return(
        <>
        <Header />
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
            <button className="profle__button" type="button">Редактировать</button>
            <Link className="profile__exit-link" to="/">Выйти из аккаунта</Link>
            </form>
        </section>
        </>        
    )
}

export default Profile;