import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const searchBooks = async () => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`,
      );
      const data = await response.json();
      setResults(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query === "") {
      setResults([]);
    }
  }, [query]);

  const onRefresh = () => {
    setRefreshing(true);
    setResults([]);
    setQuery("");
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <TextInput
          placeholder="Cari buku..."
          value={query}
          onChangeText={setQuery}
          style={{ flex: 1, padding: 8 }}
        />

        <TouchableOpacity onPress={searchBooks}>
          <Ionicons name="search" size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          const coverUrl = item.cover_i
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
            : null;

          return (
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
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                  elevation: 2,
                }}
              >
                {coverUrl ? (
                  <Image
                    source={{ uri: coverUrl }}
                    style={{
                      width: 60,
                      height: 90,
                      borderRadius: 6,
                      marginRight: 10,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 60,
                      height: 90,
                      backgroundColor: "#ccc",
                      borderRadius: 6,
                      marginRight: 10,
                    }}
                  />
                )}

                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text>

                  <Text style={{ color: "gray", marginTop: 5 }}>
                    {item.author_name ? item.author_name[0] : "Unknown Author"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
