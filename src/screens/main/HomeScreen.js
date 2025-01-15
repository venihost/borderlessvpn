
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';


export default function HomeScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#0d47a1']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Icon
          name="menu"
          size={28}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.title}>BorderlessVPN</Text>
        <Icon
          name="settings"
          size={28}
          color="white"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusCircle, isConnected ? styles.connected : styles.disconnected]}>
          <TouchableOpacity onPress={toggleConnection} style={styles.powerButton}>
            <MaterialIcons
              name="power-settings-new"
              size={50}
              color={isConnected ? '#4CAF50' : '#fff'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.statusText}>
          {isConnected ? 'Connected' : 'Not Connected'}
        </Text>
      </View>


      <TouchableOpacity
        style={styles.serverCard}
        onPress={() => navigation.navigate('Servers')}
      >
        <MaterialIcons name="public" size={24} color="white" />
        <Text style={styles.serverLocation}>Select Server</Text>
        <MaterialIcons name="chevron-right" size={24} color="white" />
      </TouchableOpacity>


      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Download</Text>
          <Text style={styles.statValue}>120 Mbps</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Upload</Text>
          <Text style={styles.statValue}>85 Mbps</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  statusCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 15,
  },
  connected: {
    borderColor: '#4CAF50',
  },
  disconnected: {
    borderColor: '#ffffff',
  },
  powerButton: {
    padding: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    fontWeight: '600',
  },
  serverInfo: {
    marginTop: 40,
  },
  serverText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  serverCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serverLocation: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  pingText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  statItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    flex: 0.47,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  statValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
