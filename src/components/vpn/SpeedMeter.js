import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text } from 'react-native-elements';

const SpeedMeter = ({ downloadSpeed = 0, uploadSpeed = 0 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.speedContainer}>
        <View style={styles.speedBox}>
          <Text style={styles.speedLabel}>Download</Text>
          <Text style={styles.speedValue}>{downloadSpeed} Mbps</Text>
          <View style={styles.meter}>
            <Animated.View 
              style={[
                styles.meterFill, 
                { width: `${Math.min((downloadSpeed / 100) * 100, 100)}%` }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.speedBox}>
          <Text style={styles.speedLabel}>Upload</Text>
          <Text style={styles.speedValue}>{uploadSpeed} Mbps</Text>
          <View style={styles.meter}>
            <Animated.View 
              style={[
                styles.meterFill, 
                { width: `${Math.min((uploadSpeed / 100) * 100, 100)}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  speedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedBox: {
    flex: 1,
    marginHorizontal: 8,
  },
  speedLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  speedValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  meter: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
});

export default SpeedMeter;
