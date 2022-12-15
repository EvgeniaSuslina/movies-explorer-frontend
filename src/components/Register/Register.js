import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
import '../ErrorMessage/ErrorMessage.css'
import logo from '../../images/logo.svg';


function Register() {
  
  return (    
    <div className="auth">
      <Link to='/'><img src={logo} alt="Логотип" className="logo auth__logo"/></Link>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form">
        <label className="auth__form-label">Имя</label>
        <input
          className="auth__input"          
          type="text"
          name="name"
          required   

        />
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
          maxLength="12"
          required
          
        />
        <span className="error-message">Что-то пошло не так...</span>
        <button className="auth__submit" type="submit">
        Зарегистрироваться
        </button>
      </form>
      <div className="auth__wrapper">
        <p className="auth__text">
          Уже зарегистрированы? 
          <Link className="auth__link" to="/signin">
            Войти
          </Link>
        </p>
      </div>      
    </div>
  );
}

export default Register;