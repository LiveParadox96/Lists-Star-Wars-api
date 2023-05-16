import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

interface IProps {
  name: string;
  height: string;
  mass: string;
  skin_color: string;
  onData: (data: IProps) => void;
}

const NewPersons = ({ onData }: IProps) => {
  const [isLoaded, setisLoaded] = useState(false);
  const [personData, setPersonData] = useState<IProps>({
    name: "",
    height: "",
    mass: "",
    skin_color: "",
  });

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/people/1/")
      .then((response) => response.json())
      .then((result) => {
        setPersonData(result);
        setisLoaded(true);
        onData(result); // Вызываем функцию обратного вызова и передаем данные
      })
      .catch((error) => console.error(error));
  }, []);

  if (!isLoaded) {
    return <Text style={styles.loaded}>...Загрузка</Text>;
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.haractersistics}>
          <Text>Имя:</Text>
          <Text>{personData.name}</Text>
        </View>
        <View style={styles.haractersistics}>
          <Text>Рост:</Text>
          <Text>{personData.height}</Text>
        </View>
        <View style={styles.haractersistics}>
          <Text>Вес:</Text>
          <Text>{personData.mass}</Text>
        </View>
        <View style={styles.haractersistics}>
          <Text>Внутренняя черта:</Text>
          <Text>{personData.skin_color}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaded: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  haractersistics: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    width: 250,
  },
});

export default NewPersons;
