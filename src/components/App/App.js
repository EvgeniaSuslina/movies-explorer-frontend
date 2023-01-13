import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';


import mainApi from "../../utils/MainApi";
import moviesApi from '../../utils/MoviesApi';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

  const [allMovies, setAllMovies] = useState(null); // загруженные фильмы при первом поиске
  const [filteredMovies, setFilteredMovies] = useState(null);; // отфильтрованные фильмы
  const [savedMovies, setSavedMovies] = useState(null); // сохраненные фильмы

  const [isErrorOnLogin, setIsErrorOnLogin] = useState(false);
  const [isErrorOnRegister, setIsErrorOnRegister] = useState(false);

  const [isUpdateProfileErr, setIsUpdateProfileErr] = useState(false);
  const [isUpdateProfileDone, setIsUpdateProfileDone] = useState(false);

  const navigate = useNavigate();
  
//check token
  useEffect(() => {
    checkToken();
}, []);


//update token if logged in
  useEffect(() => {
    if(!loggedIn) {
      return;
    }
    mainApi.updateToken();

    mainApi.getUserInfo()
    .then(setCurrentUser)
    .catch((err) => {
      handleErrorApi(err)
    });
  }, [loggedIn])


//api error
  function handleErrorApi(err) {
    setIsApiError(true);
    console.log('Запрос не выполнен: ', err);
  }

//register user
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
        .catch(() => {
          setIsErrorOnRegister(true);
        })
    })
    .catch(() => {
      setIsErrorOnRegister(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

//login user
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
    .catch(() => {
      setIsErrorOnLogin(true)
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

//check token function
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

  //getting all movies from movies api
  function getAllMovies() {
    setIsLoading(true);
    setIsApiError(false);

      moviesApi.getMovies()
      .then((res) => {
        if(res) {
          localStorage.setItem('allMovies', JSON.stringify(res));
          setAllMovies(res);
          getSavedMovies();
        }
      })
      .catch((err) => {
        handleErrorApi(err);
      })
      .finally(() =>{
        setIsLoading(false);
      })
  }

  //getting saved movies
  function getSavedMovies() {
    mainApi.updateToken()

    mainApi.getSavedMovies()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res));
        setSavedMovies(res);
      })
      .catch((err) => {
        handleErrorApi(err);
      })      
  }

  //save movie
  function handleMovieSave(country, director, duration, year, description, image, trailerLink, thumbnail,
    movieId, nameRU, nameEN){

      mainApi.saveMovie(country, director, duration, year, description, image, trailerLink, thumbnail,
        movieId, nameRU, nameEN)
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
          localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, res]));
        })
        .catch((err) => {
          handleErrorApi(err);
          //setIsSaveMoviePopupOpen(true); - попап сохранения фильмов
        })
  }

  //delete movies
  function handleMovieDelete(id){

    mainApi.deleteMovie(id)
    .then((res) => {
      setSavedMovies(savedMovies.filter((movie) => !(movie._id === res._id)));
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((movie) => !(movie._id === res._id))));
    })
    .catch((err) => {
      handleErrorApi(err);
      //setIsDeleteMoviePopupOpen(true); - попап удаления фильмов
    })
  }

  //update user info in profile
  function handleUpdateUserInfo(name, email) {
    setIsLoading(true);

    mainApi.updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setIsUpdateProfileErr(true)
        handleErrorApi(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdateProfileDone(true);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <Routes>
      <Route index path="/" element={< Main/> } />
      <Route path="/signup" element={ <Register
        onRegister={handleRegister}
        isErrorOnRegister={isErrorOnRegister}
        setIsErrorOnRegister={setIsErrorOnRegister}
        isLoading={isLoading}
         /> } />
      <Route path="/signin" element={ <Login 
      onLogin={handleLogin} 
      isErrorOnLogin={isErrorOnLogin}
      setIsErrorOnLogin={setIsErrorOnLogin}
      isLoading={isLoading}/> 
      } />
      <Route path="/movies" element={ <Movies
       onSearch={getAllMovies}
       isLoading={isLoading}
       isApiError={isApiError}
       allMovies={allMovies}
       onSaveMovie={handleMovieSave}
       onDeleteMovie={handleMovieDelete}
       setFilteredMovies={setFilteredMovies}
       filteredMovies={filteredMovies} 
       loggedIn={loggedIn}      
       />} />           
      <Route path="/saved-movies" element={ <SavedMovies 
      getSavedMovies={getSavedMovies}
      onDeleteMovie={handleMovieDelete}
      setSavedMovies={setSavedMovies}
      savedMoviesByUser={savedMovies}
      isLoading={isLoading}
      />  } />       
      <Route path="/profile" element={ <Profile 
      onUpdateUser={handleUpdateUserInfo}
      setCurrentUser={setCurrentUser}
      setLoggedIn={setLoggedIn}
      setAllMovies={setAllMovies}
      setSavedMovies={setSavedMovies}
      setFilteredMovies={setFilteredMovies}
      isUpdateProfileErr={isUpdateProfileErr}
      setIsUpdateProfileErr={setIsUpdateProfileErr}
      isUpdateProfileDone={isUpdateProfileDone}
      setIsUpdateProfileDone={setIsUpdateProfileDone}
      isLoading={isLoading}
      /> } />    
      <Route path="*" element={< NotFound/> } />
    </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App;
