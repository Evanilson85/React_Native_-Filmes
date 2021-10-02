export const getListMovies = (size, movies) => { //! tamanho da lista

    let popularMovies = [];

    for(let i = 0; i < size; i++ ) {
        popularMovies.push(movies[i])
    }

    return popularMovies

}

export const randomBanner = (movie) => {
    return Math.floor(Math.random() * movie.length)
}  