import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text, Button, Icon, Card } from 'react-native-elements';
import { ODOO_CONFIG } from '../../constants/odooapi2';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentScreen({ navigation, route }) {
    // Screen state
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('flutterwave');

    // Subscription details from previous screen
    const { plan, subscriptionId, amount } = route.params;

    // Available payment methods
    const paymentMethods = [
        { id: 'flutterwave', name: 'Flutterwave', icon: 'payment' },
        { id: 'paystack', name: 'Paystack', icon: 'credit-card' },
        { id: 'paypal', name: 'PayPal', icon: 'account-balance' }
    ];

    // Process payment
    const initiatePayment = async () => {
        setLoading(true);

        try {
            // Get user credentials
            const userId = await AsyncStorage.getItem('userId');
            const userToken = await AsyncStorage.getItem('userToken');

            // Prepare payment payload
            const paymentPayload = {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    service: 'object',
                    method: 'execute_kw',
                    args: [
                        ODOO_CONFIG.DATABASE,
                        parseInt(userToken),
                        ODOO_CONFIG.PASSWORD,
                        'vpn.payment.gateway',
                        'create',
                        [{
                            subscription_id: subscriptionId,
                            amount: amount,
                            gateway_provider: paymentMethod,
                            payment_method: 'card', // Default to card
                            payment_status: 'draft',
                            currency_id: 1 // Assuming USD currency ID is 1
                        }]
                    ]
                },
                id: Math.floor(Math.random() * 1000000)
            };

            // Send payment request
            const response = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentPayload)
            });

            const result = await response.json();

            // Handle payment response
            if (result.result) {
                // Initiate payment on the backend
                const initiatePaymentPayload = {
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        service: 'object',
                        method: 'execute_kw',
                        args: [
                            ODOO_CONFIG.DATABASE,
                            parseInt(userToken),
                            ODOO_CONFIG.PASSWORD,
                            'vpn.payment.gateway',
                            'initiate_payment',
                            [result.result]
                        ]
                    },
                    id: Math.floor(Math.random() * 1000000)
                };

                const initiateResponse = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(initiatePaymentPayload)
                });

                const initiateResult = await initiateResponse.json();

                if (initiateResult.result) {
                    // Set payment URL for WebView
                    setPaymentUrl(initiateResult.result);
                } else {
                    // Payment initiation failed
                    Alert.alert(
                        'Payment Failed',
                        'Unable to initiate payment. Please try again.',
                        [{ text: 'OK' }]
                    );
                }
            } else {
                // Payment creation failed
                Alert.alert(
                    'Payment Failed',
                    result.error?.message || 'Unable to create payment. Please try again.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            Alert.alert(
                'Error',
                'An unexpected error occurred. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
        }
    };

    // Handle WebView navigation state
    const handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        
        // Check for successful or cancelled payment URLs
        if (url.includes('/payment/callback')) {
            // Payment successful, navigate to confirmation screen
            navigation.navigate('PaymentConfirmation', {
                plan: plan,
                amount: amount
            });
        } else if (url.includes('/payment/cancel')) {
            // Payment cancelled
            Alert.alert(
                'Payment Cancelled',
                'You have cancelled the payment process.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }
    };

    // Render payment methods or WebView
    if (paymentUrl) {
        return (
            <WebView
                source={{ uri: paymentUrl }}
                style={styles.webview}
                onNavigationStateChange={handleWebViewNavigationStateChange}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back"
                    size={28}
                    color="#111827"
                    onPress={() => navigation.goBack()}
                />
                <Text h4 style={styles.headerTitle}>Payment</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.content}>
                {/* Plan Summary Card */}
                <Card containerStyle={styles.planSummary}>
                    <Text style={styles.summaryTitle}>Plan Details</Text>
                    <View style={styles.planDetails}>
                        <Text style={styles.planName}>{plan} Plan</Text>
                        <Text style={styles.planPrice}>${amount.toFixed(2)}</Text>
                    </View>
                </Card>

                {/* Payment Method Selection */}
                <Text style={styles.sectionTitle}>Select Payment Gateway</Text>
                <View style={styles.paymentMethodContainer}>
                    {paymentMethods.map((method) => (
                        <Button
                            key={method.id}
                            title={method.name}
                            icon={<Icon name={method.icon} color={paymentMethod === method.id ? '#fff' : '#4F46E5'} />}
                            type={paymentMethod === method.id ? 'solid' : 'outline'}
                            buttonStyle={[
                                styles.paymentMethodButton,
                                paymentMethod === method.id && styles.selectedPaymentMethod
                            ]}
                            onPress={() => setPaymentMethod(method.id)}
                        />
                    ))}
                </View>

                {/* Pay Button */}
                <Button
                    title={loading ? "Processing..." : `Pay ${amount.toFixed(2)}`}
                    buttonStyle={styles.payButton}
                    onPress={initiatePayment}
                    loading={loading}
                    disabled={loading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    headerTitle: {
        color: '#111827',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    planSummary: {
        borderRadius: 12,
        marginBottom: 24,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    planDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    planName: {
        fontSize: 16,
        color: '#4F46E5',
        fontWeight: '600',
    },
    planPrice: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
        marginTop: 8,
    },
    paymentMethods: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    methodButtonContainer: {
        flex: 1,
        marginHorizontal: 4,
    },
    methodButton: {
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
    },
    methodButtonText: {
        color: '#111827',
        fontSize: 14,
        marginLeft: 8,
    },
    cardDetailsContainer: {
        borderRadius: 12,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        flex: 1,
    },
    confirmButton: {
        backgroundColor: '#4F46E5',
        height: 56,
        borderRadius: 12,
    },
    confirmButtonContainer: {
        marginTop: 24,
        marginBottom: 32,
    },
    selectedMethodButton: {
        backgroundColor: '#4F46E5',
    },
    selectedMethodText: {
        color: '#fff',
    },
    webview: {
        flex: 1,
    },
});