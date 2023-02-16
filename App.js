import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, Button } from "native-base";

export default function App() {
  let balance = 0.00
  return (
    <NativeBaseProvider>
        <Box alignSelf="center" top="45%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" backgroundColor= "gray.150">
          <Text style={styles.titleText}>Case Cash Balance</Text>
          <Text style={styles.baseText}>${balance}</Text>
            <Button variant="subtle" colorScheme="green" onPress={() => console.log("Adding Case Cash")}>
              <Text style={styles.baseText}>
                Add Case Cash
              </Text>
            </Button>
        </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'notoserif',
    fontSize: 20,
    textAlign: 'left',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});