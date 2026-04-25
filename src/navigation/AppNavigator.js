import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const MainTabs = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function SavedCollection() {
  return (
    <View>
      <Text>Saved Books</Text>
    </View>
  );
}

function SearchPanel() {
  return (
    <View>
      <Text>Search Books</Text>
    </View>
  );
}

function ProfileInfo() {
  return (
    <View>
      <Text>About Me</Text>
      <Text>Fatir - 2410501008</Text>
    </View>
  );
}

function LibraryStack() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Library" component={HomeScreen} />
      <RootStack.Screen name="DetailBook" component={DetailScreen} />
    </RootStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabs.Navigator>
        <MainTabs.Screen name="HomeTab" component={LibraryStack} />
        <MainTabs.Screen name="SavedTab" component={SavedCollection} />
        <MainTabs.Screen name="SearchTab" component={SearchPanel} />
        <MainTabs.Screen name="AboutTab" component={ProfileInfo} />
      </MainTabs.Navigator>
    </NavigationContainer>
  );
}
