import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Pessoas from './components/pessoas';
import Header from './components/header';

export default function App() {
  return (
    <View>
      <Header/>
      <Text>Teste Visie web</Text>
      <Pessoas />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
