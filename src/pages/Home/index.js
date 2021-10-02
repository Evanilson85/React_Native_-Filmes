import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { ScrollView, ActivityIndicator } from "react-native";
import SliderItem from "../../components/SliderItem";

import { useNavigation } from "@react-navigation/native";

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannnerButton,
  Banner,
  SliderMovie
} from "./style";

import { Feather } from "@expo/vector-icons";
import api, { key } from "../../services/api";
import { getListMovies, randomBanner } from "../../utils/movies";

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [banner, setBanner] = useState({});
  const [load, setLoad] = useState(true);

  const navegation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();
    const getMovies = async () => {
      // const response = await api.get('/movie/now_playing',{
      //     params: {
      //         api_key: key,
      //         language: 'pt-BR',
      //         page: 1
      //     }
      // })

      const [nowData, popularData, topData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1
          }
        }),

        api.get("/movie/popular", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1
          }
        }),

        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1
          }
        })
      ]);

      if (isActive) {
        const nowList = getListMovies(20, nowData.data.results);
        const popularMovies = getListMovies(10, popularData.data.results);
        const topMovies = getListMovies(12, topData.data.results);

        setBanner(nowData.data.results[randomBanner(nowData.data.results)]);

        setNowMovies(nowList);
        setPopularMovies(popularMovies);
        setTopMovies(topMovies);
        setLoad(false);
      }
    };

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  if (load) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  const handlerInput = () => {
    if (inputValue === "") return;
    navegation.navigate("Search", { name: inputValue });

    setInputValue("");
  };

  const navigationDetailsPage = ({ id }) => {
    navegation.navigate("Detail", { id: id });
  };

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input
          placeholder="Ex Vingadores"
          placeholderTextColor="#ddd"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />

        <SearchButton onPress={handlerInput}>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannnerButton
          activeOpacity={0.9}
          onPress={() => navigationDetailsPage(banner)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original${banner.poster_path}`
            }}
          />
        </BannnerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigationPage={() => {
                navigationDetailsPage(item);
              }}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigationPage={() => {
                navigationDetailsPage(item);
              }}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigationPage={() => {
                navigationDetailsPage(item);
              }}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
