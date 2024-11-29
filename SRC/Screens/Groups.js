import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import GroupCard from '../Components/GroupCard';
import CustomImage from '../Components/CustomImage';
import {FONTS} from '../Config/theme';
import CustomHeader from '../Components/CustomHeader';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';

const Groups = () => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ Groups ~ token:', token);
  const [isLoading, setIsLoading] = useState(false);
  const dummyGroupArray = [
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
      assetsName: 'Newyork Electronic E-Bikes',
      assetsimage: require('../Assets/Images/Bike.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 6,
      assetsName: 'Washington Trails',
      assetsimage: require('../Assets/Images/bike2.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 7,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 8,
      assetsName: 'Newyork Electronic E-Bikes',
      assetsimage: require('../Assets/Images/car.png'),
      members: '28K members',
      post: '10K Posts',
    },

    {
      id: 9,
      assetsName: 'Washington Trails',
      assetsimage: require('../Assets/Images/bike2.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 10,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 11,
      assetsName: 'Newyork Electronic E-Bikes',
      assetsimage: require('../Assets/Images/car.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 12,
      assetsName: 'Washington Trails',
      assetsimage: require('../Assets/Images/bike2.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 13,
      assetsName: 'iPhone 14 Stolen',
      assetsimage: require('../Assets/Images/iphone.png'),
      members: '28K members',
      post: '10K Posts',
    },
    {
      id: 14,
      assetsName: 'Newyork Electronic E-Bikes',
      assetsimage: require('../Assets/Images/car.png'),
      members: '28K members',
      post: '10K Posts',
    },
  ];
  const dummyImages = [
    require('../Assets/Images/bike2.png'),
    require('../Assets/Images/Bike.png'),
    require('../Assets/Images/iphone.png'),
    require('../Assets/Images/car.png'),
    require('../Assets/Images/Bike.png'),
    require('../Assets/Images/car.png'),
    require('../Assets/Images/iphone.png'),
    require('../Assets/Images/bike2.png'),
    require('../Assets/Images/car.png'),
    require('../Assets/Images/Bike.png'),
    require('../Assets/Images/iphone.png'),
    require('../Assets/Images/bike2.png'),
    require('../Assets/Images/car.png'),
  ];

  const [groupData, setGroupData] = useState([]);

  const groupsList = async () => {
    const url = 'auth/communities';
    setIsLoading(true);
    const response = await Get(url, token);
    console.log('🚀 ~ groupsList ~ response:', response?.data);
    setIsLoading(false);

    if (response != undefined) {
      setGroupData(response?.data?.data);
    }
  };

  useEffect(() => {
    console.log('================== ffrom details');
    groupsList();
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader leftIcon={true} text={'Groups'} />
      <View
        style={{
          height: windowHeight * 0.12,
          paddingVertical: moderateScale(5, 0.6),
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{
          //   // paddingBottom: moderateScale(25, 0.6),
          // }}
          horizontal
          data={dummyImages}
          renderItem={(item, index) => {
            return (
              <View style={styles.imageContainer}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={item?.item}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <CustomText isBold style={styles.headingtxt}>
          Suggested Groups
        </CustomText>
        <TouchableOpacity
          onPress={() => navigationService.navigate('CreateGroup')}>
          <CustomText isBold style={styles.subtxt}>
            Create Group
          </CustomText>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(60, 0.6),
        }}
        data={groupData}
        renderItem={(item, index) => {
          return <GroupCard item={item?.item} />;
        }}
      />
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(15, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth,
    justifyContent: 'space-between',
  },
  headingtxt: {
    color: Color.mediumGray,
    ...FONTS.Medium17,
    letterSpacing: 0.5,
  },
  subtxt: {
    color: Color.themeColor,
    ...FONTS.Medium13,
    borderBottomWidth: 1,
    borderColor: Color.themeColor,
  },
  imageContainer: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.25,
    marginHorizontal: moderateScale(5, 0.6),
    borderRadius: moderateScale(5, 0.6),
    overflow: 'hidden',
  },
});
