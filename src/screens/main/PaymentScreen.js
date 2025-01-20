import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text, Button, Icon, Card } from 'react-native-elements';
import { ODOO_CONFIG } from '../../constants/odooapi2';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PaymentScreen({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('flutterwave');
    const { plan, subscriptionId, amount } = route.params;

    const paymentMethods = [
        { id: 'flutterwave', name: 'Flutterwave', icon: 'payment' },
        { id: 'paystack', name: 'Paystack', icon: 'credit-card' },
        { id: 'paypal', name: 'PayPal', icon: 'account-balance' }
    ];

    const initiatePayment = async () => {
        setLoading(true);
        try {
            const userId = await AsyncStorage.getItem('userId');
        
            const paymentPayload = {
                jsonrpc: '2.0',
                method: 'call',
                params: {
                    service: 'object',
                    method: 'execute_kw',
                    args: [
                        ODOO_CONFIG.DATABASE,
                        2,  // Admin user ID
                        'password',  // Admin password
                        'vpn.payment.gateway',
                        'create',
                        [{
                            subscription_id: parseInt(subscriptionId),
                            amount: amount.toString(),
                            currency_id: 2,
                            gateway_provider: paymentMethod,
                            payment_method: 'card',
                            payment_status: 'pending',
                            state: 'draft',
                            user_id: parseInt(userId)
                        }],
                        {context: {lang: 'en_US', tz: 'UTC', uid: 2}}
                    ]
                }
            };

            const response = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}/jsonrpc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentPayload)
            });

            const result = await response.json();
        
            if (result.result) {
                navigation.navigate('ProcessPayment', {
                    paymentId: result.result,
                    provider: paymentMethod,
                    amount: amount,
                    plan: plan
                });
            }
        } catch (error) {
            Alert.alert('Payment Failed', 'Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                <Card containerStyle={styles.planSummary}>
                    <Text style={styles.summaryTitle}>Plan Details</Text>
                    <View style={styles.planDetails}>
                        <Text style={styles.planName}>{plan} Plan</Text>
                        <Text style={styles.planPrice}>${amount.toFixed(2)}</Text>
                    </View>
                </Card>

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