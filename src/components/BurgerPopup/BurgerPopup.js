import { NavLink, Link } from "react-router-dom";
import './BurgerPopup.css';

function BurgerPopup({ isOpen, onButtonClick }) {

    return(
      <section className={`burger-popup ${isOpen && 'burger-popup_opened'}`}>
        <div className="burger-popup__content">
          <button
            className="burger-popup__close"
            type="button"
            onClick={ onButtonClick }
          />
          <ul className="burger-popup__links">
            <li>
              <NavLink
                to="/"
                target="_blank"
                className="burger-popup__link"
                onClick={ onButtonClick }>
                Главная
              </NavLink>
              </li>
              <li className="burger-popup__link_active">
              <NavLink
                to="/movies"
                target="_blank"
                className="burger-popup__link"
                onClick={ onButtonClick }>
                Фильмы
              </NavLink>
              </li>
              <li>
              <NavLink
                to="/saved-movies"
                target="_blank"
                className="burger-popup__link"
                onClick={ onButtonClick }>
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
          <div className="burger-popup__profile">
            <Link
              to="/profile"
              target="_blank"
              className="burger-popup__profile-link"
              onClick={ onButtonClick }>
                Аккаунт
            </Link>
          </div>
        </div>
      </section>
    );
  }

export default BurgerPopup;

