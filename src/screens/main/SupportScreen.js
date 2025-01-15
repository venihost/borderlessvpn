import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Icon, Text, Button } from 'react-native-elements';

const supportItems = [
  {
    title: 'FAQs',
    icon: 'question-answer',
    description: 'Find answers to common questions',
    route: 'Faqs'
  },
  {
    title: 'Contact Support',
    icon: 'headset-mic',
    description: 'Get help from our support team',
    route: 'Contact'
  },
  {
    title: 'User Guide',
    icon: 'menu-book',
    description: 'Learn how to use BorderlessVPN',
    route: 'Guide'
  },
  {
    title: 'Report Issue',
    icon: 'bug-report',
    description: 'Report technical problems',
    route: 'Report'
  }
];

export default function SupportScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="menu"
          size={28}
          color="#111827"
          onPress={() => navigation.openDrawer()}
        />
        <Text h4 style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>How can we help you?</Text>

        {supportItems.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={styles.supportItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <Icon name={item.icon} color="#4F46E5" size={24} />
            <ListItem.Content>
              <ListItem.Title style={styles.itemTitle}>{item.title}</ListItem.Title>
              <ListItem.Subtitle style={styles.itemSubtitle}>
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need immediate assistance?</Text>
          <Button
            title="Live Chat"
            icon={
              <Icon
                name="chat"
                size={20}
                color="white"
                style={{ marginRight: 10 }}
              />
            }
            buttonStyle={styles.chatButton}
            containerStyle={styles.buttonContainer}
          />
          <Button
            title="Email Support"
            icon={
              <Icon
                name="email"
                size={20}
                color="#4F46E5"
                style={{ marginRight: 10 }}
              />
            }
            type="outline"
            buttonStyle={styles.emailButton}
            containerStyle={styles.buttonContainer}
            titleStyle={{ color: '#4F46E5' }}
          />
        </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  supportItem: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  contactSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 12,
  },
  chatButton: {
    backgroundColor: '#4F46E5',
    height: 48,
    borderRadius: 8,
  },
  emailButton: {
    borderColor: '#4F46E5',
    height: 48,
    borderRadius: 8,
  },
});
