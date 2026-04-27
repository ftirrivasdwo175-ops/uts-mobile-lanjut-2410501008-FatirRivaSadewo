import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function DetailScreen({ route }) {
  const { book } = route.params;

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

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{detail.title}</Text>

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
