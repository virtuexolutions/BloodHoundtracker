import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import { Icon } from 'native-base';
import { useSelector } from 'react-redux';
import { FONTS } from '../Config/theme';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import Entypo from 'react-native-vector-icons/Entypo'

const NotificationCard = ({ image, text, name, time, unread, onPress, item }) => {
  console.log('🚀 ~ NotificationCard ~ item:', item);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const userData = useSelector(state => state.commonReducer.userData);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[
          styles.NotificationCard,
          unread && {
            backgroundColor: 'rgba(223, 254, 250,0.7)',
          },
        ]}>
        <View style={styles.image}>
          <CustomImage source={item?.profile_image} style={styles.imageBg} />
        </View>
        <View
          style={
            {
              // marginLeft: moderateScale(10, 0.3)
            }
          }>
          <View style={styles.row}>
            <CustomText style={styles.subHeading}>{item?.name}</CustomText>
            <CustomText
              numberOfLines={1}
              style={{
                // marginLeft: moderateScale(15, 0.3),
                width: windowWidth * 0.4,
                color: Color.themeLightGray,
                // backgroundColor: 'red',
                ...FONTS.Regular12,
              }}>
              {item?.text}
            </CustomText>
          </View>
          <CustomText style={styles.time}>
            {time ? time : '- Just Now'}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>

  );
};

const styles = ScaledSheet.create({
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

export default NotificationCard;
