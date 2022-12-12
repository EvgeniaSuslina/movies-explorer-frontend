import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
import '../ErrorMessage/ErrorMessage.css'
import logo from '../../images/logo.svg';


function Register() {
  
  return (    
    <div className="reg">
      <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
      <h2 className="reg__title">Добро пожаловать!</h2>
      <form className="reg__form">
        <label className="reg__form-label">Имя</label>
        <input
          className="reg__input"          
          type="text"
          name="name"
          required   

        />
        <label className="reg__form-label">E-mail</label>
        <input
          className="reg__input"   
          type="email"
          name="email"          
          required
          
        />
        <label className="reg__form-label">Пароль</label>
        <input
          className="reg__input"        
          type="password"
          name="password"          
          maxLength="12"
          required
          
        />
        <span className="error-message">Что-то пошло не так...</span>
        <button className="reg__submit" type="submit">
        Зарегистрироваться
        </button>
      </form>
      <div className="reg__wrapper">
        <p className="reg__text">
          Уже зарегистрированы? 
          <Link className="reg__link" to="./sign-in">
            Войти
          </Link>
        </p>
      </div>      
    </div>
  );
}

export default Register;