import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import Button from './components/Button';

const clockArt = require('./assets/clockart.png')

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff'}}>This page is for clocking in and out</Text>
        <View style={styles.imageContainer}>
          <Image source={clockArt} style={styles.image}/>
        </View>
        <View style={styles.footerContainer}>
          <Button label="Clock in"/>
        </View>
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
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
