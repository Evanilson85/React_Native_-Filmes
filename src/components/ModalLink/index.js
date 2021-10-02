import React from "react";
import { BackButton, Name } from "./style";
import { Feather } from "@expo/vector-icons";

import { WebView } from 'react-native-webview'
function ModalLink({ link, title, closeModal }) {
  return (
    <>
      <BackButton onPress={closeModal}>
        <Feather name="x" size={35} color="#ffff" />
        <Name>{title}</Name>
      </BackButton>
        <WebView 
            source={{ uri: link}}
        />
    </>
  );
}

export default ModalLink;
