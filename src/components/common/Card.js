import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card as RNECard } from 'react-native-elements';

const Card = ({ children, containerStyle, ...props }) => {
  return (
    <RNECard
      containerStyle={[styles.container, containerStyle]}
      wrapperStyle={styles.wrapper}
      {...props}
    >
      {children}
    </RNECard>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    margin: 0,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wrapper: {
    padding: 0,
  },
});

export default Card;
