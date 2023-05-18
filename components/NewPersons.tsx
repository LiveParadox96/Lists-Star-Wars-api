import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

interface IProps {
  name: string;
  height: string;
  mass: string;
  skin_color: string;
}

const NewPersons = (props: IProps) => {
  const { name, height, mass, skin_color } = props;
  return (
    <View>
      <View style={styles.container}>
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
          <Text>Внутренняя черта:</Text>
          <Text>{skin_color}</Text>
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
