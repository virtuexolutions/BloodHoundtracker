import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
// import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';

import navigationService from '../navigationService';

import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
const ChangePassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state.authReducer.token);
  console.log(token, 'tokeeeeeeeeeeeeen');

  const onPressSubmit = async () => {
    const body = {
      current_password: currPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword,
    };
    setLoading(true);
    const url = 'auth/change_password';
    const response = await Post(url, body, apiHeader(token));
    if (response?.data != null) {
      setLoading(false);
      navigationService.navigate('LoginScreen');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.back}>
        <Icon
          name="arrowleft"
          as={AntDesign}
          style={styles.icon2}
          color={Color.black}
          size={moderateScale(20, 0.3)}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: windowWidth,
          minHeight: windowHeight,
          paddingBottom: moderateScale(40, 0.6),
          // justifyContent: 'center',
          // backgroundColor:'red',
          // height: windowHeight*0.8,
          alignItems: 'center',
        }}>
        {/* 
          <View
            style={{
           
              height: windowHeight * 0.13,
              width: windowHeight * 0.13,
              borderRadius: moderateScale((windowHeight * 0.13) / 2),
              // overflow : 'hidden'
            }}>
          </View> */}
        <CustomText style={styles.txt5}>Change Password</CustomText>
        <View
          style={{
            gap: 18,
            // paddingVertical: moderateScale(30, 0.3),
            alignItems: 'center',
            // justifyContent: 'center',
            marginTop: windowHeight * 0.15,
            // marginTop: moderateScale(20, 0.3),
          }}>
          <TextInputWithTitle
            iconName={'lock1'}
            iconType={AntDesign}
            LeftIcon={true}
            titleText={'Current Password'}
            placeholder={'Current Password'}
            setText={setCurrPassword}
            value={currPassword}
            secureText={true}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.7}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.lightGrey}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.lightGrey}
            shadowColor={Color.lightGrey}
            elevation
          />
          <TextInputWithTitle
            iconName={'lock1'}
            iconType={AntDesign}
            LeftIcon={true}
            titleText={'New Password'}
            placeholder={'New Password'}
            setText={setNewPassword}
            value={newPassword}
            secureText={true}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.7}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.lightGrey}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.lightGrey}
            shadowColor={Color.lightGrey}
            elevation
          />

          <TextInputWithTitle
            iconName={'unlock'}
            iconType={FontAwesome}
            LeftIcon={true}
            titleText={'Confirm your new password'}
            placeholder={'Confirm your new password'}
            setText={setConfirmNewPassword}
            value={confirmNewPassword}
            secureText={true}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.7}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.lightGrey}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.lightGrey}
            shadowColor={Color.lightGrey}
            elevation
          />
          <CustomButton
            onPress={() => onPressSubmit()}
            text={
              isLoading ? (
                <ActivityIndicator color={Color.white} size={'small'} />
              ) : (
                'RESET'
              )
            }
            loader={isLoading}
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.blue}
            isBold
            // isGradient
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
const styles = ScaledSheet.create({
  // birthday: {
  //   width: windowWidth * 0.75,
  //   height: windowHeight * 0.06,
  //   marginTop: moderateScale(10, 0.3),
  //   borderRadius: moderateScale(10, 0.6),
  //   borderWidth: 1,
  //   backgroundColor: 'white',
  //   borderColor: Color.lightGrey,
  //   flexDirection: 'row',
  //   paddingHorizontal: moderateScale(10, 0.6),
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   shadowColor: Color.themeColor,
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowOpacity: 0.32,
  //   shadowRadius: 5.46,
  //   elevation: 9,
  // },
  txt5: {
    marginTop: windowHeight * 0.11,
    marginLeft: windowHeight * 0.18,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
    width: windowWidth * 0.85,
    color: Color.blue,
  },

  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
