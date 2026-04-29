import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function DetailScreen({ route }) {
  const { book } = route.params;

  const { favoriteBooks, setFavoriteBooks } = useContext(FavoriteContext);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const workId = book.key.replace("/works/", "");

      const response = await fetch(
        `https://openlibrary.org/works/${workId}.json`,
      );

      const data = await response.json();

      setDetail(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  const handleFavorite = () => {
    const exists = favoriteBooks.find((b) => b.key === book.key);

    if (!exists) {
      setFavoriteBooks([...favoriteBooks, book]);
      ToastAndroid.show("Buku ditambahkan ke favorit", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Sudah ada di favorit", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>
          {detail.title}
        </Text>

        <TouchableOpacity
          onPress={handleFavorite}
          style={{
            marginLeft: 10,
            backgroundColor: "black",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>Favorite</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 10 }}>
        Author: {book.author_name ? book.author_name[0] : "Unknown"}
      </Text>

      <Text style={{ marginTop: 5 }}>
        Tahun: {book.first_publish_year || "-"}
      </Text>

      <Text style={{ marginTop: 10 }}>Deskripsi:</Text>

      <Text>
        {detail.description
          ? typeof detail.description === "string"
            ? detail.description
            : detail.description.value
          : "Tidak ada deskripsi"}
      </Text>
    </View>
  );
}
