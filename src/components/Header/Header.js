import './Header.css';
import logo from '../../images/logo.svg';
import { useLocation, Link, NavLink } from 'react-router-dom';
//import { Route, Routes, Link } from 'react-router-dom';

function Header(isLoggedIn) {

    const location = useLocation();

    return(
        <header className={(isLoggedIn && location.pathname === '/') ? 'header' : ' header header_type_black'}>
            <div className="header__content">
                {(location === '/') ? (
                    <img className="logo" src={logo} alt="Логотип" />                    
                ) : (
                    <Link to="/">
                        <img className="header__logo" src={logo} alt="Логотип" />
                    </Link>
                )}                
                <div className="header__navigation">
                    <NavLink to="/sign-up" className="header__register">Регистрация</NavLink>                    
                    <NavLink to="/sign-in" >
                        <button className="header__signin" type="button">Войти</button>
                    </NavLink>
                  
                    
                </div> 

            </div>
        </header>
    )
}


export default Header