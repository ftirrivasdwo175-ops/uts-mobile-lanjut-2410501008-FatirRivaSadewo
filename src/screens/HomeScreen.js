import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=programming",
      );
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      setErrorState(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (errorState) return <Text>Error</Text>;

  return (
    <FlatList
      data={books}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { book: item })}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFavoriteBooks([...favoriteBooks, item])}
          >
            <Text style={{ color: "blue" }}>Tambah ke Favorit</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
