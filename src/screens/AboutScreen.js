import { View, Text, Image } from "react-native";

export default function AboutScreen() {
  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Image
        source={{
          uri: "https://i.pravatar.cc/150?img=12",
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom: 15,
        }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Profile
      </Text>

      <Text>Nama: Fatir Riva Sadewo</Text>
      <Text>NIM: 2410501008</Text>
      <Text>Kelas: (B)</Text>

      <Text style={{ marginTop: 10 }}>Tema: Bookshelf</Text>

      <Text style={{ marginTop: 10 }}>
        API: Open Library ( https://openlibrary.org/developers/api)
      </Text>
    </View>
  );
}
