import { BASEURL } from "../config";
import Api from "./Api";

class MainApi extends Api {
    constructor({baseUrl, headers}) {
        super({baseUrl});
        this._headers = headers;
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST', 
            headers: this._headers,
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        })
        .then(this._checkResult);
    }

    loginUser(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST', 
            headers: this._headers,
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        }) 
        .then(this._checkResult);
    }

    updateToken(){
        this._headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET', 
            headers: this._headers
        })
        .then(this._checkResult);
    }

    updateUserInfo(name, email) {
        return fetch (`${this._serverUrl}/users/me`, {
            method: 'PATCH', 
            headers: this._headers,
            body: JSON.stringify({
                "name": name,
                "email": email
            })
        })
        .then(this._checkResult);
    }

    saveMovie(country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRu, nameEn) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST', 
            headers: this._headers,
            body: JSON.stringify({
                "country": country,
                "director": director, 
                "duration": duration,
                "year" : year,
                "description": description, 
                "image" : image, 
                "trailerLink" : trailerLink, 
                "thumbnail" : thumbnail, 
                "movieId" : movieId, 
                "nameRu" : nameRu, 
                "nameEn" : nameEn
            })
        })
        .then(this._checkResult);
    }

    getSavedMovies(){
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET', 
            headers: this._headers,
        })
        .then(this._checkResult);
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResult);
    }

    logoutUser(){
        return fetch(`${this._baseUrl}/signout`, {
            method: 'GET', 
            headers: this._headers
        })
        .then(this._checkResult);
    }

}


const mainApi = new MainApi({
    baseUrl: BASEURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

  
export default mainApi;
