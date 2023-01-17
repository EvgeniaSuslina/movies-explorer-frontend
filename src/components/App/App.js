import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from '../../utils/ProtectedRoute';
import RouteToMovies from '../../utils/RouteToMovies';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoToolip/InfoTooltip';
import imageError from '../../images/image_error.svg';
import imageSuccess from '../../images/image_success.png';
import { URL_REGEX, SHORT_MOVIE_DURATION } from '../../utils/config'

import mainApi from "../../utils/MainApi";
import moviesApi from '../../utils/MoviesApi';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isApiError, setIsApiError] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]); 
  const [savedMovies, setSavedMovies] = useState([]); 
  const [savedMoviesList, setSavedMoviesList] = useState([]); 
  const [isPreloader, setIsPreloader] = useState(false);

  const [isErrorOnLogin, setIsErrorOnLogin] = useState(false);
  const [isErrorOnRegister, setIsErrorOnRegister] = useState(false);

  const [isUpdateProfileErr, setIsUpdateProfileErr] = useState(false);
  const [isUpdateProfileDone, setIsUpdateProfileDone] = useState(false);

  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [message, setMessage] = useState('');

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


useEffect(() => {
    if (JSON.parse(localStorage.getItem("loadedMovies"))) {
        if (localStorage.getItem("loadedMovies")) {
            setAllMovies(JSON.parse(localStorage.getItem("loadedMovies")));
        }
    }
}, [])


