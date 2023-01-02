import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import mainApi from "../../utils/MainApi";
//import MoviesApi from '../../utils/MoviesApi';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
}, []);

mainApi.updateToken()

  function handleRegister(name, email, password){
    setIsLoading(true);
    mainApi.register(name, email, password)
    .then((res) => {
      setCurrentUser(res);

      mainApi.loginUser(email, password)
        .then ((res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            setLoggedIn(true);
            navigate('/movies');
          }
        })
        .catch((err) => {
          console.log(`Произошла ошибка ${err}`)
        })
    })
    .catch((err) => {
      console.log(`Произошла ошибка ${err}`)
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleLogin(email, password){
    setIsLoading(true);

    mainApi.loginUser(email, password)
    .then ((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        navigate('/movies');
      }
    })
    .catch((err) => {
      console.log(`Произошла ошибка ${err}`)
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function checkToken(){
    if (localStorage.getItem('token')) {
      mainApi.updateToken();

      mainApi.getUserInfo()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`)
      });
    }
  }

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <Routes>
      <Route index path="/" element={< Main/> } />
      <Route path="/signup" element={ <Register  onRegister={handleRegister}/> } />
      <Route path="/signin" element={ <Login onLogin={handleLogin}/> } />
      <Route path="/movies" element={ <Movies /> } />      
      <Route path="/saved-movies" element={ <SavedMovies /> } />       
      <Route path="/profile" element={ <Profile setCurrentUser={setCurrentUser}/> } />
      <Route path="*" element={< NotFound/> } />
    </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App;
