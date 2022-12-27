import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './Login.css';
import logo from '../../images/logo.svg';


function Login ({onLogin, isLoading}) {

  const [data, setData] = useState({
    email: {
        value: "",
        isValid: false,
        errorMessage: ""
    },
    password: {
        value: "",
        isValid: false,
        errorMessage: ""
    }
});

const [disabled, setDisabled] = useState(false);

const isValid = data.email.isValid && data.password.isValid;

useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
}, [isLoading]);

useEffect(() => {
    isValid ? setDisabled(false) : setDisabled(true);
}, [isValid]);

const handleChange = (evt) => {
    const { name, value, validity, validationMessage } = evt.target;

    setData((prevState) => ({
        ...prevState,
        [name]: {
            ...data[name],
            value,
            isValid: validity.valid,
            errorMessage: validationMessage
        }
    }));
}

const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({
        email: data.email.value,
        password: data.password.value
    });
    setData({email: '', password: ''});
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
          value={data.email.value || ""}
          onChange={handleChange}
          required
        />
        <span className="auth__form-error">
          {data.email.errorMessage}
        </span>
        <label className="auth__form-label">Пароль</label>
        <input
          className="auth__input"        
          type="text"
          name="password"         
          value={data.password.value || ""}
          onChange={handleChange}
          required   
        />
        <span className="auth__form-error">
          {data.password.errorMessage}
        </span>
        <button className={`${isValid && !isLoading ? "auth__submit" : "auth__submit_disabled"}`} type="submit" disabled={disabled}>
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