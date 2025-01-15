import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Input, Text, Icon, Divider } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ODOO_CONFIG } from '../../constants/odooapi2';

export default function LoginScreen2({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const authResponse = await axios.post(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
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
        }
      });

      const uid = authResponse.data.result;

      if (uid) {
        await AsyncStorage.multiSet([
          ['userToken', uid.toString()],
          ['userId', uid.toString()],
          ['userEmail', email],
          ['userPassword', password]
        ]);
        navigation.navigate('Main');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text h1 style={styles.heading}>Sign In</Text>
        <Text style={styles.subheading}>Welcome back!</Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          placeholder="Email Address"
          leftIcon={<Icon name="mail-outline" type="material" color="#6B7280" />}
          onChangeText={setEmail}
          value={email}
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          keyboardType="email-address"
          disabled={isLoading}
          autoCapitalize="none"
        />

        <Input
          placeholder="Password"
          leftIcon={<Icon name="lock-outline" type="material" color="#6B7280" />}
          rightIcon={<Icon name="visibility-off" type="material" color="#6B7280" />}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          disabled={isLoading}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          title={isLoading ? "Signing In..." : "Sign In"}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleLogin}
          disabled={isLoading}
          loading={isLoading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 30,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: '#6B7280',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    paddingLeft: 8,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  signUpLink: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  }
});