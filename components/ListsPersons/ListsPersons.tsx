import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";
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
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const swipeAnimation = useRef(new Animated.ValueXY()).current;
  const [deletedSlides, setDeletedSlides] = useState<number[]>([]);

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
      const updatedDeletedSlides: number[] = [...deletedSlides, slideIndex];
      setDeletedSlides(updatedDeletedSlides);
      let nextSlideIndex: number = slideIndex;
      while (updatedDeletedSlides.includes(nextSlideIndex)) {
        nextSlideIndex = (nextSlideIndex + 1) % totalSlides;
        if (updatedDeletedSlides.length === totalSlides) {
          nextSlideIndex = 0;
          setDeletedSlides([]);
          break;
        }
      }
      setSlideIndex(nextSlideIndex);
      swipeAnimation.setValue({ x: 0, y: 0 });
    });
  };

  const isSlideDeleted = deletedSlides.includes(slideIndex);

  if (isSlideDeleted) {
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
          <View style={styles.emptySlide} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled={true}>
            <AntDesign name="left" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSwipeLeft} disabled={false}>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </SwipeGesture>
    );
  }

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
          {slides[slideIndex]}
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
});

export default ListsPersons;