import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMovie = async (key) => {
  //! buscar os filmes salvos
  const myMovies = await AsyncStorage.getItem(key);

  let moviesave = JSON.parse(myMovies) || [];

  return moviesave;
};

export const saveMovie = async (key, newMovie) => {
  //! salvar um filme novo

  let moviesStored = await getMovie(key);

  // se tiver algum filme salvo com o mesmo id ou duplicado precisamos ignorar
  const hasMovie = moviesStored.some((item) => item.id === newMovie.id); //! verifica se exite no meu array retornar Booleano

  if (hasMovie) {
    alert("Filme já existe na sua lista");
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));

  alert("Filme salvo com sucesso!");
};

export const deleteMovie = async (id) => {
  //! deletar um filme

  // const myMovies = await AsyncStorage.getItem("@filmesSalvos");
  const myMovies = await getMovie("@filmesSalvos");

  let moviesFilter = myMovies.filter((item) => {
    // vai me retornar todos os filmes exceto o que eu quero deletar
    return item.id !== id;
  });

  await AsyncStorage.setItem("@filmesSalvos", JSON.stringify(moviesFilter));
  alert("Filme deletado com Sucesso!");

  return moviesFilter;
};

export const hasMovie = async (movie) => {
  //! verifica se existe

  let moviesStored = await getMovie('@filmesSalvos');

  const hasMovies = moviesStored.find( item => item.id === movie.id); // se existir o id ele retorna true


  if (hasMovies) {
    return true;
  }

  return false;
};
