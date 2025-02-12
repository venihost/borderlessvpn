import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import { ODOO_CONFIG } from '../../constants/odooapi2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        setError('No internet connection. Please check your network settings.');
        setLoading(false);
        return;
      }

      console.log('Attempting connection to:', `${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`);      const response = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'common',
            method: 'authenticate',
            args: [
              ODOO_CONFIG.DATABASE,
              email,
              password,
              {}
            ]
          },
          id: Math.floor(Math.random() * 1000000)
        })
      });

      const result = await response.json();
      console.log('Response:', result);

      if (result.result) {
        const uid = result.result;
        await AsyncStorage.setItem('userToken', String(uid));
        await AsyncStorage.setItem('userId', String(uid));
        navigation.navigate('Main');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <Input
          placeholder="Email"
          leftIcon={<Icon name="email" type="material" color="#6B7280" />}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Password"
          leftIcon={<Icon name="lock" type="material" color="#6B7280" />}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.inputContainer}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          title="Sign In"
          loading={loading}
          onPress={handleLogin}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
        />

        <Button
          title="Don't have an account? Sign Up"
          type="clear"
          onPress={() => navigation.navigate('Register')}
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 10,
  }
});