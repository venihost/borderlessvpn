import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { Avatar, Text, Button, ListItem, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ODOO_CONFIG } from '../../constants/odooapi2';

export default function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userToken = await AsyncStorage.getItem('userToken');
            const userPassword = await AsyncStorage.getItem('userPassword'); // You'll need to store password during login

            const response = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
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
                            ODOO_CONFIG.USERNAME, // Use admin credentials
                            ODOO_CONFIG.PASSWORD, // Use admin password
                            {}
                        ]
                    },
                    id: Math.floor(Math.random() * 1000000)
                })
            });

            const authResult = await response.json();

            if (authResult.result) {
                // Authenticated, now fetch user data
                const userDataResponse = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
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
                                authResult.result, // Use admin UID
                                ODOO_CONFIG.PASSWORD,
                                'res.users',
                                'search_read',
                                [[['id', '=', parseInt(userId)]]],
                                {
                                    fields: ['name', 'email', 'image_1920', 'create_date', 'login']
                                }
                            ]
                        },
                        id: Math.floor(Math.random() * 1000000)
                    })
                });

                const userDataResult = await userDataResponse.json();
                console.log('Full User Data Response:', userDataResult);

                if (userDataResult.result && userDataResult.result[0]) {
                    setUserData(userDataResult.result[0]);
                    setLoading(false);
                } else {
                    console.error('No user data found');
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const menuItems = [
        {
            title: 'Account Settings',
            icon: 'person-outline',
            onPress: () => navigation.navigate('Settings'),
        },
        {
            title: 'Subscription Plan',
            icon: 'star-outline',
            onPress: () => navigation.navigate('Subscription'),
        },
        {
            title: 'Data Usage',
            icon: 'data-usage',
            onPress: () => navigation.navigate('DataUsage'),
        },
        {
            title: 'Security',
            icon: 'security',
            onPress: () => navigation.navigate('Security'),
        },
        {
            title: 'Help & Support',
            icon: 'help-outline',
            onPress: () => navigation.navigate('Support'),
        },
    ];

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            navigation.navigate('Auth', { screen: 'Login' });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['#4F46E5', '#1E1B4B']}
                style={styles.header}
            >
                <Avatar
                    size={100}
                    rounded
                    source={userData?.image_1920 ?
                        { uri: `data:image/png;base64,${userData.image_1920}` } :
                        { uri: 'https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff' }
                    }
                    containerStyle={styles.avatar}
                >
                    <Avatar.Accessory
                        size={30}
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                </Avatar>
                <Text h3 style={styles.name}>{userData?.name || 'User'}</Text>
                <Text style={styles.email}>{userData?.email || 'No email'}</Text>
                <View style={styles.planBadge}>
                    <Icon name="star" color="#FFD700" size={16} />
                    <Text style={styles.planText}>Premium</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {new Date(userData?.create_date).toLocaleDateString()}
                        </Text>
                        <Text style={styles.statLabel}>Member Since</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            onPress={item.onPress}
                            containerStyle={styles.menuItem}
                            bottomDivider
                        >
                            <Icon name={item.icon} color="#4F46E5" />
                            <ListItem.Content>
                                <ListItem.Title style={styles.menuTitle}>
                                    {item.title}
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))}
                </View>

                <Button
                    title="Sign Out"
                    type="outline"
                    containerStyle={styles.signOutButton}
                    titleStyle={styles.signOutButtonText}
                    onPress={handleLogout}
                />
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
        padding: 20,
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 30,
    },
    avatar: {
        borderWidth: 4,
        borderColor: '#fff',
    },
    name: {
        color: '#fff',
        marginTop: 15,
        marginBottom: 5,
    },
    email: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
    },
    planBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 10,
    },
    planText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
        borderRadius: 20,
        marginHorizontal: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 20,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    statLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        paddingVertical: 15,
    },
    menuTitle: {
        fontSize: 16,
        color: '#111827',
    },
    signOutButton: {
        marginHorizontal: 20,
        marginVertical: 30,
    },
    signOutButtonText: {
        color: '#EF4444',
    },
});