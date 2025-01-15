import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Input, Button, Icon, Avatar, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ODOO_CONFIG } from '../../constants/odooapi2';

export default function EditProfileScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    image: null
  });
  const [loading, setLoading] = useState(true);

  // Fetch current user data
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
                  fields: ['name', 'email', 'phone', 'country_id', 'image_1920'] 
                }
              ]
            },
            id: Math.floor(Math.random() * 1000000)
          })
        });

        const userDataResult = await userDataResponse.json();

        if (userDataResult.result && userDataResult.result[0]) {
          const userData = userDataResult.result[0];
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            country: userData.country_id ? userData.country_id[1] : '',
            image: userData.image_1920 ? `data:image/png;base64,${userData.image_1920}` : null
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        image: `data:image/png;base64,${result.assets[0].base64}`
      }));
    }
  };
  // Update profile
  const handleUpdateProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      
      // Authenticate using admin credentials
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
              ODOO_CONFIG.USERNAME, // Use admin username
              ODOO_CONFIG.PASSWORD, // Use admin password
              {}
            ]
          },
          id: Math.floor(Math.random() * 1000000)
        })
      });

      const authResult = await authResponse.json();
      const adminUid = authResult.result;

      if (!adminUid) {
        throw new Error('Admin Authentication failed');
      }

      // Update profile using admin authentication
      const updateResponse = await fetch(`${ODOO_CONFIG.HOST}:${ODOO_CONFIG.PORT}${ODOO_CONFIG.JSONRPC_PATH}`, {
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
              'res.users',
              'write',
              [[parseInt(userId)], {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                image_1920: formData.image ? formData.image.split(',')[1] : null
              }]
            ]
          },
          id: Math.floor(Math.random() * 1000000)
        })
      });

      const updateResult = await updateResponse.json();

      console.log('Full Update Response:', JSON.stringify(updateResult, null, 2));

      if (updateResult.result) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        // Extract and display more detailed error information
        const errorMessage = updateResult.error?.data?.message || 
                             updateResult.error?.message || 
                             'Unknown error occurred';
        
        Alert.alert(
          'Update Failed', 
          `Unable to update profile: ${errorMessage}`,
          [
            { 
              text: 'OK', 
              onPress: () => console.log('Detailed Error:', updateResult.error)
            }
          ]
        );
      }
    } catch (error) {
      console.error('Complete Update Profile Error:', error);
      Alert.alert(
        'Error', 
        `Failed to update profile: ${error.message}`,
        [
          { 
            text: 'OK', 
            onPress: () => console.log('Full Error Object:', error)
          }
        ]
      );
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
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
        <Text h4 style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={100}
            rounded
            source={formData.image ? { uri: formData.image } : { uri: 'https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff' }}
            containerStyle={styles.avatar}
          >
            <Avatar.Accessory size={30} onPress={pickImage} />
          </Avatar>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
            leftIcon={<Icon name="person" color="#6B7280" />}
            containerStyle={styles.inputContainer}
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
            leftIcon={<Icon name="email" color="#6B7280" />}
            containerStyle={styles.inputContainer}
            keyboardType="email-address"
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChangeText={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            leftIcon={<Icon name="phone" color="#6B7280" />}
            containerStyle={styles.inputContainer}
            keyboardType="phone-pad"
          />

          <Input
            label="Country"
            value={formData.country}
            onChangeText={(value) => setFormData(prev => ({ ...prev, country: value }))}
            leftIcon={<Icon name="location-on" color="#6B7280" />}
            containerStyle={styles.inputContainer}
          />
        </View>

        <Button
          title="Save Changes"
          buttonStyle={styles.saveButton}
          containerStyle={styles.buttonContainer}
          onPress={handleUpdateProfile}
        />

        <Button
          title="Cancel"
          type="outline"
          buttonStyle={styles.cancelButton}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.cancelButtonText}
          onPress={() => navigation.goBack()}
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
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    borderWidth: 4,
    borderColor: '#fff',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 12,
  },
  cancelButton: {
    borderColor: '#4F46E5',
    height: 56,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#4F46E5',
  },
  buttonContainer: {
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
