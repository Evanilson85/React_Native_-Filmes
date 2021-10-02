import React from "react";
import {
  Container,
  Title,
  RaterContainer,
  Rate,
  ActionContainer,
  DetailButton,
  DeleteButton
} from "./style";

import { Ionicons, Feather } from "@expo/vector-icons";


function Favoritos({ data,  navigatesMovie, deleteMovie }) {
  return (
    <Container>
      <Title size={24}>{data.title}</Title>

      <RaterContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{data.vote_average} / 10</Rate>
      </RaterContainer>

      <ActionContainer>
        <DetailButton onPress={() => navigatesMovie(data)}>
          <Title size={14}>Ver Detalhes</Title>
        </DetailButton>

        <DeleteButton onPress={() => deleteMovie(data)}>
          <Feather name="trash" size={24} color="#fff" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}

export default Favoritos;
