import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import StolenAssetsCard from '../Components/StolenAssetsCard';
import SearchContainer from '../Components/SearchContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import Card from '../Components/Card';
import { homeListData } from '../Config/dummyData';
import CustomHeader from '../Components/CustomHeader';
import { FONTS } from '../Config/theme';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  // const navigation =useNavigation()
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: moderateScale(20, 0.6),
      }}>
      <CustomHeader
        text={'profile'}
        leftIcon

      />
      <View style={styles.border}>
        <View style={styles.imageContainer}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/dummyman1.png')}
          />
        </View>
      </View>
      <CustomText isBold style={styles.user_name}>
        Emmanuel robertsen
      </CustomText>
      <TouchableOpacity>
        <CustomText style={styles.btn}>edit profile</CustomText>
      </TouchableOpacity>
      <View style={styles.btn_row}>
        <CustomButton
          text={'message'}
          fontSize={moderateScale(13, 0.6)}
          textColor={Color.white}
          width={windowWidth * 0.43}
          height={windowHeight * 0.045}
          onPress={() => { }}
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
          onPress={() => { }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
        />
      </View>
      <View style={styles.sec_row}>
        <TouchableOpacity style={styles.buttons}>
          <CustomText style={styles.buttons_text}>posts</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <CustomText style={styles.buttons_text}>pHoTO</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <CustomText style={styles.buttons_text}>VIDEOS </CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <CustomText style={styles.buttons_text}>SAVED</CustomText>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <CustomText isBold style={styles.contact}>
          contact Details
        </CustomText>
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
            +1 000 000
          </CustomText>
        </View>
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
            Example@g`mail.com
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
            +1 000 000
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
            Example Office
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
            Newyork
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
            Broklyn
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
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={stolenAssetsArray}
        renderItem={(item, index) => {
          return <StolenAssetsCard item={item?.item} />;
        }}
      />
      <CustomText
        style={{
          fontSize: moderateScale(13, 0.6),
          paddingVertical: moderateScale(10, 0.6),
          color: Color.textColor,
        }}>
        View all
      </CustomText>
      <View style={styles.post_card}>
        <CustomText isBold style={styles.post_text}>
          posts
        </CustomText>
        <View style={styles.post_row}>
          <View style={styles.post_image}>
            <CustomImage
              style={{ height: '100%', width: '100%' }}
              source={require('../Assets/Images/dummyman1.png')}
            />
          </View>
          <SearchContainer width={windowWidth * 0.6} />
          <Icon
            style={{ marginTop: moderateScale(13, 0.6) }}
            name={'images-outline'}
            as={Ionicons}
            size={moderateScale(25, 0.6)}
            color={Color.textColor}
          />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          marginVertical: moderateScale(20, 0.6),
          marginBottom: moderateScale(10, 0.6),
        }}
        // ListFooterComponent={<View style={{ height: moderateScale(50, 0.6) }} />}
        data={homeListData}
        renderItem={({ item, index }) => {
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
});
