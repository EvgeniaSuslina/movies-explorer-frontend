import { useLocation, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

    const location = useLocation();

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__links">
                    <Link to="/" className="navigation__link-main">Главная</Link>
                </li>
                <li className="navigation__links">
                    <Link to="/movies" className="navigation__link-movies">Фильмы</Link>
                </li>
                <li className="navigation__links">
                    <Link to="/saved-movies" className="navigation__link-saved_movies">Сохраненные фильмы</Link>
                </li>
            </ul>
            <Link to="/profile" className="navigation__link-profile">Аккаунт</Link>
        </nav>
    )
}

export default Navigation;