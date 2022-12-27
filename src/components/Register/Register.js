import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './Register.css';
import '../ErrorMessage/ErrorMessage.css'
import logo from '../../images/logo.svg';


function Register({onRegister, isLoading}) {

  const [data, setData] = useState({
    name: {
      value: "",
      isValid: false,
      errorMessage: ""
    },
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

const isValid = data.name.isValid && data.email.isValid && data.password.isValid;

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
  onRegister({
      name: data.name.value,
      email: data.email.value,
      password: data.password.value
  });
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
          minLength="2"
          maxLength="15"
          value={data.name.value || ""}
          onChange={handleChange}
        />
        <span className="auth__form-error">
          {data.name.errorMessage}
        </span>
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
          type="password"
          name="password"          
          minLength="4"
          maxLength="12"
          value={data.password.value || ""}
          onChange={handleChange}
          required          
        />
        <span className="auth__form-error">
          {data.password.errorMessage}
        </span>
        <button className={`${isValid && !isLoading ? "auth__submit" : "auth__submit_disabled"}`} type="submit" disabled={disabled}>
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