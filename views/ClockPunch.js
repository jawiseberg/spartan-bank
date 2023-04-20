import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EmployeeNav from '../components/EmployeeNav';
import { theme } from '../core/theme';

const ClockPunch = ({ navigation }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
    

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn);
    setCurrentTime(new Date());
  };

  useEffect(() => {
    // Update current time every 3 seconds
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, {    color: isClockedIn ? 'green' : 'red'}]}>
        {isClockedIn ? 'Clocked In' : 'Clocked Out'}
      </Text>
      <Text style={{fontSize: 24, marginBottom: 20}}>{currentTime.toLocaleTimeString()}</Text>
      <TouchableOpacity 
        style={styles.buttonStyle}
        onPress={handleClockInOut}
      >
          <Text style={{fontSize: 24, color: 'white'}}>
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Text>
      </TouchableOpacity>
      <View style={styles.navContainer}>
      <EmployeeNav navigation={navigation}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText:{
    fontSize: 50, 
    marginBottom: 20 ,
    borderWidth: 2,
    paddingHorizontal: 30, 
    paddingVertical: 10, 
    width: '90%',
    height: '30%',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: theme.colors.primary
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  buttonStyle:{
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
  },
});

export default ClockPunch;