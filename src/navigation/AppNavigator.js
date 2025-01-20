import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SideBar from '../screens/main/SideBar';
import HomeScreen from '../screens/main/HomeScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import ServersScreen from '../screens/main/ServersScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SupportScreen from '../screens/main/SupportScreen';
import SubscriptionScreen from '../screens/main/SubscriptionScreen';
import PaymentScreen from '../screens/main/PaymentScreen';
import PaymentConfirmationScreen from '../screens/main/PaymentConfirmationScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import WelcomeScreen from '../screens/main/WelcomeScreen';
import ChangePasswordScreen from '../screens/main/ChangePasswordScreen';
import ProcessPaymentScreen from '../screens/main/ProcessPaymentScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Servers" component={ServersScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="Subscription" component={SubscriptionScreen} />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="ProcessPayment" component={ProcessPaymentScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}