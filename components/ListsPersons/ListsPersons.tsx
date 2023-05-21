import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import SwipeGesture from "react-native-swipe-gestures";
import { AntDesign } from "@expo/vector-icons";
import Beru from "../persons/Beru";
import Biggs from "../persons/Biggs";
import BlueDroid from "../persons/blueDroid";
import Droid from "../persons/Droid";
import Enakin from "../persons/Anakin";
import Kenobi from "../persons/Kenobi";
import Leia from "../persons/Leia";
import Owen from "../persons/Owen";
import RedDroid from "../persons/RedDroid";
import Vader from "../persons/Vader";

const ListsPersons = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const swipeAnimation = useRef(new Animated.ValueXY()).current;
  const [deletedSlides, setDeletedSlides] = useState([]);

  const slides = [
    { key: "enakin", component: <Enakin /> },
    { key: "droid", component: <Droid /> },
    { key: "blueDroid", component: <BlueDroid /> },
    { key: "vader", component: <Vader /> },
    { key: "leia", component: <Leia /> },
    { key: "owen", component: <Owen /> },
    { key: "beru", component: <Beru /> },
    { key: "redDroid", component: <RedDroid /> },
    { key: "biggs", component: <Biggs /> },
    { key: "kenobi", component: <Kenobi /> },
  ];

  const filteredSlides = slides.filter(
    (slide) => !deletedSlides.includes(slide.key as never)
  );

  const totalSlides = filteredSlides.length;
  const width = 300;
  const height = 300;

  const onSwipeLeft = () => {
    if (slideIndex < totalSlides - 1) {
      Animated.timing(swipeAnimation, {
        toValue: { x: -width, y: 0 },
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setSlideIndex(slideIndex + 1);
        swipeAnimation.setValue({ x: 0, y: 0 });
      });
    }
  };

  const onSwipeRight = () => {
    if (slideIndex > 0) {
      Animated.timing(swipeAnimation, {
        toValue: { x: width, y: 0 },
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setSlideIndex(slideIndex - 1);
        swipeAnimation.setValue({ x: 0, y: 0 });
      });
    }
  };

  const onSwipeDown = () => {
    Animated.timing(swipeAnimation, {
      toValue: { x: 0, y: height },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const deletedSlideKey = filteredSlides[slideIndex]?.key;
      if (deletedSlideKey) {
        const updatedDeletedSlides = [...deletedSlides, deletedSlideKey];
        setDeletedSlides(updatedDeletedSlides as never);

        const remainingSlides = filteredSlides.filter(
          (slide) => slide.key !== deletedSlideKey
        );

        let nextSlideIndex = slideIndex;

        if (slideIndex === totalSlides - 1) {
          nextSlideIndex = 0;
        } else if (deletedSlideKey === filteredSlides[totalSlides - 1]?.key) {
          nextSlideIndex = slideIndex;
        } else {
          nextSlideIndex = slideIndex + 1;
        }

        setSlideIndex(nextSlideIndex);
      }

      swipeAnimation.setValue({ x: 0, y: 0 });
    });
  };

  useEffect(() => {
    const initialSlideIndex = filteredSlides.findIndex(
      (slide) => slide.key === "enakin"
    );
    if (initialSlideIndex !== -1) {
      setSlideIndex(initialSlideIndex);
    }
  }, []);

  if (totalSlides === 0) {
    return (
      <View style={styles.centeredTextContainer}>
        <Text style={styles.centeredText}>Ни осталось ни одного персонажа</Text>
      </View>
    );
  }

  let previousSlideIndex = slideIndex - 1;
  let prevSlide = null;
  while (previousSlideIndex >= 0) {
    if (
      !deletedSlides.includes(filteredSlides[previousSlideIndex].key as never)
    ) {
      prevSlide = filteredSlides[previousSlideIndex].component;
      break;
    }
    previousSlideIndex--;
  }

  const previousSlide = prevSlide;

  return (
    <SwipeGesture
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      onSwipeDown={onSwipeDown}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 50,
      }}
      style={styles.swiper}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.slide,
            {
              transform: swipeAnimation.getTranslateTransform(),
            },
          ]}
        >
          {deletedSlides.includes(filteredSlides[slideIndex]?.key as never)
            ? previousSlide
            : filteredSlides[slideIndex]?.component}
        </Animated.View>
      </View>
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
      <View>
        <AntDesign
          name="arrowdown"
          size={100}
          color="gray"
          style={styles.arrowdown}
        />
      </View>
      <View>
        <AntDesign name="delete" size={30} color="red" style={styles.delete} />
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
  slide: {
    flex: 1,
  },
  emptySlide: {
    width: 300,
    height: 300,
    backgroundColor: "gray",
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
  centeredTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  arrowdown: {
    position: "absolute",
    bottom: 110,
    alignSelf: "center",
  },
  delete: {
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 40,
  },
});

export default ListsPersons;
