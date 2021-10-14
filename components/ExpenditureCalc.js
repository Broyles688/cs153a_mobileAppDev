import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "react-native-reanimated";
// import * as Random from "expo-random";

// const mph2fps = (mph) => mph*5280/3600

const ExpenditureCalc = () => {
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [percent, setPercent] = useState(0.0);
  const [result, setResult] = useState("waiting");
  const [rightAnswer, setRightAnswer] = useState("none");
  const [currExpenditure, setCurrExpenditure] = useState(0);
  const [isInvalidInput, setInValidInput] = useState(false);

  let myTextInput = React.createRef();

  /*
  const firstNum = (data) =>{
    return Math.floor(Math.random() * (n+1))
  }
  const secondNum = (data) =>{
    return Math.floor(Math.random() * (n+1))
  }
*/

  const [answerNum, setAnswerNum] = useState(-1);
  const [debugging, setDebugging] = useState(false);

  let debugView = "";

  if (debugging) {
    debugView = (
      <View>
        {/* <Text> x: {newFirstNum} </Text>
        <Text> y: {newSecondNum} </Text> */}
        {/* {answerNum != -1 ? (
          <Text> answer: {answerNum}</Text>
        ) : (
          <Text> answer: </Text>
        )} */}
        <Text> Number of Entries: {answered} </Text>
        {/* <Text> answered: {answered} </Text>
        <Text> result: {result} </Text> */}
      </View>
    );
  }

  const getData = async () => {
    try {
      // the '@profile_info' can be any string
      const jsonValue = await AsyncStorage.getItem("@pomodoros");
      let data = null;
      if (jsonValue != null) {
        data = JSON.parse(jsonValue);
        setCurrExpenditure(data.currExpenditure);
        setAnswered(data.answered);
        console.log("just set Info, Name and Email");
      } else {
        console.log("just read a null value from Storage");
        // this happens the first time the app is loaded
        // as there is nothing in storage...
      }
    } catch (e) {
      console.log("error in getData ");
      // this shouldn't happen, but its good practice
      // to check for errors!
      console.dir(e);
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@pomodoros", jsonValue);
      console.log("just stored " + jsonValue);
    } catch (e) {
      console.log("error in storeData ");
      console.dir(e);
      // saving error
    }
  };

  const clearAll = async () => {
    try {
      setCurrExpenditure(0);
      setAnswered(0);
      console.log("in clearData");
      await AsyncStorage.clear();
    } catch (e) {
      console.log("error in clearData ");
      console.dir(e);
      // clear error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Keep and add up Expenditures</Text>
      <Text style={styles.second_header}>
        Total Expenditure: {currExpenditure}
      </Text>
      <Text style={styles.second_header}>
        New Expenditure =
        <TextInput
          style={styles.textinput}
          ref={myTextInput}
          placeholder="???"
          onChangeText={(inputNum) => {
            if (inputNum.length != 0) {
              setAnswerNum(parseInt(inputNum));
            } else {
              setAnswerNum(-1);
            }
          }}
        />
        {isInvalidInput && (
          <Text style={{ color: "red" }}> Invalid Input!!</Text>
        )}
      </Text>

      <View style={styles.fixToText}>
        {!hasAnswered && (
          <Button
            color="red"
            title="ADD NEW"
            onPress={() => {
              if (answerNum > 0) {
                setInValidInput(false);
                let newExpenditure = currExpenditure + answerNum;
                let numEntries = answered + 1;
                setCurrExpenditure(newExpenditure);
                setAnswered(numEntries);
                let data = {
                  currExpenditure: newExpenditure,
                  answered: numEntries,
                };
                storeData(data);
              } else {
                setInValidInput(true);
              }
            }}
          />
        )}
      </View>
      {hasAnswered && rightAnswer === "true" && (
        <View
          style={{
            width: "50%",
            flexDirection: "column",
          }}
        >
          <View>
            <Text style={styles.correctview}> Correct!!!</Text>
          </View>
          <View style={styles.fixToText}>
            <Button
              color="green"
              title="Next Question"
              onPress={() => {
                setHasAnswered(false);
                setNewFirstNum(Math.floor(Math.random() * (n + 1)));
                setNewSecondNum(Math.floor(Math.random() * (n + 1)));
                myTextInput.current.clear();
              }}
            />
          </View>
        </View>
      )}
      {hasAnswered && rightAnswer === "false" && (
        <View
          style={{
            width: "40%",
            flexDirection: "column",
          }}
        >
          <View>
            <Text style={styles.correctview}>
              Sorry, answer was {parseInt(newFirstNum) * parseInt(newSecondNum)}
              , try again!
            </Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Button
              color="green"
              title="Next Question"
              onPress={() => {
                setHasAnswered(false);
                setNewFirstNum(Math.floor(Math.random() * (n + 1)));
                setNewSecondNum(Math.floor(Math.random() * (n + 1)));
                myTextInput.current.clear();
              }}
            />
          </View>
        </View>
      )}

      <Text> Number of Entries: {answered} </Text>
      {/* <Text> Answered {answered} </Text>
      <Text>
        {" "}
        Percent Correct{" "}
        {((parseInt(correct) / parseInt(answered)) * 100).toFixed(1)}{" "}
      </Text> */}

      <View style={styles.fixToText}>
        <Button
          title={(debugging ? "hide" : "show") + " debug info"}
          color="green"
          onPress={() => setDebugging(!debugging)}
        />
      </View>
      {debugView}
      <View style={styles.fixToText}>
        <Button color="green" title="Clear cookie" onPress={clearAll}></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "left",
    margin: "20px",
    padding: "20px",
  },
  textinput: {
    margin: 20,
    fontSize: 30,
  },
  correctview: {
    fontSize: 25,
    color: "red",
  },
  header: {
    fontSize: 40,
    color: "blue",
  },
  second_header: {
    fontSize: 30,
    color: "black",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ExpenditureCalc;
