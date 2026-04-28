import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");

  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);

  const tabs = [
    { label: "Trending", value: "trending" },
    { label: "Fiksi", value: "fiction" },
    { label: "Romantis", value: "romance" },
    { label: "Misteri", value: "mystery" },
    { label: "Horror", value: "horror" },
  ];

  const fetchBooks = async (type) => {
    try {
      setErrorState(false);

      const url =
        type === "trending"
          ? "https://openlibrary.org/trending/daily.json"
          : `https://openlibrary.org/subjects/${type}.json`;

      const res = await fetch(url);
      const data = await res.json();

      setBooks(data.works || []);
    } catch (error) {
      setErrorState(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks("trending");
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks(activeTab);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  if (errorState) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Terjadi kesalahan, cek koneksi internet</Text>
        <TouchableOpacity onPress={() => fetchBooks(activeTab)}>
          <Text style={{ color: "blue", marginTop: 10 }}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Katalog Buku
      </Text>

      {/* TAB */}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            onPress={() => {
              setActiveTab(tab.value);
              setLoading(true);
              fetchBooks(tab.value);
            }}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 20,
              marginRight: 8,
              backgroundColor: activeTab === tab.value ? "#4A90E2" : "#ddd",
            }}
          >
            <Text
              style={{
                color: activeTab === tab.value ? "#fff" : "#000",
                fontSize: 12,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          // COVER FIX
          const coverId = item.cover_id || item.cover_i;
          const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : null;

          // AUTHOR FIX
          const author =
            item.authors?.[0]?.name ||
            item.author_name?.[0] ||
            "Unknown Author";

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
              {/* COVER (ROUNDED FIX) */}
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

              {/* TEXT */}
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Detail", { book: item })}
                >
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text>

                  <Text style={{ color: "gray", marginTop: 5 }}>{author}</Text>
                </TouchableOpacity>

                {/* FAVORIT + TOAST */}
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
                >
                  <Text style={{ color: "blue", marginTop: 6, fontSize: 12 }}>
                    Simpan ke Favorit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
