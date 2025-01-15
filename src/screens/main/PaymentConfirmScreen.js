import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';

export default function PaymentConfirmScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Icon
            name="check-circle"
            type="material"
            size={100}
            color="#4CAF50"
          />
        </View>

        <Text h3 style={styles.title}>Payment Successful!</Text>
        <Text style={styles.message}>
          Your subscription has been activated successfully. Enjoy unlimited access to BorderlessVPN!
        </Text>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Transaction Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plan</Text>
            <Text style={styles.detailValue}>Premium</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>$9.99/month</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>#VPN28947</Text>
          </View>
        </View>

        <Button
          title="Start Using VPN"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  successIcon: {
    marginBottom: 24,
  },
  title: {
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  detailsCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 32,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 32,
    height: 56,
    borderRadius: 12,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
  },
});
