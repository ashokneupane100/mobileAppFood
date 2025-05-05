import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const CreateProductScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <Text style={styles.label}>Price Rs:</Text>
      <TextInput placeholder="999" style={styles.input}
      keyboardType="numeric+" />
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:10,
    },
    input:{
        backgroundColor:'white',
        padding:10,
        borderRadius:5,
        marginTop:5,
        marginBottom:20,


    },
    label:{
        color:'gray',
        fontSize:16,



    }
})