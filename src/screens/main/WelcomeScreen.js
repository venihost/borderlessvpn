
import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 10,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(8000),
    ]).start(() => {
      navigation.replace('Main');
    });
  }, []);

  return (
    <LinearGradient
      colors={['#4F46E5', '#1E1B4B']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Icon
          name="shield-check"
          type="material-community"
          color="#fff"
          size={100}
        />
        
        <Text h1 style={styles.title}>Welcome to BorderlessVPN</Text>
        
        <Text style={styles.message}>
          Your account has been successfully created!
        </Text>
        
        <Text style={styles.subtitle}>
          Get ready to experience secure and unlimited internet access
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  message: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    opacity: 0.9,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
  },
});
