import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import products from "@assets/data/products";

const ProductDetailsScreen = () => {
  const{id}=useLocalSearchParams();

  const product=products.find((p)=>p.id.toString()===id);



  return (
    <View>
      <Stack.Screen options={{title:product?.name}} />
      <Text style={{fontSize:20}} >Product details id:{id} </Text>
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({})