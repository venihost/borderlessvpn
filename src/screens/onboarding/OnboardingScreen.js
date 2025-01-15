import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Animated } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Secure Connection',
    description: 'Browse securely with military-grade encryption',
    icon: 'security',
  },
  {
    id: '2',
    title: 'Global Access',
    description: 'Connect to servers worldwide for unrestricted access',
    icon: 'public',
  },
  {
    id: '3',
    title: 'Lightning Fast',
    description: 'Experience high-speed VPN connections',
    icon: 'flash-on',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <MaterialIcons name={item.icon} size={100} color="#4F46E5" />
        <Text h3 style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={32}
      />
      <View style={styles.footer}>
        <Pagination />
        {currentIndex === 2 && (
          <Button
            title="Get Started"
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => navigation.replace('Login')}
            raised
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#111827',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
    marginHorizontal: 4,
  },
  buttonContainer: {
    width: '90%',
    marginBottom: 40,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 12,
  },
  footer: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 12,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
