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
import Axios from "axios";

const BBoards = () => {
  //   const { currentValue } = useValue(
  //     "https://glacial-hamlet-05511.herokuapp.com/"
  //   );
  const [serverURL, setURL] = useState(
    "https://glacial-hamlet-05511.herokuapp.com"
  );
  const [selectedBboard, setSelectedBboard] = useState("");
  const [bboard, setBboard] = useState("");
  const [posts, setPosts] = useState([]);
  const [numNewPosts, setNumNewPosts] = useState(0);
  const [bbNames, setBbNames] = useState([]);

  useEffect(() => {
    // go out to the server and get the posts for the current bboard
    const getBbNames = async () => {
      let result = [];
      result = await Axios.get(serverURL + "/bboardNames");
      console.log(result.data);
      setBbNames(result.data);
    };

    const ps = getBbNames();
  }, [bboard, numNewPosts]);

  const getPosts = async (itemName) => {
    setSelectedBboard(itemName);
    let result = [];
    result = await Axios.post(serverURL + "/posts", {
      bboard: itemName,
    });
    setPosts(result.data);
  };

  const clearSelection = () => {
    setSelectedBboard("");
    setPosts([]);
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

  const Item = ({ item }) => {
    return (
      <View style={{ padding: 2 }}>
        {
          <TouchableOpacity
            title={item}
            onPress={() => getPosts(item)}
            style={{
              backgroundColor: "#000",
              padding: 5,
              marginVertical: 3,
              marginHorizontal: 3,
            }}
          >
            <View>
              <Text style={{ color: "#FF4500", alignContent: "center" }}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  };
  const Item2 = ({ item }) => {
    return (
      <View style={{ padding: 10, margin: 10, backgroundColor: "#ddd" }}>
        <Text style={{ fontSize: 24 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 6, flexDirection: "column" }}>
      <View
        style={{
          textAlign: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ fontSize: 30, color: "red", margin: 20 }}>BBViewer</Text>
      </View>{" "}
      <View>
        {" "}
        <ScrollView horizontal={true}>
          <View style={{ padding: 2 }}>
            <Button
              title="REFRESH BBOARDS"
              onPress={() => clearSelection()}
              style={{ padding: 10 }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <FlatList
              horizontal={true}
              data={bbNames}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </ScrollView>
      </View>
      <View>
        <Text style={{ fontSize: 24 }}>
          Selected bboard:
          <Text style={{ backgroundColor: "#000", color: "#FF4500" }}>
            {selectedBboard}
          </Text>
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {" "}
        {selectedBboard != "" && (
          <View style={{ width: "66%" }}>
            <FlatList
              data={posts}
              renderItem={({ item }) => <Item2 item={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}
      </View>
      <View>
        <Text>DEBUGGING</Text>
        <Text>bb:{selectedBboard}</Text>
        <Text>
          show:{selectedBboard == "" && "false"}
          {selectedBboard != "" && "true"}
        </Text>
        <Text>bbs.length:{bbNames.length}</Text>
        <Text>posts:{JSON.stringify(posts)}</Text>
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
