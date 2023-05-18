import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import SwipeGesture from "react-native-swipe-gestures";
import Beru from "../persons/Beru";
import Biggs from "../persons/Biggs";
import BlueDroid from "../persons/blueDroid";
import Droid from "../persons/Droid";
import Enakin from "../persons/Enakin";
import Kenobi from "../persons/Kenobi";
import Leia from "../persons/Leia";
import Owen from "../persons/Owen";
import RedDroid from "../persons/RedDroid";
import Vader from "../persons/Vader";
import { AntDesign } from "@expo/vector-icons";

const ListsPersons = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    <Enakin key={0} />,
    <Droid key={1} />,
    <BlueDroid key={2} />,
    <Vader key={3} />,
    <Leia key={4} />,
    <Owen key={5} />,
    <Beru key={6} />,
    <RedDroid key={7} />,
    <Biggs key={8} />,
    <Kenobi key={9} />,
  ];

  const totalSlides = slides.length;

  const onSwipeLeft = () => {
    if (slideIndex < totalSlides - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const onSwipeRight = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  return (
    <SwipeGesture
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50,
      }}
      style={styles.swiper}
    >
      <View style={styles.content}>{slides[slideIndex]}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, slideIndex === 0 && styles.disabledButton]}
          onPress={onSwipeRight}
          disabled={slideIndex === 0}
        >
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            slideIndex === totalSlides - 1 && styles.disabledButton,
          ]}
          onPress={onSwipeLeft}
          disabled={slideIndex === totalSlides - 1}
        >
          <AntDesign name="right" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SwipeGesture>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 400,
  },
  disabledButton: {
    opacity: 0.3,
  },
});

export default ListsPersons;