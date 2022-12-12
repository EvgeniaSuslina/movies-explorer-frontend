import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
//import SavedMovies from '../SavedMovies/SavedMovies';
//import Profile from '../Profile/Profile';
//import Register from '../Register/Register';
//import Auth from '../Auth/Auth';


function App() {
  return (
    <>
    <Routes>
      <Route index path="/" element={<Main /> } />
      <Route path="/movies" element={ <Movies /> } />
      {/*<Route path="/signup" component={ Register } />
      <Route path="signin" component={ Auth } />
      <Route path="/movies" component={ Movies } />
      <Route path="/saved-movies" component={ SavedMovies } />
     <Route path="/profile" component={ Profile } />*/}   
    </Routes>
    </>
  )
}

export default App;
