import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, Button, Icon, Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ODOO_CONFIG } from '../../constants/odooapi2';

export default function SubscriptionScreen({ navigation }) {
    const [plans, setPlans] = useState([
        {
            id: 'basic',
            name: 'Basic',
            price: 100.00,
            duration: 'month',
            dataLimit: 100,
            allowedDevices: 2,
            features: [
                'Access to all servers',
                '100GB monthly data',
                'Connect 2 devices',
                'Standard speed'
            ],
            recommended: false,
            color: ['#4F46E5', '#818CF8']
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 250.00,
            duration: 'month',
            dataLimit: 500,
            allowedDevices: 5,
            features: [
                'Access to all servers',
                '500GB monthly data',
                'Connect 5 devices',
                'Ultra-fast speed',
                'Priority support'
            ],
            recommended: true,
            color: ['#4F46E5', '#6366F1']
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 500.00,
            duration: 'month',
            dataLimit: 1000,
            allowedDevices: 10,
            features: [
                'Access to all servers',
                '1TB monthly data',
                'Connect 10 devices',
                'Ultra-fast speed',
                'Priority support',
                'Dedicated IP',
                'Enterprise controls'
            ],
            recommended: false,
            color: ['#4338CA', '#4F46E5']
        }
    ]);

    const handleSubscription = async (plan) => {
        try {
            // Get user ID and token from AsyncStorage
            const userId = await AsyncStorage.getItem('userId');
            const userToken = await AsyncStorage.getItem('userToken');

            // Authenticate first
            const authResponse = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        service: 'common',
                        method: 'authenticate',
                        args: [
                            ODOO_CONFIG.DATABASE,
                            ODOO_CONFIG.USERNAME,
                            ODOO_CONFIG.PASSWORD,
                            {}
                        ]
                    },
                    id: Math.floor(Math.random() * 1000000)
                })
            });

            const authResult = await authResponse.json();
            const adminUid = authResult.result;

            if (!adminUid) {
                throw new Error('Authentication failed');
            }

            // Create subscription
            const subscriptionResponse = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        service: 'object',
                        method: 'execute_kw',
                        args: [
                            ODOO_CONFIG.DATABASE,
                            adminUid,
                            ODOO_CONFIG.PASSWORD,
                            'vpn.subscription',
                            'create',
                            [{
                                user_id: parseInt(userId),
                                plan_type: plan.id,
                                start_date: new Date().toISOString().split('T')[0],
                                expiry_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
                                state: 'draft'
                            }]
                        ]
                    },
                    id: Math.floor(Math.random() * 1000000)
                })
            });

            const subscriptionResult = await subscriptionResponse.json();

            if (subscriptionResult.result) {
                // Navigate to Payment Screen
                navigation.navigate('Payment', {
                    plan: plan.name,
                    subscriptionId: subscriptionResult.result,
                    amount: plan.price
                });
            } else {
                // Handle error in subscription creation
                Alert.alert(
                    'Subscription Error', 
                    'Failed to create subscription. Please try again.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Subscription creation error:', error);
            Alert.alert(
                'Error', 
                'An error occurred while creating subscription',
                [{ text: 'OK' }]
            );
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
                <Text h4 style={styles.headerTitle}>Subscription Plans</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.subtitle}>Choose the perfect plan for you</Text>

                {plans.map((plan) => (
                    <Card key={plan.id} containerStyle={styles.planCard}>
                        {plan.recommended && (
                            <View style={styles.recommendedBadge}>
                                <Text style={styles.recommendedText}>Recommended</Text>
                            </View>
                        )}
                        <LinearGradient
                            colors={plan.color}
                            style={styles.planHeader}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.planName}>{plan.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>${plan.price.toFixed(2)}</Text>
                                <Text style={styles.duration}>/{plan.duration}</Text>
                            </View>
                        </LinearGradient>

                        <View style={styles.featuresContainer}>
                            {plan.features.map((feature, index) => (
                                <View key={index} style={styles.featureItem}>
                                    <Icon
                                        name="check-circle"
                                        color="#4F46E5"
                                        size={20}
                                        style={styles.featureIcon}
                                    />
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        <Button
                            title={plan.recommended ? "Get Premium" : "Select Plan"}
                            buttonStyle={[
                                styles.selectButton,
                                plan.recommended && styles.recommendedButton,
                            ]}
                            titleStyle={styles.buttonTitle}
                            onPress={() => handleSubscription(plan)}
                        />
                    </Card>
                ))}
            </ScrollView>
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
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 20,
        textAlign: 'center',
    },
    planCard: {
        borderRadius: 12,
        padding: 0,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 0,
    },
    recommendedBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#4F46E5',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 1,
    },
    recommendedText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    planHeader: {
        padding: 20,
    },
    planName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 8,
    },
    price: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    duration: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        marginLeft: 4,
    },
    featuresContainer: {
        padding: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureIcon: {
        marginRight: 12,
    },
    featureText: {
        fontSize: 16,
        color: '#374151',
    },
    selectButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#4F46E5',
    },
    recommendedButton: {
        backgroundColor: '#4338CA',
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});