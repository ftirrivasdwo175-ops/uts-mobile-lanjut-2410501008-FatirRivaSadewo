import { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function FavoritesScreen({ navigation }) {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);

  const removeFavorite = (item) => {
    const updated = favoriteBooks.filter((b) => b.key !== item.key);
    setFavoriteBooks(updated);

    ToastAndroid.show("Buku dihapus dari favorit", ToastAndroid.SHORT);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Buku Favorit
      </Text>

      <FlatList
        data={favoriteBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const author =
            item.authors?.[0]?.name ||
            item.author_name?.[0] ||
            "Unknown Author";

          const coverId = item.cover_id || item.cover_i;
          const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : null;

          return (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 10,
                marginBottom: 10,
                elevation: 2,
              }}
            >
              {/* BAGIAN KLIK KE DETAIL */}
              <TouchableOpacity
                style={{ flexDirection: "row", flex: 1 }}
                onPress={() =>
                  navigation.navigate("Home", {
                    screen: "Detail",
                    params: { book: item },
                  })
                }
              >
                {/* COVER */}
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

                {/* INFO */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    {item.title}
                  </Text>

                  <Text style={{ color: "gray", marginTop: 4, fontSize: 12 }}>
                    {author}
                  </Text>

                  <Text style={{ color: "#888", marginTop: 2, fontSize: 11 }}>
                    Tahun: {item.first_publish_year || "-"}
                  </Text>

                  {/* 🔥 BUTTON HAPUS DI BAWAH */}
                  <TouchableOpacity
                    onPress={() => removeFavorite(item)}
                    style={{
                      marginTop: 8,
                      backgroundColor: "#ff4d4d",
                      paddingVertical: 6,
                      borderRadius: 6,
                      alignSelf: "flex-start",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 12 }}>
                      Hapus dari Favorit
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Belum ada buku favorit
          </Text>
        }
      />
    </View>
  );
}
