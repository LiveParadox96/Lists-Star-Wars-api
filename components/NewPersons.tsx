import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

interface IProps {
  image: string;
  name: string;
  height: string;
  mass: string;
  homeworld: string;
}

const NewPersons = (props: IProps) => {
  const { image, name, height, mass, homeworld } = props;
  return (
    <View>
      <View style={styles.container}>
        <Image source={{ uri: image }} />
        <View style={styles.characteristics}>
          <Text>Имя:</Text>
          <Text>{name}</Text>
        </View>
        <View style={styles.characteristics}>
          <Text>Рост:</Text>
          <Text>{height}</Text>
        </View>
        <View style={styles.characteristics}>
          <Text>Вес:</Text>
          <Text>{mass}</Text>
        </View>
        <View style={styles.characteristics}>
          <Text>Родная планета</Text>
          <Text>{homeworld}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  characteristics: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    width: 250,
  },
});

export default NewPersons;
