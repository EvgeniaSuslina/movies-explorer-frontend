import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';

function Login({onLogin}) {  
 
  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    errorMessage: ''
  });

  const [password, setPassword] = useState({
    value: '',
    isValid: false,
    errorMessage: ''
  });

  const isValid = email.isValid && password.isValid;
  const [disabled, setDisabled] = useState(false);

  useEffect(() =>{
    isValid ? setDisabled(false) : setDisabled(true)
  }, [isValid]);

  function handleEmailChange(evt){
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt){
    setPassword(evt.target.value);
  }

  function handleSubmit(evt){
    evt.preventDefault();
    onLogin({
      email: email,
      password: password
    });
    setEmail({email: ''})
    setPassword({password: ''})
  }

  return (
    <div className="auth">
    <Link to='/' target="_blank"><img src={logo} alt="Логотип" className="logo" /></Link>
      <h2 className="auth__title ">Рады видеть!</h2>      
      <form className="auth__form" onSubmit={handleSubmit}>
      <label className="auth__form-label">E-mail</label>
        <input
          className="auth__input"         
          type="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
        <button className="auth__submit" type="submit" disabled={disabled}>
          Войти
        </button>
      </form>
      <div className="auth__wrapper">
        <p className="auth__text">
          Еще не зарегистрированы? 
          <Link className="auth__link" to="/signup" target="_blank">
            Регистрация
          </Link>
        </p>
      </div> 
    </div>
  );
}

export default Login;