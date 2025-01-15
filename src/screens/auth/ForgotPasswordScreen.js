import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements';
import { jsonRpc } from '../../services/odooApi';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await jsonRpc('/web/auth/reset_password', {
        email: email,
      });

      if (response.result) {
        Alert.alert(
          'Success',
          'Password reset instructions have been sent to your email',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      } else {
        Alert.alert('Error', 'Email address not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process password reset request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" type="material" color="#111827" size={24} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text h1 style={styles.heading}>Reset Password</Text>
        <Text style={styles.subheading}>
          Enter your email address and we'll send you a link to reset your password
        </Text>
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
          autoCapitalize="none"
          disabled={loading}
        />

        <Button
          title="Send Reset Link"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleResetPassword}
          loading={loading}
          disabled={loading}
        />

        <TouchableOpacity 
          style={styles.backToLogin}
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
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
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    paddingLeft: 8,
  },
  buttonContainer: {
    marginBottom: 24,
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
  backToLogin: {
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
});