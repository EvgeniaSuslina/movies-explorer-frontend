import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';


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
      <Route path="/signup" element={ <Register  onRegister={handleRegister} isLoading={isLoading}/> } />
      <Route path="/signin" element={ <Login onLogin={handleLogin} isLoading={isLoading}/> } />
      <Route path="/movies" element={ <Movies />} />
      <Route path="/movies" 
      element={ 
      <ProtectedRoute isLogged={loggedIn}>
        <Movies />
      </ProtectedRoute>
       } />      
      <Route path="/saved-movies" 
      element={ 
      <ProtectedRoute isLogged={loggedIn}>
      <SavedMovies /> 
      </ProtectedRoute>
      } />       
      <Route path="/profile" 
      element={ 
      <ProtectedRoute isLogged={loggedIn}>
      <Profile setCurrentUser={setCurrentUser}/>
      </ProtectedRoute>
      } />
      <Route path="*" element={< NotFound/> } />
    </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App;
