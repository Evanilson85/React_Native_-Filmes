import React from "react";
import { Container, BannerItem, Title, RaterContainer, Rate } from "./style";
import { Ionicons } from "@expo/vector-icons"

function SliderItem({ data, navigationPage }) {
  return (
    <Container activeOpacity={0.7} onPress={() => navigationPage(data)}>
      <BannerItem
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original${data.poster_path}`
        }}
      />

      <Title numberOfLines={1}> {data.title} </Title>

      <RaterContainer>
        <Ionicons name='md-star' size={12} color="#E7A74e" />
        <Rate> {data.vote_average} / 10 </Rate>
      </RaterContainer>
    </Container>
  );
}

export default SliderItem;
