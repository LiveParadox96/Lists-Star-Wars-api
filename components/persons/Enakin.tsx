import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import NewPersons, { Iprops as NewPersonsProps } from "../NewPersons";

export default function Enakin() {
  const imageEnakin = require("./../../assets/Enakin.png");
  const [personData, setPersonData] = useState<NewPersonsProps | null>(null);

  const handlePersonData = (data: NewPersonsProps) => {
    setPersonData(data);
  };

  return (
    <View style={styles.container}>
      <Image source={imageEnakin} style={styles.photo} />
      <NewPersons onData={handlePersonData} />
      {personData && (
        <Text>
          Name: {personData.name}, Height: {personData.height}, Mass:{" "}
          {personData.mass}, Skin Color: {personData.skin_color}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
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
