import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, DataTable, Divider, Text, Title } from 'react-native-paper';

const AccountView = ({ navigation }) => {
  const [regularMealSwipes, setRegularMealSwipes] = useState(0);
  const [portableMealSwipes, setPortableMealSwipes] = useState(0);
  const [caseCash, setCaseCash] = useState(0);
  const [checking, setChecking] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleAddCaseCash = () => {
    // implement logic to add more Case Cash
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Title>Meal Swipes</Title>
        <Divider />
        <View style={styles.row}>
          <Text>Regular Meal Swipes: {regularMealSwipes}</Text>
        </View>
        <View style={styles.row}>
          <Text>Portable Meal Swipes: {portableMealSwipes}</Text>
        </View>
      </View>
      <View style={styles.panel}>
        <Title>Checking Account</Title>
        <Divider />
        <View style={styles.row}>
          <Text>Case Cash: ${caseCash}</Text>
          <Button onPress={handleAddCaseCash}>Add Case Cash</Button>
        </View>
        <View style={styles.row}>
          <Text>Checking: ${checking}</Text>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
          {transactions.map((transaction) => (
            <DataTable.Row key={transaction.id}>
              <DataTable.Cell>{transaction.date}</DataTable.Cell>
              <DataTable.Cell numeric>{transaction.amount}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  panel: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default AccountView;