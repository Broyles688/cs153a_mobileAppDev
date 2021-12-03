import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const BBoards = () => {
  //   const { currentValue } = useValue(
  //     "https://glacial-hamlet-05511.herokuapp.com/"
  //   );
  const [selectedBboard, setSelectedBboard] = useState("");
  const [bboard, setBboard] = useState("");
  const [posts, setPosts] = useState([]);
  const [numNewPosts, setNumNewPosts] = useState(0);
  const [bbNames, setBbNames] = useState([]);
  const [currRecords, setCurrRecords] = useState([]);
  const [expenditureItem, setExpenditureItem] = useState("");
  const [currExpense, setCurrExpense] = useState("");
  const [currID, setCurrId] = useState(0);

  const getData = async () => {
    try {
      // the '@profile_info' can be any string
      const jsonValue = await AsyncStorage.getItem("@pomodoros");
      let data = null;
      if (jsonValue != null) {
        data = JSON.parse(jsonValue);
        setCurrRecords(data.records);
        setCurrId(data.currID);
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

  const storeData = async (currRecord) => {
    try {
      let value = { records: currRecord, id: currID };

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
      setCurrRecords([]);
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

  const addRecords = () => {
    let currRecord = {
      _id: currID,
      item: expenditureItem,
      expense: currExpense,
    };
    let temp = [];
    if (currRecords.length == 0) {
      temp = [currRecord];
    } else {
      temp = currRecords;
      temp.push(currRecord);
    }
    setCurrRecords(temp);
    setExpenditureItem("");
    setCurrExpense("");
    setCurrId(currID + 1);
    console.log(currRecords);
    storeData(temp);
  };
  //   const addPost = async () => {
  //     await Axios.post(currentValue.appURL + "/addComment", {
  //       email: currentValue.email,
  //       secret: currentValue.secret,
  //       bboard: bboard,
  //       title: title,
  //       text: text,
  //     });
  //     setTitle("");
  //     setText("");

  //     setNumNewPosts(numNewPosts + 1);
  //   };

  //   const remove = async (item) => {
  //     console.log("remove is called on item: ");
  //     console.log(item);
  //     const result = await Axios.post(currentValue.appURL + "/deletePost", {
  //       email: currentValue.email,
  //       secret: currentValue.secret,
  //       postid: item._id,
  //     });
  //     console.log(result);
  //     setNumNewPosts(numNewPosts + 1);
  //   };

  const Item2 = ({ item }) => {
    return (
      <View style={{ padding: 10, margin: 10, backgroundColor: "#ddd" }}>
        {console.log(item)}
        <Text style={{ fontSize: 24 }}>{item.item}</Text>
        <Text>{item.expense}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 6, flexDirection: "column" }}>
      <View style={styles.input}>
        <Text> Add new Expenditure</Text>
        <TextInput
          onChangeText={(text) => setExpenditureItem(text)}
          value={expenditureItem}
          placeholder="Expenditure Item"
        />
        <TextInput
          onChangeText={(text) => setCurrExpense(text)}
          value={currExpense}
          placeholder="Amount"
        />
        <TouchableOpacity
          onPress={() => addRecords()}
          style={{ width: 200, backgroundColor: "#fca" }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => clearAll()}
        style={{ width: 88, backgroundColor: "#FF4500" }}
      >
        <Text>Clear Records</Text>
      </TouchableOpacity>
      <View style={{ width: "66%" }}>
        <FlatList
          style={{ flex: 1 }}
          data={currRecords}
          renderItem={({ item }) => <Item2 item={item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: "#fcc",
    padding: 5,
    margin: 5,
  },
  posts: {
    borderColor: "blue",
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: "#ccf",
    padding: 5,
    margin: 5,
  },
});

export default BBoards;
