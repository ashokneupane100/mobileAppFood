import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@components/ProductListItem";
import Button from "@components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem, items } = useCart();

  const router=useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push('/cart')
  };

  useEffect(() => {
    if (items.length > 0) {
      const latestItem = items[0]; // Log the latest item added (first in array)
      // console.log("Added item size:", latestItem);
    }
  }, [items]);

  if (!product) {
    return <Text>Product Not Found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.label}>Select Size:</Text>

      <View style={styles.sizes}>
        {sizes.map(size => 
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              { backgroundColor: selectedSize === size ? '#d3d3d3' : '#e0e0e0' },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? '#000' : '#555' },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.price}>Rs {product.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 'auto',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: '#e0e0e0',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});