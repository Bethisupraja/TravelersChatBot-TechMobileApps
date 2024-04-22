import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatBot from './ChatBot';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatBot></ChatBot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});


