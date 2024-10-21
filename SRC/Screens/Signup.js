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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [image, setImage] = useState({});
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [workPlace, setWorkPlace] = useState('');
  const [residence, setResidence] = useState('');
  const [homeTown, setHomeTown] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const SignUp = async () => {
    const body = {
      name: firstName,
      email: email,
      phone: contact,
      from: homeTown,
      live_in: residence,
      work: workPlace,
      password: password,
      confirm_password: confirmPassword,
    };
    const formData = new FormData();

    if (Object.keys(image).length > 0) {
      formData.append('photo', image);
    }
    for (let key in body) {
      //   if (body[key] === '') {
      //     return Platform.OS == 'android'
      //       ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
      //       : Alert.alert(` ${key} field is empty`);
      //   }
      // }
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} field is empty`);
      }
      formData.append(key, body[key]);
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    if (password.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Password should atleast 8 character long',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Password should atleast 8 character long');
    }
    if (password != confirmPassword) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
        : Alert.alert('Password does not match');
    }

    const url = 'register';
    // return console.log("🚀 ~ SignUp ~ body:", JSON.stringify(formData, null, 2))

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS === 'android'
        ? ToastAndroid.show('User Registered Succesfully', ToastAndroid.SHORT)
        : Alert.alert('User Registered Succesfully');
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({token: response?.data?.token}));
      // navigation.navigate('TabNavigation');
    }
  };
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
          Let’s Signup for explore continues
        </CustomText>
        <View>
          <View style={[styles.profileSection]}>
            <CustomImage
              source={
                Object.keys(image).length > 0
                  ? {uri: image?.uri}
                  : require('../Assets/Images/dummyUser.png')
              }
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode={'cover'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              // setImagePickerModal(true);
              // openGallery()
            }}
            style={styles.editButton}>
            <Icon
              name={'pencil'}
              as={FontAwesome}
              color={'white'}
              size={moderateScale(15, 0.2)}
              onPress={() => {
                setShowModal(true);
              }}
            />
          </TouchableOpacity>
        </View>
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
          titleText={'Works at'}
          secureText={false}
          placeholder={'Where do you work? (Company Name)'}
          setText={setWorkPlace}
          value={workPlace}
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
          placeholder={'Where do you live? (State, city, or country)'}
          setText={setResidence}
          value={residence}
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
          placeholder={'Where are you from? (Hometown)'}
          setText={setHomeTown}
          value={homeTown}
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
            SignUp();
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(30, 0.3)}
          disabled={isLoading}
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
  editButton: {
    backgroundColor: 'blue',
    borderRadius: (windowWidth * 0.08) / 2,
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    bottom: 20,
  },
  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },
  profileSection: {
    height: windowWidth * 0.4,
    width: windowWidth * 0.4,
    backgroundColor: '#EEEEEE',
    borderRadius: (windowWidth * 0.4) / 2,
    marginTop: moderateScale(40, 0.3),
    overflow: 'hidden',
    // borderWidth: 4,
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
