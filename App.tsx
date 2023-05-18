import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import ListsPersons from "./components/ListsPersons/ListsPersons";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ListsPersons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
