import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@components/ProductListItem";
import Colors from "@/constants/Colors";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product Not Found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "#f5f5f5" }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Stack.Screen
          options={{
            title: product.name,
            headerRight: () => (
              <Pressable
                onPress={() => router.push(`/(admin)/menu/edit/${id}`)}
              >
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.background}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ),
          }}
        />
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image || defaultPizzaImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>Rs {product.price}</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>Product Details</Text>
          <Text style={styles.description}>
            This is a placeholder description for {product.name}. Add more details
            about the product here, such as ingredients, allergens, or preparation
            methods. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60, // Increased for more space at the bottom
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "600",
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 30, // Increased for more space
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15, // Increased for more space
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.light.tint,
    marginBottom: 25, // Increased for more space
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 25, // Increased for more space
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#555",
    marginBottom: 15, // Increased for more space
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
    textAlign: "justify",
  },
});