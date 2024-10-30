import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomHeader from '../Components/CustomHeader';

const ChangePassword = () => {
  const token = useSelector(state => state.authReducer.token);
  console.log(token, 'tokeeeeeeeeeeeeen');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
      <CustomHeader text={'Change password'} leftIcon />
      <View
        style={{
          gap: 18,
          alignItems: 'center',
          marginTop: windowHeight * 0.18,
        }}>
        <CustomText style={styles.txt3}>
          Want to change password ? don't worry, jsut take a simple step and
          create your new password!
        </CustomText>
        <TextInputWithTitle
          titleText={'Current Password'}
          placeholder={'Current Password'}
          setText={setCurrPassword}
          value={currPassword}
          secureText={true}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={'#ffffff'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          shadowColor={Color.lightGrey}
          elevation
        />
        <TextInputWithTitle
          titleText={'New Password'}
          placeholder={'New Password'}
          setText={setNewPassword}
          value={newPassword}
          secureText={true}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={'#ffffff'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          shadowColor={Color.lightGrey}
          elevation
        />

        <TextInputWithTitle
          titleText={'Confirm your new password'}
          placeholder={'Confirm your new password'}
          setText={setConfirmNewPassword}
          value={confirmNewPassword}
          secureText={true}
          viewHeight={0.06}
          viewWidth={0.85}
          inputWidth={0.75}
          borderColor={'#ffffff'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
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
          borderRadius={moderateScale(8, 0.3)}
          width={windowWidth * 0.85}
          height={windowHeight * 0.055}
          marginTop={moderateScale(20, 0.3)}
          bgColor={Color.blue}
          isBold
        />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
const styles = ScaledSheet.create({
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
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    width: '80%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
});
