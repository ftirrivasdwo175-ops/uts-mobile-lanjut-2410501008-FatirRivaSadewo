import { useContext } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function FavoritesScreen({ navigation }) {
  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);

  const handleDelete = (indexToDelete) => {
    Alert.alert("Hapus Favorit", "Yakin ingin menghapus buku ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        onPress: () => {
          const updated = favoriteBooks.filter((_, i) => i !== indexToDelete);
          setFavoriteBooks(updated);
        },
      },
    ]);
  };

  return (
    <FlatList
      data={favoriteBooks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        // FIX COVER
        const coverId = item.cover_id || item.cover_i;
        const coverUrl = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : null;

        // FIX AUTHOR
        const author =
          item.authors?.[0]?.name || item.author_name?.[0] || "Unknown Author";

        return (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              margin: 10,
              elevation: 2,
            }}
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

            {/* TEXT */}
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Home", {
                    screen: "Detail",
                    params: { book: item },
                  })
                }
              >
                <Text style={{ fontWeight: "bold" }}>{item.title}</Text>

                <Text style={{ color: "gray", marginTop: 5 }}>{author}</Text>
              </TouchableOpacity>

              {/* DELETE */}
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Text
                  style={{
                    color: "red",
                    marginTop: 6,
                    fontSize: 12,
                  }}
                >
                  Hapus dari Favorit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
}
