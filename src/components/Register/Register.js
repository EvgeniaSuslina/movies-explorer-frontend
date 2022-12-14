import React, {useState} from "react";
import { Link } from "react-router-dom";
import './Register.css';
import '../ErrorMessage/ErrorMessage.css'
import logo from '../../images/logo.svg';


function Register({onRegister}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(evt){
    setName(evt.target.value);
  }

  function handleEmailChange(evt){
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt){
    setPassword(evt.target.value);
  }
  
  function handleSubmit(evt){
    evt.preventDefault();

    onRegister(name, email, password);    
  }

  
  return (    
    <div className="auth">
      <Link to='/' target="_blank"><img src={logo} alt="Логотип" className="logo auth__logo"/></Link>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__form-label">Имя</label>
        <input
          className="auth__input"          
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}

        />
        <label className="auth__form-label">E-mail</label>
        <input
          className="auth__input"   
          type="email"
          name="email"          
          required
          value={email}
          onChange={handleEmailChange}
          
        />
        <label className="auth__form-label">Пароль</label>
        <input
          className="auth__input"        
          type="password"
          name="password"          
          minLength="4"
          maxLength="12"
          required
          value={password}
          onChange={handlePasswordChange}
          
        />
        <span className="error-message">Что-то пошло не так...</span>
        <button className="auth__submit" type="submit">
        Зарегистрироваться
        </button>
      </form>
      <div className="auth__wrapper">
        <p className="auth__text">
          Уже зарегистрированы? 
          <Link className="auth__link" to="/signin" target="_blank">
            Войти
          </Link>
        </p>
      </div>      
    </div>
  );
}

export default Register;