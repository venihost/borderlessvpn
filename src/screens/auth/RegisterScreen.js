import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements';
import { jsonRpc } from '../../services/odooApi';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await jsonRpc('/jsonrpc', {
        service: 'object',
        method: 'execute_kw',
        args: [
          'borderlessvpn.venihost.com.ng',
          2,
          'password',
          'res.users',
          'create',
          [{
            name: fullName,
            login: email,
            password: password,
            email: email
          }]
        ]
      });

      // Check if we got a user ID back (successful creation)
      if (response.result) {
        Alert.alert(
          'Success',
          'Your account has been created successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Welcome')
            }
          ]
        );
      }
    } catch (error) {
      console.log('Full error details:', error);
      Alert.alert('Registration Failed', error.message || 'Unable to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text h1 style={styles.heading}>Sign Up</Text>
        <Text style={styles.subheading}>Create your account</Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          placeholder="Full Name"
          leftIcon={<Icon name="person-outline" type="material" color="#6B7280" />}
          onChangeText={setFullName}
          value={fullName}
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          disabled={isLoading}
        />
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
          rightIcon={
            <Icon 
              name="visibility-off" 
              type="material" 
              color="#6B7280"
            />
          }
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          disabled={isLoading}
        />

        <Button
          title={isLoading ? "Creating Account..." : "Sign Up"}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={handleRegister}
          disabled={isLoading}
          loading={isLoading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    color: '#4F46E5',
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
    marginTop: 8,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});