import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Switch, List, Divider } from 'react-native-paper';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(false);

  const handleSave = () => {
    // Handle saving the user's profile settings
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Profile</List.Subheader>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
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
              value={notification}
              onValueChange={(value) => setNotification(value)}
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
