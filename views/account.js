import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, DataTable, Divider, Modal, Portal, Text, TextInput, Title, Provider } from 'react-native-paper';

const AccountView = ({ navigation }) => {
  const [regularMealSwipes, setRegularMealSwipes] = useState(0);
  const [portableMealSwipes, setPortableMealSwipes] = useState(0);
  const [caseCash, setCaseCash] = useState(0);
  const [checking, setChecking] = useState(100);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleAddCaseCash = () => {
    setIsModalVisible(true);
  };

  const handleTransferAmountChange = (value) => {
    setTransferAmount(parseInt(value));
  };

  const handleAddCaseCashConfirm = () => {
    if (transferAmount === 0) {
      return;
    }
    else if (transferAmount > checking) {
      alert('Error: Insufficient balance in checking account');
    } else {
      // Update state variables here based on user's selection
      setIsModalVisible(false);
      setChecking(checking - transferAmount);
      setCaseCash(caseCash + transferAmount);
      setTransactions([
        {
          id: transactions.length + 1,
          date: new Date().toLocaleDateString(),
          description: "Transferred from Checking to Case Cash",
          amount: transferAmount,
        },
        ...transactions,
      ]);
      alert(`Success: Added $${transferAmount} to Case Cash`);
      setTransferAmount(0)
    }
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
            <DataTable.Title>Description</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
          {transactions.map((transaction) => (
            <DataTable.Row key={transaction.id}>
              <DataTable.Cell>{transaction.date}</DataTable.Cell>
              <View style={{ flex: 1 }}>
                <Text>{transaction.description}</Text>
              </View>
              <DataTable.Cell numeric>{transaction.amount}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <Provider>
        <Portal>
          <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
            <Title>Add Case Cash</Title>
            <Divider />
            <View style={styles.row}>
              <Text>Transfer Amount:</Text>
              <TextInput
                keyboardType="numeric"
                value={transferAmount.toString()}
                onChangeText={handleTransferAmountChange}
              />
            </View>
            <Button mode="contained" onPress={handleAddCaseCashConfirm}>
              Confirm
            </Button>
          </Modal>
        </Portal>
      </Provider>
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