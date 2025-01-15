import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Icon, Text } from 'react-native-elements';

const ProfileSettings = () => {
  const profileItems = [
    {
      title: 'Account Details',
      items: [
        {
          title: 'Email',
          subtitle: 'user@example.com',
          icon: 'email',
        },
        {
          title: 'Subscription',
          subtitle: 'Premium Plan',
          icon: 'star',
        },
        {
          title: 'Change Password',
          subtitle: 'Last changed 30 days ago',
          icon: 'lock',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          title: 'Two-Factor Authentication',
          subtitle: 'Enable extra security',
          icon: 'security',
        },
        {
          title: 'Active Sessions',
          subtitle: 'Manage your devices',
          icon: 'devices',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar
          size={80}
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          containerStyle={styles.avatar}
        />
        <Text h4 style={styles.name}>John Doe</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {profileItems.map((section, sectionIndex) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <ListItem
              key={item.title}
              containerStyle={styles.listItem}
              bottomDivider={itemIndex !== section.items.length - 1}
              onPress={() => {}}
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
              <ListItem.Chevron />
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
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: 12,
  },
  name: {
    color: '#111827',
    marginBottom: 8,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
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

export default ProfileSettings;
