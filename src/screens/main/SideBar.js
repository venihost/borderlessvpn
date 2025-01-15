import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Icon, Text, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ODOO_CONFIG } from '../../constants/odooapi2';

const menuItems = [
  {
    title: 'Home',
    icon: 'home',
    route: 'Home'
  },
  {
    title: 'Servers',
    icon: 'public',
    route: 'Servers'
  },
  {
    title: 'Settings',
    icon: 'settings',
    route: 'Settings'
  },
  {
    title: 'Profile',
    icon: 'person',
    route: 'Profile'
  },
  {
    title: 'Help & Support',
    icon: 'help',
    route: 'Support'
  }
];

const SideBar = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');

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
              ODOO_CONFIG.USERNAME,
              ODOO_CONFIG.PASSWORD,
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
                authResult.result,
                ODOO_CONFIG.PASSWORD,
                'res.users',
                'search_read',
                [[['id', '=', parseInt(userId)]]],
                { 
                  fields: ['name', 'email', 'image_1920', 'login'] 
                }
              ]
            },
            id: Math.floor(Math.random() * 1000000)
          })
        });

        const userDataResult = await userDataResponse.json();
        console.log('Sidebar User Data:', userDataResult);

        if (userDataResult.result && userDataResult.result[0]) {
          setUserData(userDataResult.result[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userId', 'userData']);
      navigation.navigate('Auth', { screen: 'Login' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size={64}
          rounded
          source={userData?.image_1920 ? 
            { uri: `data:image/png;base64,${userData.image_1920}` } : 
            { uri: 'https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff' }
          }
        />
        <Text h4 style={styles.userName}>{userData?.name || 'Loading...'}</Text>
        <Text style={styles.userEmail}>{userData?.email || userData?.login || ''}</Text>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onPress={() => navigation.navigate(item.route)}
            containerStyle={styles.menuItem}
          >
            <Icon name={item.icon} color="#4F46E5" />
            <ListItem.Content>
              <ListItem.Title style={styles.menuTitle}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ScrollView>

      <ListItem
        onPress={handleLogout}
        containerStyle={styles.logoutButton}
      >
        <Icon name="logout" color="#EF4444" />
        <ListItem.Content>
          <ListItem.Title style={styles.logoutText}>Logout</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
  },
  userName: {
    color: '#fff',
    marginTop: 10,
  },
  userEmail: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: '#111827',
  },
  logoutButton: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  logoutText: {
    color: '#EF4444',
  },
});

export default SideBar;