import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
//import App from './components/App/App';
//import Header from './components/Header/Header';
//import Promo from './components/Promo/Promo';
//import NavTab from './components/NavTab/NavTab';
//import AboutProject from './components/AboutProject/AboutProject';
//import Techs from './components/Techs/Techs';
//import AboutMe from './components/AboutMe/AboutMe';
//import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import SearchForm from './components/SearchForm/SearchForm';
//import MoviesCard from './components/MoviesCard/MoviesCard';
import MoviesCardList from './components/MoviesCardList/MoviesCardList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter> 
        <SearchForm />         
        <MoviesCardList />   
        <Footer />
        {/*<Header />
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />*/} 
      </BrowserRouter>
  </React.StrictMode>
);
