import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';

const Button = ({ 
  type = 'solid', 
  size = 'normal',
  containerStyle,
  buttonStyle,
  titleStyle,
  ...props 
}) => {
  return (
    <RNEButton
      type={type}
      containerStyle={[
        styles.container,
        size === 'large' && styles.containerLarge,
        containerStyle,
      ]}
      buttonStyle={[
        styles.button,
        type === 'outline' && styles.outlineButton,
        size === 'large' && styles.buttonLarge,
        buttonStyle,
      ]}
      titleStyle={[
        styles.title,
        type === 'outline' && styles.outlineTitle,
        titleStyle,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  containerLarge: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4F46E5',
    height: 48,
    paddingHorizontal: 24,
  },
  buttonLarge: {
    height: 56,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  outlineTitle: {
    color: '#4F46E5',
  },
});

export default Button;
