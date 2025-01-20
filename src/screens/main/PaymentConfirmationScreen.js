import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';

export default function PaymentConfirmationScreen({ navigation, route }) {
    const { plan, amount, transactionId } = route.params;

    return (
        <View style={styles.container}>
            <Icon
                name="check-circle"
                type="material"
                size={80}
                color="#4CAF50"
            />
            <Text h4 style={styles.title}>Payment Successful!</Text>
            <Text style={styles.details}>
                Your {plan} Plan subscription has been activated.
            </Text>
            <Text style={styles.amount}>Amount paid: ${amount}</Text>
            <Text style={styles.transactionId}>Transaction ID: {transactionId}</Text>
            <Button
                title="Done"
                onPress={() => navigation.navigate('Home')}
                buttonStyle={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        marginTop: 20,
        marginBottom: 10
    },
    details: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    transactionId: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30
    },
    button: {
        paddingHorizontal: 40,
        borderRadius: 25
    }
});
