import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';

function Login() {  
  return (
    <div className="auth">
    <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
      <h2 className="auth__title ">Рады видеть!</h2>      
      <form className="auth__form">
      <label className="auth__form-label">E-mail</label>
        <input
          className="auth__input"         
          type="email"
          name="email"
          required          
        />
        <label className="auth__form-label">Пароль</label>
        <input
          className="auth__input"          
          type="password"
          name="password"         
          required          
        />
        <button className="auth__submit" type="submit">
          Войти
        </button>
      </form>
      <div className="auth__wrapper">
        <p className="auth__text">
          Еще не зарегистрированы? 
          <Link className="auth__link" to="/signup">
            Регистрация
          </Link>
        </p>
      </div> 
    </div>
  );
}

export default Login;