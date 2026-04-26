import { View, Text } from "react-native";

export default function DetailScreen({ route }) {
  const { book } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{book.title}</Text>

      <Text>Author: {book.author_name ? book.author_name[0] : "Unknown"}</Text>

      <Text>Year: {book.first_publish_year || "-"}</Text>
    </View>
  );
}
