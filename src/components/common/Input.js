import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as RNEInput } from 'react-native-elements';

const Input = ({ 
  leftIcon, 
  rightIcon, 
  errorMessage, 
  ...props 
}) => {
  return (
    <RNEInput
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      errorMessage={errorMessage}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      errorStyle={styles.errorText}
      placeholderTextColor="#6B7280"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
  },
  input: {
    color: '#111827',
    fontSize: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginLeft: 15,
  },
});

export default Input;
