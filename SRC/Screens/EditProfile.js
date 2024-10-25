import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';

import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
  ToastAndroid,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../Components/CustomHeader';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(userData?.name?  userData?.name :'');
  const [email, setEmail] = useState(userData?.email ?userData?.email :'');
  const [homeTown, setHomeTown] = useState(userData?.from ?userData?.from :'');
  const [contact, setContact] = useState(userData?.phone ?userData?.phone :'');
  const [workPlace, setWorkPlace] = useState(userData?.work  ?userData?.work :'');
    const [country ,setCountry ] = useState(userData?.live_in ?userData?.live_in :'')
  const [countryCode, setCountryCode] = useState('US');
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  console.log('🚀 ~ Profile ~ image:', image);

//   const [country, setCountry] = useState({
//     callingCode: ['1'],
//     cca2: 'US',
//     currency: ['USD'],
//     flag: 'flag-us',
//     name: 'United States',
//     region: 'Americas',
//     subregion: 'North America',
//   });
//   const [withCallingCode, setWithCallingCode] = useState(true);
//   const [withFilter, setFilter] = useState(true);
//   const [phone, setPhone] = useState('');

//   const onSelect = country => {
//     setCountryCode(country.cca2);
//     setCountry(country);
//   };

  //   const profileUpdate = async () => {
  //     const formData = new FormData();
  //     const body = {
  //       first_name: username,
  //       email: email,
  //     };
  //     for (let key in body) {
  //       formData?.append(key, body[key]);
  //     }
  //     if (Object.keys(image).length > 0) formData.append('photo', image);
  //     const url = 'auth/profile';
  //     setIsLoading(true);
  //     const response = await Post(url, formData, apiHeader(token));
  //     setIsLoading(false);
  //     if (response != undefined) {
  //       Platform.OS == 'android'
  //         ? ToastAndroid.show('profile updated Successfully', ToastAndroid.SHORT)
  //         : alert('profile updated Successfully');
  //       console.log('🚀 ~ profileUpdate ~ response:', response?.data?.user_info);
  //       navigation.navigate('HomeScreen');
  //     }
  //     dispatch(setUserData(response?.data?.user_info));
  //   };
  return (
    <SafeAreaView style={{width: windowWidth, height: windowHeight}}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          //   justifyContent: 'center',
          alignItems: 'center',
          width: windowWidth,

          height: windowHeight,
        }}
        showsVerticalScrollIndicator={false}>
        <CustomHeader text={'Edit profile'} leftIcon logout />
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
                setImagePicker(true)

            }}
            style={styles.editButton}>
            <Icon
              name={'pencil'}
              as={FontAwesome}
              color={'white'}
              size={moderateScale(13, 0.2)}
              onPress={() => {
                setImagePicker(true)
              }}
            />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            height: windowHeight * 0.13,
            width: windowHeight * 0.13,
            borderRadius: moderateScale((windowHeight * 0.13) / 2),
            marginTop: windowHeight * 0.05,
          }}>
          <CustomImage
            source={
              Object.keys(image).length > 0
                ? {uri: image?.uri}
                : userData?.photo
                ? {uri: userData?.photo}
                : require('../Assets/Images/user.png')
            }
            style={{
              width: '100%',
              height: '100%',
              borderRadius: moderateScale((windowHeight * 0.13) / 2),
            }}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.edit}
            onPress={() => {
              setImagePicker(true);
            }}>
            <Icon
              name="pencil"
              as={FontAwesome}
              style={styles.icon2}
              color={Color.white}
              size={moderateScale(12, 0.3)}
              onPress={() => {
                setImagePicker(true);
              }}
            />
          </TouchableOpacity>
        </View> */}
        <View style={styles.container}>
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
            setText={setCountry}
            value={country}
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
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'submit'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(40, 0.3)}
            onPress={() => {}}
            bgColor={Color.blue}
            borderRadius={moderateScale(30, 0.3)}
            disabled={isLoading}
          />
        </View>

        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setFileObject={setImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: windowHeight * 0.03,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'blue',
    borderRadius: (windowWidth * 0.06) / 2,
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
  profileSection: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
    backgroundColor: '#EEEEEE',
    borderRadius: (windowWidth * 0.4) / 2,
    marginTop: moderateScale(40, 0.3),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor:Color.blue
  },
  birthday: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  cardContainner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.18,
    height: windowHeight * 0.08,
    borderRadius: moderateScale(10, 0.6),
    borderColor: Color.themeblue,
    borderWidth: 1,
    marginHorizontal: moderateScale(10, 0.6),
  },

  edit: {
    backgroundColor: Color.blue,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    bottom: 8,
    right: 10,
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  back: {
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    backgroundColor: Color.themeblue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  customBtn: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    marginHorizontal: moderateScale(15, 0.3),
  },
});
