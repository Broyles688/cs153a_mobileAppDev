import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View, Button } from "react-native";

import FlexDemo1Screen from "./FlexDemo1";
import ExpenditureCalc from "./ExpenditureCalc";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="Preferences" component={ProfileScreen} />

        <Stack.Screen name="About" component={FlexDemo1Screen} />

        <Stack.Screen name="Expenditure keeper" component={ExpenditureCalc} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: "25px",
        border: "thick solid black",
        padding: "10px",
        justifyContent: "space-around",
      }}
    >
      <Button title="About" onPress={() => navigation.navigate("About")} />

      <Button
        title="Preferences"
        onPress={
          () =>
            navigation.navigate("Preferences", {
              name: "setting preferences",
              greeting: "Hi!",
            })
          // we're passing a parameter name:'Jane' to the Profile component!
        }
      />

      <Button
        title="To be implemented"
        onPress={
          () =>
            navigation.navigate("Preferences", {
              name: "future development",
              greeting: "Hello",
            })
          // we're passing a parameter name:'Jane' to the Profile component!
        }
      />

      <Button
        title="Expenditure Keeper"
        onPress={
          () =>
            navigation.navigate("Expenditure keeper", {
              name: "calc",
              greeting: "Hello",
            })
          // we're passing a parameter name:'Jane' to the Profile component!
        }
      />
    </View>
  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const ProfileScreen = ({ navigation, route }) => {
  return (
    <Text>
      {route.params.greeting}, this page is for {route.params.name}
    </Text>
  );
  // we're using the parameter name passed in from the HomeScreen
};

export default MyStack;
