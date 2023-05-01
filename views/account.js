import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, DataTable, Divider, Modal, Portal, Text, TextInput, Title, Provider } from 'react-native-paper';
import uuid from 'react-native-uuid';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const AccountView = ({ navigation }) => {
  const [regularMealSwipes, setRegularMealSwipes] = useState(0);
  const [portableMealSwipes, setPortableMealSwipes] = useState(0);
  const [caseCash, setCaseCash] = useState(0);
  const [checking, setChecking] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const pagesCount = Math.ceil(transactions.length / itemsPerPage);
  
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  const bankAccountRef = db.collection('BankAccount').doc(userId);
  const caseCashSwipesRef = db.collection('CaseCashSwipes').doc(userId);

  useEffect(() => {
    // Fetch bank account data
    bankAccountRef.get().then((doc) => {
      if (doc.exists) {
        setChecking(doc.data().balance);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });

    // Fetch CaseCashSwipes data
    caseCashSwipesRef.get().then((doc) => {
      if (doc.exists) {
        setCaseCash(doc.data().Casecash);
        setRegularMealSwipes(doc.data().Mealswipes);
        setPortableMealSwipes(doc.data().Portableswipes);
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });

    // Fetch transactions
    bankAccountRef
      .collection('Transactions')
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        const transactionsArray = [];
        querySnapshot.forEach(documentSnapshot => {
          const transaction = documentSnapshot.data();
          transaction.date = transaction.date.toDate();
          transactionsArray.push(transaction);
        });
        setTransactions(transactionsArray);
      })
      .catch(error => {
        console.log('Error getting transactions:', error);
      });
  }, []);

  const handleNextPage = () => {
    setPage((page) => Math.min(page + 1, pagesCount - 1));
  };
  
  const handlePrevPage = () => {
    setPage((page) => Math.max(page - 1, 0));
  };

  const handleAddCaseCash = () => {
    setIsModalVisible(true);
  };

  const handleTransferAmountChange = (value) => {
    if (isNaN(value) || value === '')
      setTransferAmount(0);
    else
      setTransferAmount(parseInt(value));
  };

  const handleAddCaseCashConfirm = () => {
    if (transferAmount === 0) {
      return;
    }
    else if (transferAmount > checking) {
      Alert.alert("Error", "Insufficient balance in checking account");
    } else {
      // Update state variables here based on user's selection
      bankAccountRef.update({balance: checking - transferAmount})
      caseCashSwipesRef.update({Casecash: caseCash + transferAmount})
      bankAccountRef.collection("Transactions").add({
        id: uuid.v4(),
        date: new Date(),
        description: "Transferred from Checking to Case Cash",
        amount: transferAmount,
      })
      .then((docRef) => {
        // Update state variables without accessing database again
        setTransactions([
          {
            id: docRef.id,
            date: new Date(),
            description: "Transferred from Checking to Case Cash",
            amount: transferAmount,
          },
          ...transactions,
        ]);
        setCaseCash(caseCash + transferAmount);
        setChecking(checking - transferAmount);
      })
      .catch((error) => {
        console.log("Error adding transaction:", error);
      });
      setIsModalVisible(false);
      Alert.alert("Success!", `Success: Added $${transferAmount} to Case Cash`);
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
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Description</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>
            {transactions.slice(startIndex, endIndex).map((transaction) => (
              <DataTable.Row key={transaction.id}>
                <View style={{ justifyContent: 'center', paddingRight: 40 }}>
                  <Text>{transaction.date.toLocaleDateString()}</Text>
                </View>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <Text>{transaction.description}</Text>
                </View>
                <DataTable.Cell numeric>${transaction.amount}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button mode="contained" disabled={page === 0} onPress={handlePrevPage}>
              Prev
            </Button>
            <Button
              mode="contained"
              disabled={page === pagesCount - 1}
              onPress={handleNextPage}
            >
              Next
            </Button>
          </View>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onDismiss={() => setIsModalVisible(false)}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Title style={styles.modalTitle}>Add Case Cash</Title>
          <Divider />
          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>Transfer Amount:</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={transferAmount}
              onChangeText={handleTransferAmountChange}
            />
          </View>
          <Button
          mode="contained"
          style={styles.modalButton}
          onPress={handleAddCaseCashConfirm}
          >
            Confirm
          </Button>
        </View>
      </Modal>
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
    pointerEvents: 'box-none',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    pointerEvents: 'box-none',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    pointerEvents: 'auto',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  modalInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  modalButton: {
    marginTop: 20,
  },
});

export default AccountView;