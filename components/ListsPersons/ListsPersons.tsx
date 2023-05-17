import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Droid from "../persons/Droid";
import Enakin from "../persons/Enakin";

const ListsPersons = () => {
  return (
    <View>
      <Enakin />
      <Droid />
    </View>
  );
};
export default ListsPersons;
