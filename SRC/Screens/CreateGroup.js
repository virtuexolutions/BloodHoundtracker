import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import PrivacyModal from '../Components/PrivacyModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {FONTS} from '../Config/theme';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const CreateGroup = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [visibility, setvisiblity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [rbRef, setRef] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const groupCreate = async () => {
    const formData = new FormData();
    const body = {
      name: groupName,
      privacy: privacy,
      visibility: visibility,
      description : 'dyfysdifyaisdfyiuyasdfiydiasfyiasdyfiydsfiyaisudf'
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }
    if (image == null) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`image is required`, ToastAndroid.SHORT)
        : Alert.alert(`image  is required`);
    } else {
      Object.keys(image).length > 0;
      formData.append('image', image);
    }
    for (let key in body) {
      formData.append(key, body[key]);
    }
    // formData.append('body', body);
    // return console.log(
    //   '================================= form data ',
    //   JSON.stringify( formData ,null, 2),
    // );
    const url = 'auth/communities';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
     console.log("🚀 ~ groupCreate ~ response:", response?.data)

    if (response != undefined) {
      Platform.OS== 'android' ?ToastAndroid.show('group created successfully') : Alert.alert('group created successfully')
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: 'center',
        }}
        style={styles.mainContainer}>
        <CustomHeader text={'Create Group'} leftIcon />
        {image != null && (
          <Icon
            onPress={() => {
              setImage(null);
            }}
            style={styles.Icon}
            name="circle-with-cross"
            as={Entypo}
            size={moderateScale(15, 0.6)}
            color={Color.black}
          />
        )}
        <View style={styles.imageContainer}>
          <CustomImage
            onPress={() => {
              setShowModal(true);
            }}
            style={[
              styles.image,
              image == null && {
                height: windowHeight * 0.05,
                width: windowWidth * 0.1,
                marginTop: windowHeight * 0.12,
                alignSelf: 'center',
              },
            ]}
            source={
              image ? {uri: image?.uri} : require('../Assets/Images/plus.png')
            }
          />
        </View>
        <View style={styles.titleContainer}>
          <CustomText
            isBold
            style={[
              styles.title,
              {
                marginTop: windowHeight * 0.02,
              },
            ]}>
            Name
          </CustomText>
          <TextInputWithTitle
            secureText={false}
            placeholder={'Name Your Group'}
            setText={setGroupName}
            value={groupName}
            viewHeight={0.06}
            viewWidth={0.85}
            inputWidth={0.8}
            borderColor={Color.mediumGray}
            backgroundColor={'#FFFFFF'}
            border={1}
            marginTop={moderateScale(5, 0.6)}
            color={Color.darkGray}
            placeholderColor={Color.themeLightGray}
          />
        </View>
        <View style={styles.titleContainer}>
          <CustomText isBold style={styles.title}>
            privacy
          </CustomText>
          <TouchableOpacity
            onPress={() => {
              rbRef.open();
              setSelectedType('privacy');
            }}
            style={styles.dropdown}>
            <View style={{paddingHorizontal: moderateScale(15, 0.6)}}>
              <CustomText
                style={{
                  color: Color.lightGrey,
                  ...FONTS.Regular14,

                  paddingTop: moderateScale(10, 0.6),
                }}>
                {privacy ? privacy : 'select privacy'}
              </CustomText>
            </View>
            <Icon
              style={styles.icon}
              name={'arrow-drop-down'}
              as={MaterialIcons}
              size={moderateScale(25, 0.6)}
              color={Color.darkGray}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <CustomText style={styles.card_text}>
            Only members can see who's in the group and what they post. You
            can't change this group to public later. Learn More
          </CustomText>
          <CustomText
            style={[
              styles.card_text,
              {
                color: Color.themeColor,
                width: windowWidth * 0.23,
                borderBottomWidth: 1,
                borderColor: Color.themeColor,
                alignSelf: 'left',
              },
            ]}>
            Learn More
          </CustomText>
        </View>
        <View style={styles.titleContainer}>
          <CustomText isBold style={styles.title}>
            Visibility
          </CustomText>
          <TouchableOpacity
            onPress={() => {
              rbRef.open();
              setSelectedType('visibility');
            }}
            style={styles.dropdown}>
            <View style={{paddingHorizontal: moderateScale(15, 0.6)}}>
              <CustomText
                style={{
                  color: Color.lightGrey,
                  ...FONTS.Regular14,

                  paddingTop: moderateScale(10, 0.6),
                }}>
                {visibility ? visibility : 'select visibility'}
              </CustomText>
            </View>
            <Icon
              style={styles.icon}
              name={'arrow-drop-down'}
              as={MaterialIcons}
              size={moderateScale(25, 0.6)}
              color={Color.darkGray}
            />
          </TouchableOpacity>
        </View>
        <CustomButton
          text={'Create group'}
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.05}
          marginTop={windowHeight * 0.12}
          onPress={() => {
            groupCreate();
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
        />
        <PrivacyModal
          rbRef={rbRef}
          setRef={setRef}
          selectedType={selectedType}
          privacy={privacy}
          setPrivacy={setPrivacy}
          setvisiblity={setvisiblity}
          visibility={visibility}
        />
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#F9F9F9',
  },
  titleContainer: {
    paddingTop: windowHeight * 0.02,
  },
  title: {
    color: Color.black,
    ...FONTS.Medium13,
    paddingHorizontal: moderateScale(5, 0.6),
  },
  card: {
    marginTop: windowHeight * 0.025,
    width: windowWidth * 0.85,
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: '#E9E9E9',
    borderRadius: moderateScale(5, 0.6),
  },
  card_text: {
    ...FONTS.Regular12,
    width: windowWidth * 0.75,
  },
  dropdown: {
    marginTop: moderateScale(5, 0.6),
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.lightGrey,
    borderRadius: moderateScale(5, 0.6),
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  imageContainer: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.25,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  Icon: {
    position: 'absolute',
    top: 55,
    zIndex: 1,
    // left : 320,
    right: 30,
  },
});
