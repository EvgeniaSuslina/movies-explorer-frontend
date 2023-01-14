function MoviesFilter(movies, request, isCheckboxChecked) {
    if(movies && request.lenght > 0) {
        return movies.filter((movie) => {
            if (isCheckboxChecked) {
                return movie.nameRu.toLowerCase().includes(request.toLowerCase()) && movie.duration <= 40;
            } else {
                return movie.nameRu.toLowerCase().includes(request.toLowerCase());
            }
        })
    } else if (request.lenght === 0) {
        return movies.filter((movie) => {
            if(isCheckboxChecked) {
                return movie.duration <= 40;
            } else {
                return movie;
            }
        })
    }
}

export default MoviesFilter;