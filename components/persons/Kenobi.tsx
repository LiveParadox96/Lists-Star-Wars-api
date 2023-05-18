import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import NewPersons from "./../NewPersons";

interface Idata {
  name: string;
  height: string;
  mass: string;
  skin_color: string;
}

export default function Kenobi() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Idata | null>(null);
  const imageEnakin = require("./../../assets/Obi.png");

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/people/10")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setIsLoaded(true);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!isLoaded) {
    return <Text style={styles.loaded}>...Загрузка</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={imageEnakin} style={styles.photo} />
      <NewPersons
        name={data?.name || ""}
        height={data?.height || ""}
        mass={data?.mass || ""}
        skin_color={data?.skin_color || ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaded: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: 300,
    left: 0,
    width: 200,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    height: 180,
    width: 130,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});