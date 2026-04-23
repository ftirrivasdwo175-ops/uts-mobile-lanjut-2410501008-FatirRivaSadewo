import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const MainTabs = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function LibraryHome() {
  return (
    <View>
      <Text>Library Home</Text>
    </View>
  );
}

function BookDetailView() {
  return (
    <View>
      <Text>Book Detail</Text>
    </View>
  );
}

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
      <Text>Fatir Riva Sadewo- 2410501008</Text>
    </View>
  );
}

function LibraryStack() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Library" component={LibraryHome} />
      <RootStack.Screen name="DetailBook" component={BookDetailView} />
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
