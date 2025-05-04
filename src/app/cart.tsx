import { FlatList, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@components/CartListItem";
import Button from "@components/Button";

const CartScreen = () => {
  const { items,total } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        ListFooterComponent={
          items.length > 0 ? (
            <View style={styles.buttonContainer}>
              <Text style={{marginTop:20,fontSize:20,fontWeight:'900'}}>Total:Rs {total}</Text>
              <Button text="Check out" />
            </View>
          ) : null
        }
      />
      <StatusBar style={Platform.OS === "android" ? "light" : "light"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttonContainer: {
    padding: 10,
  },
});