import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import moment from 'moment';
import {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {Token} from '@stripe/stripe-react-native';
import {FONTS} from '../Config/theme';
import navigationService from '../navigationService';

const ChatCard = ({
  item,
  name,
  image,
  lastmessage,
  date,
  unread,
  unreadCount,
  target_id,
  conversationId,
}) => {
  const token = useSelector(state => state.authReducer.token);

  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => navigationService.navigate('MessagesScreen' ,{item:item})}
      activeOpacity={0.8}
      style={{
        width: windowWidth * 0.93,
        alignSelf: 'center',
        backgroundColor:'white',
        borderRadius: moderateScale(10, 0.6),
        flexDirection: 'row',
        paddingHorizontal: moderateScale(5, 0.6),
        marginBottom: moderateScale(8, 0.3),
        paddingVertical: moderateScale(7, 0.4),
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
      }}>
      <View style={styles.image}>
        <CustomImage
          source={item?.profile_image}
          style={{
            width: '100%',
            height: '100%',
          }}
          // style={styles.image}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.nameContainer}>
        <CustomText
          isBold
          style={{
            ...FONTS.Regular12,
            color: Color.blue,
          }}>
          {item?.name}
        </CustomText>
        <CustomText
          numberOfLines={1}
          style={{
            fontSize: moderateScale(11, 0.3),
            color: Color.themeBlack,
          }}>
          {item?.text}
        </CustomText>
      </View>
      <View
        style={{
          marginLeft: moderateScale(2, 0.3),
          //   backgroundColor : 'red',
          width: windowWidth * 0.2,
          marginTop: moderateScale(5, 0.3),
        }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(9, 0.3),
            color: Color.themeBlack,
            textAlign: 'right',
          }}>
          {' '}
          {moment.duration(moment().diff(date)).asDays() >= 6
            ? moment(date).format('ll')
            : moment(date).fromNow()}
        </CustomText>

        {item?.undread > 0 && (
          <View
            style={{
              width: moderateScale(15, 0.3),
              height: moderateScale(15, 0.3),
              borderRadius: moderateScale(7.5, 0.3),
              backgroundColor: Color.darkGray,

              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              alignSelf: 'flex-end',
              marginTop: moderateScale(5, 0.3),
            }}>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: moderateScale(10, 0.3),
                color: Color.white,
              }}>
              {/* 5 */}
              {item?.undread}
            </CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  image: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  nameContainer: {
    marginLeft: moderateScale(8, 0.3),
    width: windowWidth * 0.53,
    // backgroundColor: 'red',
    marginTop: moderateScale(5, 0.3),
  },
});
