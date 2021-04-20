
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Welcolme from './src/pages/Welcome';

export default function App() {
  return (
    <View style={style.container}>
      <Welcolme />
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})