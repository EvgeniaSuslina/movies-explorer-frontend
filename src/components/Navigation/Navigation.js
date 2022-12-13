import { NavLink} from 'react-router-dom';
import './Navigation.css';
import '../Header/Header.css';

function Navigation({type}) {  

    const MainPageLinks = 
                <nav className="header__navigation">
                    <NavLink to="/signup" className="header__register">Регистрация</NavLink>                    
                    <NavLink to="/signin" >
                        <button className="header__signin" type="button">Войти</button>
                    </NavLink>
                </nav>

    const LoggedInLinks =          
                    <nav className="navigation__links">
                        <div className="navigation__links-movies">
                        <NavLink to="/movies" className="navigation__link navigation__active">Фильмы</NavLink>                    
                        <NavLink to="/saved-movies" className="navigation__link">Сохраненные фильмы</NavLink>
                        </div>                    
                        <NavLink to="/profile">
                            <button className="navigation__link-account" type="button">
                                <p className="navigation__account-text">Аккаунт</p>
                                </button>
                        </NavLink>
                    </nav>
                    
                        
               

    
    return (type === 'mainPage' && MainPageLinks) || (type ==='loggedInLinks' && LoggedInLinks)
}

export default Navigation;