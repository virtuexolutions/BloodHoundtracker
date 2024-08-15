import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButton from '../Components/CustomButton';
import {Icon, ScrollView} from 'native-base';
import {
  setMilageRing,
  setUserLogin,
  setUserToken,
  setWalkThrough,
} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import navigationService from '../navigationService';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';
import ImagePickerModal from '../Components/ImagePickerModal';
import {setSelectedRole, setUserData} from '../Store/slices/common';
import {validateEmail} from '../Config';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState({});
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CustomStatusBar backgroundColor={'#F9F9F9'} barStyle={'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignSelf: 'center',
          alignItems: 'center',
          paddingTop: windowHeight * 0.035,
          paddingBottom: moderateScale(20, 0.3),
        }}
        style={{
          width: '100%',
          flexGrow: 0,
          backgroundColor: '#F9F9F9',
          height: windowHeight,
        }}>
        {/* <View>
          {Object.keys(image).length > 0 ? (
            <CustomImage source={{uri: image?.uri}} style={styles.image} />
          ) : (
            <CustomImage
              style={styles.image}
              source={require('../Assets/Images/man3.jpg')}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
            style={[
              styles.edit,
              {
                backgroundColor:
                  userRole == 'Qbid Member'
                    ? Color.blue
                    : userRole == 'Qbid Negotiator'
                    ? Color.themeColor
                    : Color.black,
              },
            ]}>
            <Icon
              name="pencil"
              as={FontAwesome}
              style={styles.icon2}
              color={Color.white}
              size={moderateScale(16, 0.3)}
            />
          </TouchableOpacity>
        </View> */}
        <View style={styles.imageContainer}>
          <CustomImage
            style={{height: '100%', width: '100%'}}
            source={require('../Assets/Images/signup.png')}
          />
        </View>
        <CustomText isBold style={styles.heading}>
          welcome back!
        </CustomText>
        <CustomText style={styles.text}>
          Let’s login for explore continues
        </CustomText>

        <TextInputWithTitle
          titleText={'full Name'}
          secureText={false}
          placeholder={'Full Name'}
          setText={setFirstName}
          value={firstName}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.8}
          borderColor={'#ffffff'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
        />

        <TextInputWithTitle
          titleText={'Email'}
          secureText={false}
          placeholder={'Email'}
          setText={setEmail}
          value={email}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.8}
          borderColor={'#ffffff'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
        />
        <TextInputWithTitle
          titleText={'Contact'}
          secureText={false}
          placeholder={'Contact'}
          setText={setContact}
          value={contact}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.8}
          borderColor={'#ffffff'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          keyboardType={'numeric'}
        />

        <TextInputWithTitle
          titleText={'Password'}
          secureText={true}
          placeholder={'Password'}
          setText={setPassword}
          value={password}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.8}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
        />
        <TextInputWithTitle
          titleText={'Confirm Password'}
          secureText={true}
          placeholder={'Confirm Password'}
          setText={setConfirmPassword}
          value={confirmPassword}
          viewHeight={0.06}
          viewWidth={0.8}
          inputWidth={0.8}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
        />

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Register'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            // Register();
            navigation.navigate('HomeScreen');
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(30, 0.3)}
        />
        <View style={styles.container2}>
          <CustomText style={styles.txt5}>
            {'Already have an account? '}
          </CustomText>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginLeft: windowWidth * 0.01}}
            onPress={() => navigationService.navigate('LoginScreen')}>
            <CustomText
              style={[
                styles.txt4,
                {
                  color: Color.themeColor,
                },
              ]}>
              {'log In'}
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImage}
      />
    </>
  );
};

export default Signup;

const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    color: Color.blue,
    fontSize: moderateScale(12, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
  },
  txt4: {
    color: Color.blue,
    fontSize: moderateScale(13, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: Color.themeColor,
  },
  txt5: {
    color: Color.mediumGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(13, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
  edit: {
    backgroundColor: Color.blue,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    paddingTop: moderateScale(20, 0.3),
    paddingBottom: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: moderateScale(14, 0.3),
    width: moderateScale(14, 0.3),
    borderRadius: moderateScale(7, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.black,
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
});
