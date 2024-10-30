import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomHeader from '../Components/CustomHeader';
import StolenAssetsCard from '../Components/StolenAssetsCard';

const ViewAllScreen = () => {
  const stolenAssetsArray = [
    {
      id: 1,
      assetsName: 'Newyork Electronic E-Bikes',
      assetsimage: require('../Assets/Images/Bike.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 2,
      assetsName: '4 Wheels Rapters Broklyn',
      assetsimage: require('../Assets/Images/bike2.png'),
      members: '2K members',
      post: '4K Posts',
    },
    {
      id: 3,
      assetsName: 'Washington Trails    ',
      assetsimage: require('../Assets/Images/car.png'),
      members: '38K members',
      post: '100K Posts',
    },
    {
      id: 4,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },
     {
      id: 5,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 6,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },  {
      id: 7,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },
  ];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader text={'Stolen Assets'} leftIcon />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={stolenAssetsArray}
        style={{
          height: windowHeight * 0.24,
        }}
        contentContainerStyle={
          {
            // backgroundColor:'red'
          }
        }
        renderItem={(item, index) => {
          return <StolenAssetsCard item={item?.item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default ViewAllScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
});