useEffect(() => {
    if (localStorage.getItem("searchedMovies") && localStorage.getItem("checkboxStat")) {
        const checkboxStat = JSON.parse(localStorage.getItem("checkboxStat"));
        handleCheckboxMovies(checkboxStat);
    }
  }, []);

 

  useEffect(() => {
    if (loggedIn && currentUser) {
        getSavedMovies();
    }
}, [loggedIn, currentUser]);



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
            setInfoTooltipOpen(true);
            setInfoTooltipImage(imageSuccess);
            setMessage('Регистрация прошла успешно');
            navigate('/movies');
          }
        })
        .catch(() => {
          setIsErrorOnRegister(true);
          setInfoTooltipImage(imageError);
          setMessage('Что-то пошло не так! Попробуйте ещё раз.');
          setInfoTooltipOpen(true);
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
        setInfoTooltipOpen(true);
        setInfoTooltipImage(imageSuccess);
        setMessage('Авторизация прошла успешно');
        navigate('/movies');

      }
    })
    .catch(() => {
      setIsErrorOnLogin(true);
      setInfoTooltipImage(imageError);
      setMessage('Что-то пошло не так! Попробуйте ещё раз.');
      setInfoTooltipOpen(true);
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
  function handleMovieSearch(movie, checked) {
    if(allMovies.length !== 0) {
      const searchMovies = allMovies.filter((item) => 
      item.nameRU.toLowerCase().includes(movie.toLowerCase()));

      if (searchMovies.length === 0) {

        setInfoTooltipImage(imageError);
        setMessage('Увы, фильмы не найдены');
        setInfoTooltipOpen(true);

      } else {

        localStorage.setItem("searchWord", movie);
        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
        localStorage.setItem("checkboxStat", JSON.stringify(checked));

        setFoundMovies(searchMovies);
      }
    } else {
      setIsPreloader(true);

      moviesApi.getMovies()
      .then((requestMovies) => {
        requestMovies = requestMovies.map((item) => {
          if(!URL_REGEX.test(item.trailerLink)) {
            item.trailerLink = 'https://www.youtube.com';
          }
          return item;
        });

        const searchMovies = requestMovies.filter((item) => 
        item.nameRU.toLowerCase().includes(movie.toLowerCase()));

        if (searchMovies.length === 0) {

          setInfoTooltipImage(imageError);
          setMessage('Увы, фильмы не найдены');
          setInfoTooltipOpen(true);

        } else {

          localStorage.setItem("loadedMovies", JSON.stringify(requestMovies));
          setAllMovies(requestMovies);
          localStorage.setItem("searchWord", movie);
          localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
          localStorage.setItem("checkboxStat", JSON.stringify(checked));
          setFoundMovies(searchMovies);
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => setIsPreloader(false));
    }
  }

  //searching short films
  function handleCheckboxMovies(checkbox) {
    let shortMovies;

    let movies = JSON.parse(localStorage.getItem("searchedMovies"));

    if(checkbox) {
      shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE_DURATION );
    } else if (!checkbox) {
      shortMovies = movies;
      setFoundMovies(shortMovies);
      localStorage.setItem("checkboxStat", JSON.stringify(checkbox));
    }
  }

  //getting saved movies
  function getSavedMovies() {
    mainApi.updateToken()

    mainApi.getSavedMovies()
      .then((res) => {
        const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(savedMovies);
        setSavedMoviesList(savedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
    });     
  }

  //save movie
  function handleMovieSave(movie, res){
    const isSaved = savedMovies.find((item) => item.movieId === movie.id);

    if(!isSaved){
      mainApi.saveMovie(movie)
      setSavedMovies(savedMovies.concat(res));
      setSavedMoviesList(savedMoviesList.concat(res));
      localStorage.setItem(savedMoviesList.concat(res));
    } else {}
      mainApi.saveMovie(movie)
        .then((res) => {
          setSavedMovies(savedMovies.concat(res));
          setSavedMoviesList(savedMoviesList.concat(res));
          localStorage.setItem(savedMoviesList.concat(res));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
  }

  //delete movies
  function handleMovieDelete(movie){

    mainApi.deleteMovie(movie._id)
    .then(() => {
      const updatedMovies = savedMovies.filter((item) => item._id !== movie._id);

      setSavedMovies(updatedMovies);
      setSavedMoviesList(savedMoviesList.filter((item) => item._id !== movie._id));
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
  }

  //update user info in profile
  function handleUpdateUserInfo(name, email) {
    setIsLoading(true);

    mainApi.updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setInfoTooltipOpen(true);
        setMessage('Данные изменены успешно');
        setInfoTooltipImage(imageSuccess);
      })
      .catch((err) => {
        setIsUpdateProfileErr(true)
        handleErrorApi(err);
        setInfoTooltipOpen(true);       
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipImage(imageError);

      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdateProfileDone(true);
      })
  }


  function closeAllPopups() {
    setInfoTooltipOpen(false);
  }


  //searching movies in saved-movies
  function handleSearchSavedMovie(req, checkbox){
    setIsPreloader(true);
    const searchMovies = savedMovies.filter((item) =>
    item.nameRU.toLowerCase().includes(req.toLowerCase()));


    if (searchMovies.length === 0) {
      setInfoTooltipImage(imageError);
      setMessage('Увы, фильмы не найдены');
      setInfoTooltipOpen(true);
      setIsPreloader(false);
    } else {
        setSavedMovies(searchMovies);
        setIsPreloader(false);
        localStorage.setItem("checkboxStat", JSON.stringify(checkbox));
    }
  }

  function handleCheckboxSavedMovies(checkbox) {
    if(checkbox) {
      setSavedMovies(savedMovies.filter((item) => item.duration <= SHORT_MOVIE_DURATION));
    } else if (!checkbox) {
      setSavedMovies(savedMoviesList);
      localStorage.setItem("checkboxStat", JSON.stringify(checkbox));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <Routes>
      <Route index path="/" element={< Main loggedIn={loggedIn}/> } />     
        <Route path="/signup" element={ 
        <RouteToMovies> 
          <Register
            onRegister={handleRegister}
            isErrorOnRegister={isErrorOnRegister}
            setIsErrorOnRegister={setIsErrorOnRegister}
            isLoading={isLoading}
            />
       </RouteToMovies>
            } />
   
      <Route path="/signin" element={ 
        <RouteToMovies>      
            <Login 
            onLogin={handleLogin} 
            isErrorOnLogin={isErrorOnLogin}
            setIsErrorOnLogin={setIsErrorOnLogin}
            isLoading={isLoading}/> 
        </RouteToMovies>
        } />     
      
      <Route path="/movies" element={ 
        <ProtectedRoute>
          <Movies
          isApiError={isApiError}
          onSearch={handleMovieSearch}
          foundMovies={foundMovies}       
          onSaveMovie={handleMovieSave}
          onDeleteMovie={handleMovieDelete}
          savedMovies={savedMovies}
          onSubmitCheckbox={handleCheckboxMovies}
          preloaderStatus={isPreloader}  
          />
          </ProtectedRoute>
      } />    

      <Route path="/saved-movies" element={    
        <ProtectedRoute>
          <SavedMovies 
          onSearch={handleSearchSavedMovie}
          onSaveMovie={handleMovieSave}
          onDeleteMovie={handleMovieDelete}
          savedMovies={savedMovies}
          onSubmitCheckbox={handleCheckboxSavedMovies}
          preloaderStatus={isPreloader}
          /> 
      </ProtectedRoute>
    } />      

      <Route path="/profile" element={  
        <ProtectedRoute>   
          <Profile 
          onUpdateUser={handleUpdateUserInfo}
          setCurrentUser={setCurrentUser}
          setLoggedIn={setLoggedIn}
          setAllMovies={setAllMovies}
          setSavedMovies={setSavedMovies}
          isUpdateProfileErr={isUpdateProfileErr}
          setIsUpdateProfileErr={setIsUpdateProfileErr}
          isUpdateProfileDone={isUpdateProfileDone}
          setIsUpdateProfileDone={setIsUpdateProfileDone}
          isLoading={isLoading}
          />      
        </ProtectedRoute>
      } />    
    
      <Route path="*" element={< NotFound/> } />
    </Routes>

        <InfoTooltip
        isOpen={infoTooltipOpen}
        onClose={closeAllPopups}
        image={infoTooltipImage}
        message={message}
        />
    </CurrentUserContext.Provider>
  )
}

export default App;
