import {Icon} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import Card from '../Components/Card';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import SearchContainer from '../Components/SearchContainer';
import StolenAssetsCard from '../Components/StolenAssetsCard';
import {homeListData} from '../Config/dummyData';
import {FONTS} from '../Config/theme';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ProfileComponent = ({
  stolenAssetsArray,
  selected,
  setSelected,
  myPostData,
}) => {
  const navigation = useNavigation();
  const profileData = useSelector(state => state.commonReducer.userData);

  return (
    <>
      <View style={styles.container}>
        <CustomText isBold style={styles.contact}>
          contact Details
        </CustomText>
        {/* <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>phone :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            {profileData?.phone}
          </CustomText>
        </View> */}
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>Email :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            {/* Example@g`mail.com */}
            {profileData?.email}
          </CustomText>
        </View>
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>phone :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            {/* +1 000 000 */}
            {profileData?.phone}
          </CustomText>
        </View>
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>Works at :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            {profileData?.work}
          </CustomText>
        </View>
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>Lives in :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            {profileData?.live_in}
          </CustomText>
        </View>
        <View style={styles.text_row}>
          <CustomText style={styles.buttons_text}>From :</CustomText>
          <CustomText
            isBold
            style={[
              styles.buttons_text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
              },
            ]}>
            {profileData?.from}
          </CustomText>
        </View>
      </View>
      <CustomText
        isBold
        style={[
          styles.contact,
          {
            width: windowWidth * 0.9,
          },
        ]}>
        stolen assets list
      </CustomText>
      <FlatList
      scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={stolenAssetsArray}
        style={{
          height: windowHeight * 0.12,
        }}
        renderItem={(item, index) => {
          return <StolenAssetsCard item={item?.item} />;
        }}
      />
      <CustomText
        onPress={() => {
          navigation.navigate('ViewAllScreen');
        }}
        style={styles.all_text}>
        View all
      </CustomText>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreatePost');
        }}
        style={styles.post_card}>
        <CustomText isBold style={styles.post_text}>
          posts
        </CustomText>
        <View style={styles.post_row}>
          <View style={styles.post_image}>
            <CustomImage
              onPress={() => {
                navigation.navigate('CreatePost');
              }}
              style={{height: '100%', width: '100%'}}
              source={require('../Assets/Images/dummyman1.png')}
            />
          </View>
          <SearchContainer
            onPress={() => {
              navigation.navigate('CreatePost');
            }}
            width={windowWidth * 0.6}
            style={{
              height: windowHeight * 0.04,
            }}
          />
          <Icon
            onPress={() => {
              navigation.navigate('CreatePost');
            }}
            kfc
            style={{marginTop: moderateScale(13, 0.6)}}
            name={'images-outline'}
            as={Ionicons}
            size={moderateScale(25, 0.6)}
            color={Color.textColor}
          />
        </View>
      </TouchableOpacity>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{
          marginVertical: moderateScale(20, 0.6),
          marginBottom: moderateScale(10, 0.6),
        }}
        // ListFooterComponent={<View style={{ height: moderateScale(50, 0.6) }} />}
        data={myPostData}
        renderItem={({item, index}) => {
          return (
            <Card
              setSelected={setSelected}
              selected={selected}
              fromProfile={true}
              item={item}
            />
          );
        }}
      />
    </>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  mainContainer: {
    // height: windowHeight,
    backgroundColor: 'red',
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
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.04,
    borderWidth: 1,
    borderColor: Color.mediumGray,
    borderRadius: moderateScale(5, 0.6),
    padding: moderateScale(5, 0.6),
  },
  buttons: {
    borderWidth: 1,
    borderColor: Color.mediumGray,
    borderRadius: moderateScale(5, 0.6),
    padding: moderateScale(5, 0.6),
    width: windowWidth * 0.2,
    alignItems: 'center',
  },
  buttons_text: {
    ...FONTS.Medium13,
    color: Color.textColor,
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
  all_text: {
    fontSize: moderateScale(13, 0.6),
    paddingVertical: moderateScale(8, 0.6),
    color: Color.textColor,
    textAlign: 'center',
  },
});
