import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Card } from 'react-native-elements';

export default function ProcessPaymentScreen({ navigation, route }) {
    const { paymentId, provider, amount, plan } = route.params;
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Process payment with provider
            navigation.navigate('PaymentConfirmation', {
                plan: plan,
                amount: amount,
                transactionId: paymentId
            });
        } catch (error) {
            Alert.alert('Payment Failed', 'Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Text h4 style={styles.title}>Enter Payment Details</Text>
                <Input
                    placeholder="Card Number"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                />
                <Input
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                />
                <Input
                    placeholder="CVV"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    secureTextEntry
                />
                <Button
                    title={loading ? "Processing..." : `Pay ${amount.toFixed(2)}`}
                    onPress={handlePayment}
                    loading={loading}
                    disabled={loading}
                />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F3F4F6'
    },
    card: {
        borderRadius: 12,
        padding: 20
    },
    title: {
        marginBottom: 20,
        textAlign: 'center'
    }
});
