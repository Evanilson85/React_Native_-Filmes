import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Descripiton
} from "./style";
import { ScrollView, Modal } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import Stars from "react-native-stars";

import Genres from "../../components/Genres";
import ModalLink from "../../components/ModalLink";

import { useNavigation, useRoute } from "@react-navigation/native";
import api, { key } from "../../services/api";

import { saveMovie, hasMovie } from "../../utils/storage";

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute(); //! paramentros pela rota

  const [favorites, setFavorito] = useState(false);
  const [movie, setMovie] = useState({});
  const [link, setLink] = useState(false);

  useEffect(() => {
    let isActive = true;

    const getMovie = async () => {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR"
          }
        })
        .catch((err) => console.log(err));

      if (isActive) {
        setMovie(response.data);

        const isFavorite = await hasMovie(response.data);

        setFavorito(isFavorite);
      }
    };

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  const handlefavoriteMovie = async (item) => {
    await saveMovie("@filmesSalvos", item);
  };

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </HeaderButton>

        <HeaderButton onPress={() => handlefavoriteMovie(movie)}>
          {favorites ? (
            <Ionicons name="bookmark" size={28} color="#fff" />
          ) : (
            <Ionicons name="bookmark-outline" size={28} color="#fff" />
          )}
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`
        }}
      />

      <ButtonLink onPress={() => setLink(true)}>
        <Feather name="link" size={24} color="#fff" />
      </ButtonLink>

      <Title numberOfLines={2}> {movie.title} </Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullSta={<Ionicons name="md-star" size={24} color="#E7A74e" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#E7A74e" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e" />}
          disable={true}
        />
        <Rate>5 / 10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showHorizontalScrollIndicator={false}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title> Descrição</Title>
        <Descripiton>{movie?.overview}</Descripiton>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={link}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setLink(false)}
        />
      </Modal>
    </Container>
  );
};

export default Detail;
