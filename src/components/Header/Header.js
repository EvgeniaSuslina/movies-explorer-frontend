import './Header.css';
import logo from '../../images/logo.svg';
//import { Route, Routes, Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <div className="header__content">
                <img className="header__logo" src={logo} alt="Логотип"></img>
                
                <div className="header__auth">
                    <p className="header__register">Регистрация</p>
                    <button className="header__signin">Войти</button>
                </div>
            </div>
        </header>
    )
}

export default Header