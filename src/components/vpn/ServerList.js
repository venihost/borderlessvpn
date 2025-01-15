import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Icon, Text } from 'react-native-elements';

const servers = [
  {
    id: '1',
    country: 'United States',
    city: 'New York',
    ping: 45,
    load: 65,
    flag: 'us',
  },
  {
    id: '2',
    country: 'United Kingdom',
    city: 'London',
    ping: 75,
    load: 45,
    flag: 'gb',
  },
  {
    id: '3',
    country: 'Japan',
    city: 'Tokyo',
    ping: 120,
    load: 30,
    flag: 'jp',
  },
];

const ServerList = ({ onSelectServer, selectedServer }) => {
  const getLoadColor = (load) => {
    if (load < 50) return '#4CAF50';
    if (load < 80) return '#FFC107';
    return '#F44336';
  };

  const renderServer = ({ item }) => (
    <ListItem
      containerStyle={[
        styles.serverItem,
        selectedServer?.id === item.id && styles.selectedServer,
      ]}
      onPress={() => onSelectServer(item)}
    >
      <Icon
        name={`flag-${item.flag}`}
        type="material-community"
        size={24}
        color="#4F46E5"
      />
      <ListItem.Content>
        <ListItem.Title style={styles.serverTitle}>{item.country}</ListItem.Title>
        <ListItem.Subtitle style={styles.serverSubtitle}>{item.city}</ListItem.Subtitle>
      </ListItem.Content>
      <View style={styles.serverStats}>
        <Text style={styles.pingText}>{item.ping}ms</Text>
        <View style={styles.loadContainer}>
          <View 
            style={[
              styles.loadBar,
              { backgroundColor: getLoadColor(item.load), width: `${item.load}%` }
            ]}
          />
        </View>
      </View>
    </ListItem>
  );

  return (
    <FlatList
      data={servers}
      renderItem={renderServer}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  serverItem: {
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  selectedServer: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
    borderWidth: 1,
  },
  serverTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  serverSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  serverStats: {
    alignItems: 'flex-end',
  },
  pingText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  loadContainer: {
    width: 50,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadBar: {
    height: '100%',
    borderRadius: 2,
  },
});

export default ServerList;
