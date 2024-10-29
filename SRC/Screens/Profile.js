import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import StolenAssetsCard from '../Components/StolenAssetsCard';
import SearchContainer from '../Components/SearchContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import Card from '../Components/Card';
import CustomHeader from '../Components/CustomHeader';
import {FONTS} from '../Config/theme';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {baseUrl} from '../Config';
import ProfileComponent from '../Components/ProfileComponent';
import Myposts from '../Components/Myposts';

const Profile = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const profileData = useSelector(state => state.commonReducer.userData);
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
  ];
  const [stolenAssets, setStolenAssets] = useState('');
  const [foundedAssets, setFoundedAssets] = useState('');
  const [selected, setSelected] = useState('stolen');
  const [numColumns, setNumColumns] = useState(1);
  const [selectedTab, setSelectedTab] = useState('ProfileComponent');
  const tabs = ['profile', 'posts', 'photo', 'videos', 'saved'];
  useEffect(() => {
    if (selectedTab != isFocused) {
      setSelectedTab('ProfileComponent');
    }
  }, [isFocused]);

  useEffect(() => {
    setNumColumns(
      selectedTab == 'photo' ||
        selectedTab == 'videos' ||
        selectedTab == 'saved'
        ? 3
        : 1,
    );
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: moderateScale(20, 0.6),
      }}>
      <CustomHeader text={'profile'} leftIcon logout />
      <View style={styles.border}>
        <View style={styles.imageContainer}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={{uri: `${baseUrl}${profileData?.photo}`}}
          />
        </View>
      </View>
      <CustomText isBold style={styles.user_name}>
        {profileData?.name}
      </CustomText>
      <TouchableOpacity>
        <CustomText
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          style={styles.btn}>
          edit profile
        </CustomText>
      </TouchableOpacity>
      <View style={styles.btn_row}>
        <CustomButton
          text={'message'}
          fontSize={moderateScale(13, 0.6)}
          textColor={Color.white}
          width={windowWidth * 0.43}
          height={windowHeight * 0.045}
          onPress={() => {}}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
        />
        <CustomButton
          text={'group'}
          fontSize={moderateScale(13, 0.6)}
          textColor={Color.white}
          width={windowWidth * 0.43}
          height={windowHeight * 0.045}
          onPress={() => {
            navigation.navigate('GroupDeatils')
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
        />
      </View>
      <View style={styles.sec_row}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingHorizontal: moderateScale(3, 0.6),
            paddingVertical: moderateScale(5, 0.6),
          }}
          data={tabs}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(item);
                }}
                style={[
                  styles.buttons,
                  {
                    backgroundColor:
                      selectedTab == item ? Color.blue : Color.white,
                  },
                ]}>
                <CustomText
                  isBold
                  style={[
                    styles.buttons_text,
                    {
                      color: selectedTab == item ? Color.white : Color.blue,
                    },
                  ]}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Myposts
        numColumns={numColumns}
        setNumColumns={setNumColumns}
        selected={selectedTab}
        setSelected={setSelectedTab}
        selectedAssets={selected}
        seSelectedAssets={setSelected}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
  },
  imageContainer: {
    height: windowHeight * 0.14,
    width: windowHeight * 0.14,
    borderRadius: (windowHeight * 0.14) / 2,
    overflow: 'hidden',
  },
  border: {
    marginTop: windowHeight * 0.03,
    height: windowHeight * 0.155,
    width: windowHeight * 0.155,
    borderRadius: (windowHeight * 0.155) / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.themeColor,
  },
  user_name: {
    color: Color.textColor,
    fontSize: moderateScale(17, 0.6),
    paddingTop: moderateScale(20, 0.6),
  },
  btn: {
    color: Color.textColor,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.textColor,
  },
  btn_row: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    paddingTop: windowHeight * 0.04,
  },
  sec_row: {
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.04,
    borderWidth: 1,
    borderColor: Color.mediumGray,
    borderRadius: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
  },
  buttons: {
    borderWidth: 1,
    borderColor: Color.mediumGray,
    borderRadius: moderateScale(5, 0.6),
    padding: moderateScale(2, 0.6),
    marginHorizontal: moderateScale(4, 0.3),
    width: windowWidth * 0.15,
    alignItems: 'center',
  },
  buttons_text: {
    ...FONTS.Medium11,
    color: Color.textColor,
    letterSpacing: 0.8,
  },
  container: {
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(10, 0.6),
  },
  contact: {
    ...FONTS.Medium17,
    color: Color.textColor,
  },
  text_row: {
    flexDirection: 'row',
  },
  post_card: {
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderColor: Color.mediumGray,
    borderRadius: moderateScale(5, 0.6),
  },
  post_text: {
    ...FONTS.Medium15,
    color: Color.textColor,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  post_row: {
    flexDirection: 'row',
    width: '100%',
    // alignItems:'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingBottom: moderateScale(10, 0.6),
  },
  post_image: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    overflow: 'hidden',
    marginHorizontal: moderateScale(5, 0.3),
    marginTop: moderateScale(5, 0.6),
  },
});
