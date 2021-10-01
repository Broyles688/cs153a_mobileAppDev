import React from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";

// const App = () => {...}
export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, alignItems: "center", backgroundColor: "black" }}>
        <Text style={styles.header}>Book keeper</Text>
        <Text style={{ color: "white", fontSize: 24 }}>
          This App helps you keep track of daily spending!
        </Text>
      </View>
      <View style={{ flex: 6 }}>
        <View style={styles.horizontal}>
          <Image
            style={{ width: "50%" }}
            source={{
              uri: "https://image.shutterstock.com/z/stock-vector-open-accounting-book-or-ledger-tables-with-calculator-and-pencil-flat-style-vector-illustration-527394412.jpg",
            }}
          />
          <View style={styles.formBox}>
            <Text style={{ fontSize: 32 }}> Register Below </Text>
            <TextInput style={styles.input} placeholder="Full Name" />
            <TextInput style={styles.input} placeholder="Age" />
            <Button title="Submit" color="red" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "stretch",
  },
  header: {
    flex: 1,
    alignItems: "center",
    fontSize: 64,
    padding: 25,
    color: "red",
  },
  vertical: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "stretch",
    backgroundColor: "green",
  },
  horizontal: {
    flex: 2,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "stretch",
    backgroundColor: "pink",
  },
  upperLeft: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderWidth: "5pt",
    flexDirection: "row",
  },
  centered: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderWidth: "5pt",
    borderColor: "red",
    padding: "10px",
    margin: "20px",
  },
  lowerRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderWidth: "5pt",
    flexDirection: "row",
  },
  input: {
    color: "black",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  formBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "stretch",
    backgroundColor: "#fffff5",
  },
});
