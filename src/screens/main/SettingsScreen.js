import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Icon, Text, Switch, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [autoConnect, setAutoConnect] = React.useState(false);
  const [killSwitch, setKillSwitch] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const settingsSections = [
    {
      title: 'VPN Settings',
      items: [
        {
          title: 'Auto-Connect',
          subtitle: 'Connect VPN automatically on startup',
          icon: 'wifi',
          switch: {
            value: autoConnect,
            onValueChange: setAutoConnect,
          },
        },
        {
          title: 'Kill Switch',
          subtitle: 'Block internet when VPN disconnects',
          icon: 'security',
          switch: {
            value: killSwitch,
            onValueChange: setKillSwitch,
          },
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          title: 'Notifications',
          subtitle: 'Enable push notifications',
          icon: 'notifications',
          switch: {
            value: notifications,
            onValueChange: setNotifications,
          },
        },
        {
          title: 'App Version',
          subtitle: 'Version 1.0.0',
          icon: 'info',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Subscription Plan',
          subtitle: 'Premium Plan',
          icon: 'star',
          chevron: true,
          onPress: () => navigation.navigate('Subscription'),
        },
        {
          title: 'Change Password',
          subtitle: 'Update your password',
          icon: 'lock',
          chevron: true,
          onPress: () => navigation.navigate('ChangePassword'),
        },
      ],
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
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          color="#111827"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text h4 style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <ListItem
                key={item.title}
                containerStyle={styles.listItem}
                bottomDivider={itemIndex !== section.items.length - 1}
              >
                <Icon name={item.icon} color="#4F46E5" />
                <ListItem.Content>
                  <ListItem.Title style={styles.itemTitle}>
                    {item.title}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.itemSubtitle}>
                    {item.subtitle}
                  </ListItem.Subtitle>
                </ListItem.Content>
                {item.switch && (
                  <Switch
                    value={item.switch.value}
                    onValueChange={item.switch.onValueChange}
                    trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
                  />
                )}
                {item.chevron && <ListItem.Chevron />}
              </ListItem>
            ))}
          </View>
        ))}

        <Button
          title="Sign Out"
          type="outline"
          containerStyle={styles.signOutContainer}
          buttonStyle={styles.signOutButton}
          titleStyle={styles.signOutTitle}
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
    fontWeight: '600',
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  listItem: {
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  itemTitle: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  signOutContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  signOutButton: {
    borderColor: '#EF4444',
    borderWidth: 1,
    height: 56,
    borderRadius: 12,
  },
  signOutTitle: {
    color: '#EF4444',
  },
});
