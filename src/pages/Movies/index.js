import React, { useEffect, useState } from "react";
import { Container, ListMovies } from "./style";
import Header from "../../components/Header";

import Favoritos from "../../components/Favoritos";
import { getMovie, deleteMovie } from "../../utils/storage";

import { useNavigation, useIsFocused } from "@react-navigation/native";

function Movies() {
  const navigation = useNavigation();
  const useFocused = useIsFocused();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    const getFavorites = async () => {
      const result = await getMovie("@filmesSalvos");

      if (isActive) {
        setMovies(result);
      }
    };

    if (isActive) {
      getFavorites();
    }

    return () => {
      isActive = false;
    };
  }, [useFocused]);

  const hasDelete = async ({ id }) => {
    const result = await deleteMovie(id);
    setMovies(result);
  };

  const hasDetalhe = async ({ id }) => {
    navigation.navigate("Detail", { id });
  };

  return (
    <Container>
      <Header title="Meus Filmes" />

      <ListMovies
        data={movies}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item }) => (
          <Favoritos
            data={item}
            deleteMovie={hasDelete}
            navigatesMovie={() => hasDetalhe(item)}
          />
        )}
      />
    </Container>
  );
}

export default Movies;
