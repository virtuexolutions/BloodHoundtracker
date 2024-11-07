import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import CustomHeader from '../Components/CustomHeader';
import {windowHeight, windowWidth} from '../Utillity/utils';
import NotificationCard from '../Components/NotificationCard';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {notificationArray} from '../Config/dummyData';
import CustomText from '../Components/CustomText';
import {FONTS} from '../Config/theme';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomImage from '../Components/CustomImage';

const NotificationsScreen = () => {
  return (
  
    <SafeAreaView
      style={{paddingBottom: moderateScale(20, 0.6), alignItems: 'center'}}>
      <CustomHeader text={'Notification'} leftIcon RightIcon={true} />
      <View
        style={{
          flexDirection: 'row',
          width: windowWidth,
          paddingHorizontal: moderateScale(20, 0.6),
          justifyContent: 'space-between',
        }}>
        <CustomText
          isBold
          style={{
            ...FONTS.Medium12,
            color: Color.mediumGray,
          }}>
          Show all
        </CustomText>
        <CustomText
          isBold
          style={{
            ...FONTS.Medium12,
            color: Color.mediumGray,
          }}>
          mark as us read
        </CustomText>
      </View>
 
      <SwipeListView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: moderateScale(10, 6),
        }}
        style={{
          width: windowWidth * 0.9,
        }}
        rightOpenValue={-75}
        data={notificationArray}
        renderItem={(item, rowMap) => {
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
              <View style={styles.NotificationCard}>
                <View style={styles.image}>
                  <CustomImage
                    source={require('../Assets/Images/dummyman1.png')}
                    style={styles.imageBg}
                  />
                </View>
                <View>
                  <View style={styles.row}>
                    <CustomText numberOfLines={1} style={styles.subHeading}>
                      john
                    </CustomText>
                    <CustomText
                      numberOfLines={1}
                      style={{
                        width: windowWidth * 0.4,
                        color: Color.themeLightGray,
                        ...FONTS.Regular12,
                      }}>
                      added a comment
                    </CustomText>
                  </View>
                  <CustomText style={styles.time}>'- Just Now'</CustomText>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        renderHiddenItem={(data, rowMap) => {
          return (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: Color.themeColor,
                height: windowHeight * 0.065,
                width: windowWidth * 0.15,
                justifyContent: 'center',
                borderRadius: moderateScale(8, 0.6),
                position: 'absolute',
                right: 0,
              }}>
              <Icon
                name="check"
                color={Color.white}
                size={moderateScale(15, 0.6)}
                as={Entypo}
              />
              <CustomText
                style={{
                  color: Color.white,
                  ...FONTS.Regular12,
                }}>
                read
              </CustomText>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
  image: {
    marginHorizontal: moderateScale(20, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowHeight * 0.03,
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
  imageBg: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: moderateScale(50, 0.3),
    // borderColor: Color.blue,
    // borderWidth: 2,
  },
  time: {
    ...FONTS.Regular10,
    // position: 'absolute',
    color: Color.themeLightGray,
    right: moderateScale(0, 0.3),
    // top: moderateScale(5, 0.3),
    marginLeft: moderateScale(5, 0.3),
  },
  imageBg: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: moderateScale(50, 0.3),
    // borderColor: Color.blue,
    // borderWidth: 2,
  },
  image: {
    height: moderateScale(40, 0.3),
    width: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
  },
  unRead: {
    position: 'absolute',
    bottom: moderateScale(30, 0.3),
    right: moderateScale(25, 0.3),
    // top: moderateScale(59, 0.3),
    marginLeft: moderateScale(5, 0.3),
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeading: {
    ...FONTS.Medium13,
    // fontSize: moderateScale(16, 0.3),
    color: Color.themeBlack,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: windowWidth * 0.3,
  },
  NotificationCard: {
    width: windowWidth,
    flexDirection: 'row',
    paddingVertical: moderateScale(6, 0.3),
    // paddingLeft: moderateScale(10, 0.3),
    borderColor: Color.themeLightGray,
    alignItems: 'center',
    width: windowWidth * 0.9,
    backgroundColor: 'white',
    marginBottom: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(5, 0.6),
  },
  row: {
    width: windowWidth * 0.3,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
    // backgroundColor: 'green',
  },
});
