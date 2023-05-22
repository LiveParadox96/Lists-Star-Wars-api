import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Image,
} from "react-native";
import SwipeGesture from "react-native-swipe-gestures";
import { AntDesign } from "@expo/vector-icons";
import NewPersons from "../NewPersons";

interface Idata {
  id: string;
  name: string;
  height: string;
  mass: string;
  skin_color: string;
  image: string;
  homeworld: string;
  key: string;
}

const ListsPersons = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const swipeAnimation = useRef(new Animated.ValueXY()).current;
  const [deletedSlides, setDeletedSlides] = useState<string[]>([]);
  const [slides, setSlides] = useState<Idata[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Idata[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const resolve = await fetch(
        "https://akabab.github.io/starwars-api/api/all.json"
      );
      const result = await resolve.json();
      console.log(result);
      setData(result);
      setIsLoaded(true);

      const slides: Idata[] = result.map((persons: Idata) => {
        return {
          ...persons,
          key: persons.id,
        };
      });

      setSlides(slides);
    };

    fetchData();
  }, []);

  const filteredSlides = slides.filter(
    (slide) => !deletedSlides.includes(slide?.key as string)
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
        setDeletedSlides(updatedDeletedSlides);

        const remainingSlides = filteredSlides.filter(
          (slide) => slide.key !== deletedSlideKey
        );

        let nextSlideIndex = slideIndex;

        if (slideIndex === totalSlides - 1) {
          nextSlideIndex = 0;
        } else if (deletedSlideKey === filteredSlides[totalSlides - 1]?.key) {
          nextSlideIndex = slideIndex;
        }

        setSlideIndex(nextSlideIndex);
        setSlides(remainingSlides);
        swipeAnimation.setValue({ x: 0, y: 0 });
      }
    });
  };

  if (!isLoaded) {
    return (
      <View style={styles.centeredTextContainer}>
        <Text style={styles.centeredText}>Loading...</Text>
      </View>
    );
  }

  if (totalSlides === 0) {
    return (
      <View style={styles.centeredTextContainer}>
        <Text style={styles.centeredText}>No slides to display.</Text>
      </View>
    );
  }
  console.log(filteredSlides[slideIndex]?.image);

  return (
    <View style={styles.content}>
      <SwipeGesture
        style={styles.swiper}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeDown={onSwipeDown}
        config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
      >
        <View style={styles.slideContainer}>
          <Animated.View
            style={[
              styles.slide,
              {
                transform: [{ translateX: swipeAnimation.x }],
              },
            ]}
          >
            <Image
              source={{ uri: filteredSlides[slideIndex]?.image }}
              style={[styles.image, { resizeMode: "cover" }]}
              onError={() => {
                return (
                  <View style={styles.image}>
                    <Text>Изображение отсутствует</Text>
                  </View>
                );
              }}
            />
            <NewPersons
              image={filteredSlides[slideIndex]?.image}
              name={filteredSlides[slideIndex]?.name}
              height={filteredSlides[slideIndex]?.height}
              mass={filteredSlides[slideIndex]?.mass}
              homeworld={filteredSlides[slideIndex]?.homeworld}
            />
          </Animated.View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                opacity: slideIndex === 0 ? 0.3 : 1,
              },
            ]}
            disabled={slideIndex === 0}
            onPress={onSwipeRight}
          >
            <AntDesign name="arrowleft" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                opacity: slideIndex === totalSlides - 1 ? 0.3 : 1,
              },
            ]}
            disabled={slideIndex === totalSlides - 1}
            onPress={onSwipeLeft}
          >
            <AntDesign name="arrowright" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </SwipeGesture>
      <View style={styles.arrowdown}>
        <AntDesign name="arrowdown" size={32} color="black" />
      </View>
      <View style={styles.delete}>
        <TouchableOpacity onPress={onSwipeDown}>
          <AntDesign name="delete" size={32} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#978195",
    width: "100%",
  },
  image: {
    resizeMode: "cover",
    aspectRatio: 0.5,
    width: 190,
    height: 220,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 5,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
  },
  emptySlide: {
    width: 300,
    height: 300,
    backgroundColor: "gray",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 390,
    maxWidth: 600,
    left: -57, // Измените значение left на -10
    right: -500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 13,
  },
  button: {
    maxWidth: 400,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
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
    fontSize: 16,
  },
  arrowdown: {
    position: "absolute",
    height: 50,
    bottom: 50,
    alignSelf: "center",
  },
  delete: {
    position: "absolute",
    bottom: 10,
  },
});

export default ListsPersons;
