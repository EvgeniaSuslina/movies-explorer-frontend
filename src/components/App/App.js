import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Auth from '../Auth/Auth';


function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/signup" component={ Register } />
      <Route path="signin" component={ Auth } />
      <Route path="/movies" component={ Movies } />
      <Route path="/saved-movies" component={ SavedMovies } />
      <Route path="/profile" component={ Profile } />      
    </Switch>
    </div>
  );
}

export default App;
