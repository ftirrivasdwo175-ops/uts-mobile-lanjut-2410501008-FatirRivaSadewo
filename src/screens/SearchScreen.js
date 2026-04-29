import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoriteContext } from "../context/FavoriteContext";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 VALIDASI ERROR
  const [error, setError] = useState("");

  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);

  // 🔥 AUTO CLEAR HASIL SAAT INPUT KOSONG
  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setSearched(false);
      setError("");
    }
  }, [query]);

  const searchBooks = async () => {
    if (query.length < 3) {
      setError("Minimal 3 karakter");
      setResults([]);
      setSearched(false);
      return;
    }

    setError(""); // reset error kalau valid

    try {
      setLoading(true);
      setResults([]);

      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await res.json();

      setResults(data.docs || []);
      setSearched(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setQuery("");
    setResults([]);
    setSearched(false);
    setError("");
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Search Book
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginBottom: 5,
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

      {/* 🔥 ERROR MESSAGE */}
      {error !== "" && (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      )}

      {/* 🔥 LOADING */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" />
      ) : (
        <>
          {searched && results.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Hasil tidak ditemukan
            </Text>
          )}

          <FlatList
            data={results}
            keyExtractor={(item, i) => i.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => {
              const coverUrl = item.cover_i
                ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                : null;

              const author = item.author_name?.[0] || "Unknown Author";

              return (
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
                      {author}
                    </Text>

                    <Text style={{ color: "#888", marginTop: 2 }}>
                      Tahun: {item.first_publish_year || "-"}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        const exists = favoriteBooks.find(
                          (b) => b.key === item.key,
                        );

                        if (!exists) {
                          setFavoriteBooks([...favoriteBooks, item]);
                          ToastAndroid.show(
                            "Buku ditambahkan ke favorit",
                            ToastAndroid.SHORT,
                          );
                        } else {
                          ToastAndroid.show(
                            "Sudah ada di favorit",
                            ToastAndroid.SHORT,
                          );
                        }
                      }}
                      style={{
                        marginTop: 8,
                        backgroundColor: "#4A90E2",
                        paddingVertical: 6,
                        borderRadius: 6,
                        alignSelf: "flex-start",
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 12 }}>
                        Simpan ke Favorit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
}
