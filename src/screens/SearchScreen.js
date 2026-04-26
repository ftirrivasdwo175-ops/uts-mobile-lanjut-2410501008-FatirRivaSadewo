import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`,
      );

      const data = await response.json();

      setResults(data.docs || []);
    } catch (error) {
      console.log("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* INPUT */}
      <TextInput
        placeholder="Cari buku..."
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 10,
        }}
      />

      {/* BUTTON */}
      <TouchableOpacity onPress={searchBooks}>
        <Text style={{ color: "blue", marginBottom: 10 }}>Search</Text>
      </TouchableOpacity>

      {/* LOADING */}
      {loading && <ActivityIndicator size="large" />}

      {/* LIST */}
      <FlatList
        data={results}
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
                padding: 10,
                borderBottomWidth: 1,
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
