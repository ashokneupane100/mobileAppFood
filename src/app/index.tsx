// src/app/index.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';

const RootIndex = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Food Order App</Text>
      <Text style={styles.subtitle}>Please select your role:</Text>
      
      <Link href={'/(user)'} asChild>
        <Button text="Open as User" />
      </Link>
      
      <Link href={'/(admin)'} asChild>
        <Button text="Open as Admin" />
      </Link>
    </View>
  );
};

export default RootIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#666',
  },
});