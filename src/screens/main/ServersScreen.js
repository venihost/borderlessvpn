import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Icon, Text, Button, SearchBar } from 'react-native-elements';
import { vpnService } from '../../services/vpn/openVpnService';
import { useVpnStore } from '../../store/vpnState';
import { OdooApi } from '../../constants/odooapi2';

export default function ServersScreen({ navigation }) {
  const [servers, setServers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedServer, setSelectedServer] = useState(null);
  const { isConnected, connect, disconnect } = useVpnStore();
  const odooApi = new OdooApi();

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      await odooApi.authenticate();
      const params = {
        domain: [],
        fields: ['name', 'country', 'city', 'load', 'ping', 'country_code']
      };
      const result = await odooApi.searchRead('vpn.server', params);
      setServers(result || []);
    } catch (error) {
      console.error('Failed to fetch servers:', error.message);
    }
  };

  const handleConnect = async () => {
    if (!selectedServer) return;
    try {
      await connect(selectedServer.id);
      navigation.goBack();
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const getLoadColor = (load) => {
    if (load < 50) return '#4CAF50';
    if (load < 80) return '#FFC107';
    return '#F44336';
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
        <Text h4 style={styles.headerTitle}>Select Server</Text>
        <View style={styles.headerRight} />
      </View>

      <SearchBar
        placeholder="Search servers..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme
        round
      />

      <ScrollView style={styles.serverList}>
        {servers.map((server, index) => (
          <ListItem
            key={index}
            containerStyle={[
              styles.serverItem,
              selectedServer === index && styles.selectedServer,
            ]}
            onPress={() => setSelectedServer(index)}
          >
            <Icon
              name={`flag-${server.country_code.toLowerCase()}`}
              type="material-community"
              size={24}
              color="#4F46E5"
            />
            <ListItem.Content>
              <ListItem.Title style={styles.serverTitle}>
                {server.country}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.serverSubtitle}>
                {server.city}
              </ListItem.Subtitle>
            </ListItem.Content>
            <View style={styles.serverStats}>
              <Text style={styles.pingText}>{server.ping}ms</Text>
              <View style={styles.loadContainer}>
                <View 
                  style={[
                    styles.loadBar,
                    { backgroundColor: getLoadColor(server.load), width: `${server.load}%` }
                  ]}
                />
              </View>
            </View>
          </ListItem>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Connect"
          disabled={selectedServer === null}
          buttonStyle={styles.connectButton}
          containerStyle={styles.connectButtonContainer}
          onPress={handleConnect}
        />
      </View>
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
  searchContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: '#F3F4F6',
  },
  serverList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  serverItem: {
    marginVertical: 4,
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
  },
  loadBar: {
    height: '100%',
    borderRadius: 2,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  connectButton: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 12,
  },
  connectButtonContainer: {
    width: '100%',
  },
});
