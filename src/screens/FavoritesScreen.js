import { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FavoriteContext } from "../context/FavoriteContext";

export default function FavoritesScreen({ navigation }) {
  const { favoriteBooks } = useContext(FavoriteContext);

  return (
    <FlatList
      data={favoriteBooks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Home", {
              screen: "Detail",
              params: { book: item },
            })
          }
        >
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
