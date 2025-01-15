import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Icon, Text, Switch } from 'react-native-elements';

const AppSettings = () => {
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settings = [
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
      title: 'App Preferences',
      items: [
        {
          title: 'Push Notifications',
          subtitle: 'Get important updates and alerts',
          icon: 'notifications',
          switch: {
            value: notifications,
            onValueChange: setNotifications,
          },
        },
        {
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark themes',
          icon: 'brightness-6',
          switch: {
            value: darkMode,
            onValueChange: setDarkMode,
          },
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {settings.map((section, sectionIndex) => (
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
              <Switch
                value={item.switch.value}
                onValueChange={item.switch.onValueChange}
                trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
              />
            </ListItem>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
});

export default AppSettings;
