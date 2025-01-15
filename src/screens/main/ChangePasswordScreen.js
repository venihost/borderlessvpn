
import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ODOO_CONFIG } from '../../constants/odooapi2';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Get user ID and email
      const userId = await AsyncStorage.getItem('userId');
      const userEmail = await AsyncStorage.getItem('userEmail');

      // First, authenticate to verify current credentials
      const authResponse = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'common',
            method: 'authenticate',
            args: [
              ODOO_CONFIG.DATABASE,
              userEmail,
              currentPassword,
              {}
            ]
          },
          id: Math.floor(Math.random() * 1000000)
        })
      });

      const authResult = await authResponse.json();

      if (!authResult.result) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      const updateResponse = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'object',
            method: 'execute_kw',
            args: [
              ODOO_CONFIG.DATABASE,
              authResult.result,
              currentPassword,
              'res.users',
              'write',
              [[parseInt(userId)], {
                password: newPassword
              }]
            ]
          },
          id: Math.floor(Math.random() * 1000000)
        })
      });

      const updateResult = await updateResponse.json();

      if (updateResult.result) {
        // Update stored password in AsyncStorage
        await AsyncStorage.setItem('userPassword', newPassword);

        Alert.alert(
          'Success', 
          'Password changed successfully',
          [{ 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }]
        );
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert(
        'Error', 
        error.message || 'Failed to change password',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={28}
          color="#111827"
          onPress={() => navigation.goBack()}
        />
        <Text h4 style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Input
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrentPassword}
          leftIcon={<Icon name="lock" color="#6B7280" />}
          rightIcon={
            <Icon 
              name={showCurrentPassword ? "visibility" : "visibility-off"} 
              color="#6B7280" 
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          }
          containerStyle={styles.inputContainer}
          disabled={isLoading}
        />

        <Input
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          leftIcon={<Icon name="lock-outline" color="#6B7280" />}
          rightIcon={
            <Icon 
              name={showNewPassword ? "visibility" : "visibility-off"} 
              color="#6B7280" 
              onPress={() => setShowNewPassword(!showNewPassword)}
            />
          }
          containerStyle={styles.inputContainer}
          disabled={isLoading}
        />

        <Input
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          leftIcon={<Icon name="lock-outline" color="#6B7280" />}
          rightIcon={
            <Icon 
              name={showConfirmPassword ? "visibility" : "visibility-off"} 
              color="#6B7280" 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
          containerStyle={styles.inputContainer}
          disabled={isLoading}
        />

        <Button
          title={isLoading ? "Changing Password..." : "Change Password"}
          buttonStyle={styles.changePasswordButton}
          onPress={handleChangePassword}
          disabled={isLoading}
          loading={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  changePasswordButton: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 12,
    marginTop: 20,
  },
});
