import React from "react";
import { StyleSheet, View, Image } from "react-native";
import NewPersons from "../NewPersons";

export default function Enakin() {
  const imageEnakin = require("./../../assets/Enakin.png");

  return (
    <View style={styles.container}>
      <Image source={imageEnakin} style={styles.photo} />
      <NewPersons />
    </View>
  );
}

const styles = StyleSheet.create({
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
