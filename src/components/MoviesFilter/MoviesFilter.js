function MoviesFilter(movies, request, isChecked) {
    if(movies && request.lenght > 0) {
        return movies.filter((movie) => {
            if (isChecked) {
                return movie.nameRu.toLowerCase().includes(request.toLowerCase()) && movie.duration <= 40;
            } else {
                return  movie.nameRu.toLowerCase().includes(request.toLowerCase());
            }
        })
    } else if (request.lenght === 0) {
        return movies.filter((movie) => {
            if(isChecked) {
                return movie.duration <= 40;
            } else {
                return movie;
            }
        })
    }
}

export default MoviesFilter;