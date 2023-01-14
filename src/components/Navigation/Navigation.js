import { NavLink} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Navigation.css';
import '../Header/Header.css';

function Navigation({type}) {  

    const location = useLocation();

    const MainPageLinks = 
                <nav className="header__navigation">
                    <NavLink to="/signup" target="_blank" className="header__register">Регистрация</NavLink>                    
                    <NavLink to="/signin" target="_blank" >
                        <button className="header__signin" type="button">Войти</button>
                    </NavLink>
                </nav>

    const LoggedInLinks =          
                    <nav className="navigation">                     
                        {(location.pathname === '/movies') ? (
                        <div className="navigation__links-movies">
                             <NavLink to="/movies" target="_blank" className="navigation__link navigation__link-active">Фильмы</NavLink>                    
                             <NavLink to="/saved-movies" target="_blank" className="navigation__link">Сохраненные фильмы</NavLink>
                        </div>  
                        ):(
                        <div className="navigation__links-movies">
                            <NavLink to="/movies" target="_blank" className="navigation__link ">Фильмы</NavLink>                    
                            <NavLink to="/saved-movies" target="_blank" className="navigation__link navigation__link-active">Сохраненные фильмы</NavLink>
                        </div>  
                        )}                       
                                         
                        <NavLink to="/profile" target="_blank">
                            <button className="navigation__link-account" type="button">
                                <p className="navigation__account-text">Аккаунт</p>
                                </button>
                        </NavLink>
                    </nav>

    return (type === 'mainPage' && MainPageLinks) || (type ==='loggedInLinks' && LoggedInLinks)
}

export default Navigation;