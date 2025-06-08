import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
const { width: screenWidth } = Dimensions.get('window');

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
const logo = require('../assets/images/logo.png');
const splashbanner = require('../assets/images/splashbanner.png');
  // Sample data - replace with your actual content
  const data = [
   {
    id: 1,
    title: 'All Your Health Needs',
    content: 'Ambulance, Home Care Nurse, Physiotherapist, lab Tests, 24-hour pharmacy, Hospital Services, Speciality Clinics and Funeral Services ',
    images: splashbanner,
  },
  {
    id: 2,
    title: 'Features',
    content: 'Discover amazing features',
    images: null,
  },
  {
    id: 3,
    title: 'Get Started',
    content: 'Ready to begin your journey',
    images: null,
  },
];
const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  const handleSkip = () => {
    // Go to next slide step by step
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < data.length) {
      // Move to next slide
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      // If on last slide, navigate to main app
      console.log('Navigate to main app');
      // Add your navigation logic here:
      // router.push('/main');
      // navigation.navigate('MainScreen');
    }
  };

  const renderPagination = () => {
    return (
      <View className="flex-row justify-center items-center py-8">
        {data.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentIndex
                ? 'bg-[#7518AA] w-2.5 h-2.5 rounded-[50%]'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    );
  };

  const renderSkipButton = () => {
    const isLastSlide = currentIndex === data.length - 1;
    
    return (
        isLastSlide ? null: (
    <TouchableOpacity
      className="w-[fit-content] absolute top-5 right-5 z-10 flex flex-row items-center gap-[0px] rounded-[10px]"
      onPress={handleSkip}
      activeOpacity={0.7}
    >
      <Text className="text-gray-800 text-[14px] font-medium">
        Skip
      </Text>

      <MaterialIcons name="skip-next" size={28} color="#000000" />
    </TouchableOpacity>
  ) 
    );
  };

  return (

    <>
    <SafeAreaView className="flex-1 bg-white" 
        style={{ backgroundColor: 'white' }}
        edges={['top', 'left', 'right']}>


      {/* Skip Button - Top Right */}
      {renderSkipButton()}

   
      {/* Horizontal ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className=" "
      >
        {data.map((item, index) => (

          
          <View
            key={item.id}
            className="flex justify-center items-center"
            style={{ width: screenWidth }}
          >

            <View className="max-w-[240px] overflow-hidden h-[100px] w-full flex items-center justify-center px-2 pb-4">
        <Image
          source={require('../assets/images/logo.png')} // 👈 Adjust path as needed
          className="h-full max-w-[100%] mt-8 "
          resizeMode="contain"
        />
      </View>

            <View className="items-center px-4">
              <Text className="text-[33px] font-bold text-gray-800 mb-5 text-center">
                {item.title}
              </Text>
              <Text className=" text-[15px] text-gray-600 text-center leading-[1.8] ">
                {item.content}
              </Text>
{item.images && (
              <Image
          source={item.images} 
          className=" max-w-[100%] -mt-4"
          resizeMode="contain"
        />
        )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bullet Pagination */}
      {renderPagination()}
   </SafeAreaView>
    </>
  );
}