import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function BrowseScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);

  const subjects = ["romance", "science", "history", "fantasy", "horror"];

  const fetchBySubject = async (subject) => {
    try {
      setLoading(true);
      setCurrentSubject(subject);

      const response = await fetch(
        `https://openlibrary.org/subjects/${subject}.json`,
      );

      const data = await response.json();

      setBooks(data.works);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* SUBJECT LIST */}
      <FlatList
        horizontal
        data={subjects}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => fetchBySubject(item)}
            style={{
              padding: 10,
              backgroundColor: "#ddd",
              marginRight: 8,
              borderRadius: 8,
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Home", {
                screen: "Detail",
                params: { book: item },
              })
            }
          >
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
