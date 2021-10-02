import React, { useEffect, useState } from "react";
import { Container, Name, ListMovies } from "./styles";

import { useNavigation, useRoute } from "@react-navigation/native";
import api, { key } from "../../services/api";
import SearchItem from "../../components/SearchItem";

function Search() {
  const navigation = useNavigation();
  const router = useRoute();

  const [movie, setMovie] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let isActive = true;

    const getSearch = async () => {
      const response = await api.get("/search/movie", {
        params: {
          query: router.params?.name,
          api_key: key,
          language: "pt-BR",
          page: 1
        }
      });

      if (isActive) {
        setMovie(response.data.results);
        setLoad(false);
      }
    };

    if (isActive) {
      getSearch();
    }

    return () => {
      isActive = false;
    };
  }, []);

  const navigationDetailsPage = ({ id }) => {
    navigation.navigate("Detail", { id: id });
  };

  if (load) {
    return <Container></Container>;
  }

  return (
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item }) => (
          <SearchItem
            data={item}
            navigatePage={() => {
              navigationDetailsPage(item);
            }}
          />
        )}
      />
    </Container>
  );
}

export default Search;
