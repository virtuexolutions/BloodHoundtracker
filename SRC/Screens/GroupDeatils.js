import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {FONTS, SIZES} from '../Config/theme';
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomHeader from '../Components/CustomHeader';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import SearchContainer from '../Components/SearchContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'native-base';
import {homeListData} from '../Config/dummyData';
import Card from '../Components/Card';

const GroupDeatils = () => {

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.background_color}
        barStyle={'dark-content'}
      />
      <ScrollView style={styles.container}>
        <CustomHeader text={'TimeLine'} leftIcon RightIcon={true} />

        <View style={styles.banner}>
          <CustomImage
            source={require('../Assets/Images/Bike.png')}
            style={{
              //   alignSelf: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={{
          paddingHorizontal:moderateScale(20,.6),
          paddingTop:moderateScale(10,.6)
        }}>
          <CustomText isBold style={styles.btn_text}>
            Newyork Electronic E-Bikes
          </CustomText>
          <CustomText style={styles.btn_text2}>
            28K members - 10K Posts
          </CustomText>
        </View>
        <View style={styles.main_view}>
          <View style={styles.btn_view}>
            <TouchableOpacity style={styles.btn}>
              <CustomText style={styles.btn_text3}>join group</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: Color.blue}]}>
              <CustomText style={[styles.btn_text3, {color: Color.white}]}>
                Stolen
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.post_card}>
          <View style={styles.post_row}>
            <View style={styles.post_image}>
              <CustomImage
                style={{height: '100%', width: '100%'}}
                source={require('../Assets/Images/dummyman1.png')}
              />
            </View>
            <SearchContainer
              placeholder={'name your group '}
              width={windowWidth * 0.6}
            />
            <Icon
              style={{marginTop: moderateScale(13, 0.6)}}
              name={'images-outline'}
              as={Ionicons}
              size={moderateScale(25, 0.6)}
              color={Color.textColor}
            />
          </View>
        </View>
        <CustomText isBold style={styles.post_text}>
          new posts
        </CustomText>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={{
            marginVertical: moderateScale(10, 0.6),
            marginBottom: moderateScale(30, 0.6),
          }}
          data={homeListData}
          renderItem={({item, index}) => {
            return <Card item={item} fromGroup={true} />;
          }}
        />
      </ScrollView>
    </>
  );
};

export default GroupDeatils;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.background_color,
  },
  main_view: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  btn_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(50, 0.5),
  },
  btn: {
    width: '48%',
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
  },
  btn_text: {
    ...FONTS.Medium17,
    color: Color.mediumGrey,
  },
  btn_text3: {
    ...FONTS.Medium13,
    color: Color.mediumGrey,
  },
  btn_text2: {
    ...FONTS.Medium13,
    color: Color.mediumGrey,
    paddingVertical: moderateScale(8, 0.6),
  },
  banner: {
    width: windowWidth,
    height: windowHeight * 0.23,
  },
  user_image: {
    height: windowHeight * 0.07,
    width: windowHeight * 0.07,
    borderRadius: moderateScale(),
  },
  post_card: {
    width: windowWidth * 0.9,
    borderColor: Color.mediumGray,
    borderRadius: moderateScale(5, 0.6),
  },
  post_text: {
    ...FONTS.Medium19,
    color: Color.mediumGray,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingTop: moderateScale(15, 0.6),
  },
  post_row: {
    flexDirection: 'row',
    width: windowWidth,
    // alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingBottom: moderateScale(10, 0.6),
  },
  post_image: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.06) / 2,
    overflow: 'hidden',
    // marginHorizontal: moderateScale(5, 0.3),
    marginTop: moderateScale(9, 0.3),
    marginLeft: moderateScale(10, 0.6),
  },
});
