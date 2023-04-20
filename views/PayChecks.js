import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { DataTable } from 'react-native-paper';
import EmployeeNav from '../components/EmployeeNav';
import { theme } from '../core/theme';

const PayChecks = ({ navigation }) => {
  const data = [
    ['2/21', '$112.56', '$99.56','View'],
    ['2/28', '$112.56', '$99.56', 'View'],
    ['3/5', '$112.56', '$99.56',  'View'],
    ['2/12', '$112.56', '$99.56', 'View'],
  ];

  const [selectedPaystub, setSelectedPaystub] = useState(null);

  const handlePaystubPress = (index) => {
    setSelectedPaystub(data[index]);
  }
  const handleClosePaystub = () => {
    setSelectedPaystub(null);
  };

  return (
    <View style={styles.parent}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay Statements</Text>
      </View>
      <View style={styles.tableContainer}>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Pay Date</Text></DataTable.Title>
            <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Gross</Text></DataTable.Title>
            <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Net</Text></DataTable.Title>
            <DataTable.Title style={styles.tableTitle}><Text style={styles.headerText}>Paystub</Text></DataTable.Title>
          </DataTable.Header>
          {data.map((row, index) => (
            <DataTable.Row key={index}>
              {row.map((cell, cellIndex) => (
                <DataTable.Cell key={cellIndex} style={styles.cell} onPress={
                  cellIndex === 3 ? () => handlePaystubPress(index) : null
                }>{cell}</DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable>
    </View>
    <Modal
        visible={selectedPaystub !== null}
        animationType="slide"
        onRequestClose={handleClosePaystub}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Paystub for {selectedPaystub == null ? "null" : selectedPaystub[0]}</Text>
          {/* Display the paystub content here */}
        </View>
      </Modal>
    </ScrollView>
    <View style={styles.navContainer}>
      <EmployeeNav navigation={navigation}/>
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
    height: '50%',
  },
  navContainer: {
    width: '90%',
    height: '20%',
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  cell: {
    width: '25%',
    justifyContent: 'center',
    borderColor:  '#0A304E',
    borderWidth: 1,
  },
  tableTitle: {
    width: '25%',
    justifyContent: 'center',
    borderColor:  '#0A304E',
    borderWidth: 1,
    backgroundColor:'#0A304E',
  },
  headerText:{
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
  },
  table:{
    width: "100%",
  },
});


export default PayChecks;



