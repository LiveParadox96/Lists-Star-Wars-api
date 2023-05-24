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

  if (filteredSlides[slideIndex]?.image == undefined || null) {
    return (
      <View style={styles.content}>
        <Text>Изображение отсутствует</Text>
      </View>
    );
  }

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
              style={[styles.image]}
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
      </SwipeGesture>
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
    paddingTop: 120,
    paddingBottom: 120,
  },
  image: {
    resizeMode: "cover",
    aspectRatio: 0.5,
    width: 180,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderColor: "black",
    top: 400,
    left: -20,
    right: -20,
    justifyContent: "space-between",
  },
  button: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 8,
    backgroundColor: "white",
    marginLeft: 2,
    marginRight: 2,
  },
  centeredTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  delete: {
    position: "absolute",
    top: 80,
    right: 10,
  },
});

export default ListsPersons;
