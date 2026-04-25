import { View, Text } from "react-native";

export default function DetailScreen({ route }) {
  const { book } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {book.title}
      </Text>

      <Text style={{ marginBottom: 5 }}>
        Author: {book.author_name ? book.author_name[0] : "Unknown"}
      </Text>

      <Text>Year: {book.first_publish_year || "-"}</Text>
    </View>
  );
}
