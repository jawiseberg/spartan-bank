import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Switch, List, Divider } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const ProfileSettings = () => {
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const notificationsDbRef = firebase.firestore().collection("Settings").doc(firebase.auth().currentUser.uid)

  useEffect(() => {
    setEmail(firebase.auth().currentUser.email);
    notificationsDbRef.get().then((doc) => {
      if (doc.exists) {
        setNotifications(doc.data().notifications);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }, []);

  const handleSave = () => {
    notificationsDbRef.update({notifications: notifications})
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Profile</List.Subheader>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Push Notifications"
          right={() => (
            <Switch
              value={notifications}
              onValueChange={(value) => setNotifications(value)}
            />
          )}
        />
      </List.Section>
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default ProfileSettings;
