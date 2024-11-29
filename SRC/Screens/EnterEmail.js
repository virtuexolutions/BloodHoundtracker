import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale} from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';

const EnterEmail = props => {
  const navigation = props?.navigation;
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const fromForgot = props?.route?.params?.fromForgot;
  console.log('here=>', fromForgot);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async () => {
    const url = 'password/email';
    if (['', null, undefined].includes(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Email is required', ToastAndroid.SHORT)
        : alert('Email is required');
    }
    setIsLoading(true);
    const response = await Post(url, {email: email}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data?.data[0]?.code);
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${email}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${email}`);

      navigationService.navigate('VerifyNumber', {
        email: `${email}`,
        code: response?.data.data[0]?.code,
      });
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        contentContainerStyle={{
          alignSelf: 'center',
          alignItems: 'center',
        }}
        style={{
          width: '100%',
          flexGrow: 0,
          backgroundColor: '#F9F9F9',
          height: windowHeight,
        }}>
        <Icon
          name={'arrow-back'}
          as={MaterialIcons}
          size={moderateScale(27, 0.3)}
          color={Color.lightGrey}
          style={{
            position: 'absolute',
            top: moderateScale(26, 0.3),
            left: moderateScale(0, 0.3),
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: windowHeight,
          }}>
          <View
            style={{
              paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
            }}>
            <CustomText isBold style={styles.txt2}>
              Forget Password
            </CustomText>
            <CustomText style={styles.txt3} numberOfLines={3}>
              Enter the email address and we'll send an email with instructions
              to reset your password
            </CustomText>

            <TextInputWithTitle
              iconName={'envelope'}
              iconType={EvilIcons}
              titleText={'Enter your Email'}
              secureText={false}
              placeholder={'Hello@Zachry.com'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.8}
              border={1}
              borderColor={'#585757cc'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(17, 0.6)}
              color={Color.darkGray}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />

            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Submit'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.85}
              height={windowHeight * 0.07}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                sendOTP();
              }}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(30, 0.3)}
              elevation
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(25, 0.6),
  },
  txt3: {
    color: Color.darkGray,
    fontSize: moderateScale(14, 0.6),
    textAlign: 'center',
    width: windowWidth * 0.85,
    flexWrap: 'wrap',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
  },
  txt4: {
    color: Color.yellow,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.themeLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
});

export default EnterEmail;
