import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoogleauthScreen({ navigation }) {
  const handleGoogleSignIn = () => {
    // Implement Google Sign In logic here
    navigation.navigate('Main');
  };

  return (
    <LinearGradient colors={['#1a237e', '#0d47a1']} style={styles.container}>
      <View style={styles.content}>
        <Icon
          name="google"
          type="font-awesome"
          color="#fff"
          size={60}
          containerStyle={styles.iconContainer}
        />
        
        <Text h3 style={styles.title}>Sign in with Google</Text>
        <Text style={styles.subtitle}>
          Quick and secure access to BorderlessVPN
        </Text>

        <Button
          title="Continue with Google"
          icon={
            <Icon
              name="google"
              type="font-awesome"
              size={20}
              color="#000"
              containerStyle={styles.buttonIcon}
            />
          }
          buttonStyle={styles.googleButton}
          titleStyle={styles.googleButtonTitle}
          containerStyle={styles.buttonContainer}
          onPress={handleGoogleSignIn}
        />

        <Button
          title="Back"
          type="clear"
          titleStyle={styles.backButtonText}
          containerStyle={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 12,
  },
  googleButtonTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 10,
  },
  backButtonContainer: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
