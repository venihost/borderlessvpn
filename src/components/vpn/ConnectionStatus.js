import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { Text, Icon } from 'react-native-elements';

const ConnectionStatus = ({ isConnected, onToggle, serverName = 'Not Selected' }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.statusCircle, isConnected ? styles.connected : styles.disconnected]}>
        <TouchableOpacity onPress={onToggle} style={styles.powerButton}>
          <Icon
            name="power-settings-new"
            size={50}
            color={isConnected ? '#4CAF50' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.statusText}>
        {isConnected ? 'Connected' : 'Not Connected'}
      </Text>
      
      <View style={styles.serverInfo}>
        <Icon name="public" color="#4F46E5" size={20} />
        <Text style={styles.serverText}>{serverName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  serverText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ConnectionStatus;
