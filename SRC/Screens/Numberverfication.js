import {StyleSheet, Text,ScrollView, View, TouchableOpacity, ToastAndroid, Platform, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../Components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CardContainer from '../Components/CardContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import navigationService from '../navigationService';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { Icon } from 'native-base';

const Numberverfication = (props) => {
  const email = props?.route?.params?.email;
  const Code= props?.route?.params?.code;
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };
  const VerifyOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    console.log(code);
    const response = await Post(url, {code: code}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : alert(`otp verified`);

      navigationService.navigate('ResetPassword', {email: email});
    }
  };

  useEffect(() => {
    label();
  }, [time]);
  return (
    <ScrollView 
    contentContainerStyle={styles.mainContainer}
    // style={styles.mainContainer}
    >
      <View style={styles.imageContainer}>
        <CustomImage
          style={{height: '100%', width: '100%'}}
          source={require('../Assets/Images/otp.png')}
        />
      </View>
      <Icon
          name={'arrow-back'}
          as={MaterialIcons}
          size={moderateScale(27, 0.3)}
          color={Color.lightGrey}
          style={{
            position: 'absolute',
            top: moderateScale(12,0.2),
            left: moderateScale(10, 0.3),
          }}
          onPress={() => {
            // navigation.goBack()
          }}
        />
      <CustomText isBold style={styles.heading}>
        Verification
      </CustomText>
      <CustomText style={styles.text}>
      Enter the Code that has been sent to your email address :

      <CustomText isBold style={styles.text}>
                  user3@gmail.com
                  {/* {email} */}
                </CustomText>
        {/* We send OPT number on your phone */}
      </CustomText>
     
      <CustomText style={[styles.text, {fontSize: moderateScale(24,0.3)}]}>
{Code}
      </CustomText>
     
        <CodeField
          placeholder={'4'}
          ref={ref}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <CustomText
                style={[styles.cellText, isFocused && {color: Color.black}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </CustomText>
            </View>
          )}
        />
             <CustomText style={[styles.txt3, {width: windowWidth * 0.6}]}>
              Haven't Recieved Verification Code ?{' '}
              {
                <TouchableOpacity
                  disabled={timerLabel == 'Resend Code ' ? false : true}
                  onPress={() => {
                    settimerLabel('ReSend in '), settime(120);
                  }}>
                  <CustomText style={{color: Color.themeColor}}>

                    {timerLabel} {time}
                  </CustomText>
                </TouchableOpacity>
              }
            </CustomText>
       
      <CustomButton
        text={ 
          isLoading ? <ActivityIndicator  size={'small'} color={'white'}/> :
          'Verify'}
        textColor={Color.white}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(30, 0.3)}
        onPress={() => {
          VerifyOTP( )
        }}
        bgColor={Color.themeColor}
        borderRadius={moderateScale(30, 0.3)}
      />
    </ScrollView>
  );
};

export default Numberverfication;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: windowHeight * 0.1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    // justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  imageContainer: {
    height: windowHeight * 0.27,
    width: windowHeight * 0.23,
  },
  heading: {
    color: Color.black,
    fontSize: moderateScale(18, 0.6),
    marginTop: windowHeight * 0.025,
  },
  text: {
    color: Color.darkGray,
    width: windowWidth * 0.78,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.6,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
  },
  focusCell: {
    borderColor: Color.yellow,
    borderWidth: 1,
  },
  cellText: {
    color: Color.yellow,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
});
