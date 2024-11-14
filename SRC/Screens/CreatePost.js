import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import CreatePostimges from '../Components/CreatePostimges';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import SearchLocationModal from '../Components/SearchLocationModal';
import TagPeopleModal from '../Components/TagPeopleModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {FONTS} from '../Config/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  apiHeader,
  requestCameraPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {baseUrl} from '../Config';
import {ActivityIndicator} from 'react-native';

const CreatePost = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [tagModal, setTagModal] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [show, setShow] = useState(false);
  const [fileObject, setFileObject] = useState({});
  const [assetsCategory, setAssetsCategory] = useState('');
  const [assetsCategoryModal, setAssetsCategoryModal] = useState(false);
  const [checkinModal, setCheckinModal] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('only me');
  const [privacyModal, setPrivacyModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [assetColor, setAssetColor] = useState('');

  const openCamera = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };
    if (Platform.OS === 'android') {
      //   if (PermissionsAndroid.PERMISSIONS.CAMERA == null) {
      //     console.log('herer camera permissio null===============');
      //   }
      //  else
      if (PermissionsAndroid.PERMISSIONS.CAMERA == true) {
        console.log('herer');
      } else {
        const permissionResponse = await requestCameraPermission();

        if (permissionResponse == true) {
          console.log('camera permission granted');
        } else {
          // requestCameraPermission();
          // ToastAndroid.show('Camera permission rejected', ToastAndroid.SHORT);
          // return setShow(false);
        }
      }
    }

    launchCamera(options, response => {
      console.log('Response from Camera Launch', response);

      try {
        if (Platform.OS == 'ios') {
          setShow(false);
        }
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          setFileObject &&
            setFileObject({
              uri: response?.assets[0]?.uri,
              type: response?.assets[0]?.type,
              name: response?.assets[0]?.fileName,
            });

          setMultiImages &&
            setMultiImages(x => [
              ...x,
              {
                uri: response?.assets[0]?.uri,
                type: response?.assets[0]?.type,
                name: response?.assets[0]?.fileName,
              },
            ]);
          // }
        }
      } catch (error) {
        console.log('response is undefined=================>', error);
      }
    });
  };

  const openGallery = () => {
    let options = {
      mediaType: 'mixed',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };
    // {
    //   crop
    //     ? ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //       }).then(image => {
    //         console.log( 'dasdas ========>',image);
    //       })
    //     :
    launchImageLibrary(options, response => {
      if (Platform.OS === 'ios') {
        setShow(false);
      }
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        setFileObject &&
          setFileObject({
            uri: response?.assets[0]?.uri,
            type: response?.assets[0]?.type,
            name: response?.assets[0]?.fileName,
          });

        setMultiImages &&
          setMultiImages(x => [
            ...x,
            {
              uri: response?.assets[0]?.uri,
              type: response?.assets[0]?.type,
              name: response?.assets[0]?.fileName,
            },
          ]);
      }
    });
    // }
  };

  const postCreate = async () => {
    const formData = new FormData();
    const body = {
      description: description,
      privacy: privacy,
      category: assetsCategory,
      end_time: endTime,
      start_time: startTime,
      assetname: assetName,
      assetcolor: assetColor,
    };
    selectedPeople?.forEach((item, index) => {
      formData.append(`tags[${index}]`, item?.id);
    });

    searchData?.forEach((item, index) => {
      formData.append(`location[${index}][name]`, item?.name);
      formData.append(`location[${index}][lat]`, item?.lat);
      formData.append(`location[${index}][lng]`, item?.lng);
    });
    multiImages?.forEach((item, index) => {
      formData.append(`images[${index}]`, item);
    });

    for (let key in body) {
      formData.append(key, body[key]);
    }
    // console.log('form datea =======', JSON.stringify(formData, null, 2));
    const url = 'auth/post';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        height: windowHeight,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      behavior="padding">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={styles.mainContainer}>
        <CustomHeader text={'Create Post'} leftIcon />
        <View style={styles.row_container}>
          <View style={styles.imageContainer}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri: `${baseUrl}${userData?.photo}`}}
            />
          </View>
          <View style={styles.text_view}>
            <CustomText isBold style={styles.user_name}>
              {userData?.name}
              {selectedPeople?.length > 0 && (
                <CustomText numberOfLines={1} isBold style={styles.text}>
                  {selectedPeople.length === 1
                    ? ` - with ${selectedPeople[0]?.name}`
                    : ` - with ${selectedPeople[0]?.name} and ${
                        selectedPeople.length - 1
                      } others`}
                </CustomText>
              )}
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setPrivacyModal(!privacyModal);
              }}
              style={[
                styles.container,
                {
                  width: windowWidth * 0.27,
                  height: privacyModal
                    ? windowHeight * 0.05
                    : windowHeight * 0.03,
                },
              ]}>
              <Icon
                style={{
                  marginTop: moderateScale(2, 0.6),
                }}
                name={privacy == 'public' ? 'public' : 'lock'}
                as={privacy == 'public' ? MaterialIcons : AntDesign}
                size={moderateScale(15, 0.6)}
                color={Color.themeColor}
              />
              <View>
                <CustomText
                  onPress={() => {
                    setPrivacy('only me');
                  }}
                  isBold
                  style={{
                    ...FONTS.Medium10,
                    color: Color.textColor,
                    paddingHorizontal: moderateScale(5, 0.6),
                    paddingTop: moderateScale(2, 0.6),
                  }}>
                  {privacy}
                </CustomText>
                {privacyModal == true && (
                  <CustomText
                    onPress={() => {
                      setPrivacy(privacy == 'public' ? 'only me' : 'public');
                      setPrivacyModal(false);
                    }}
                    isBold
                    style={{
                      ...FONTS.Medium10,
                      color: Color.textColor,
                      paddingHorizontal: moderateScale(5, 0.6),
                      paddingTop: moderateScale(2, 0.6),
                      width: windowWidth * 0.18,
                    }}>
                    {privacy == 'public' ? 'only me' : 'public'}
                  </CustomText>
                )}
              </View>
              <Icon
                name={'arrow-drop-down'}
                as={MaterialIcons}
                size={moderateScale(18, 0.6)}
                color={Color.themeColor}
              />
            </TouchableOpacity>
          </View>

          <Icon
            onPress={() => {
              openGallery();
            }}
            style={{
              marginTop: moderateScale(9, 0.6),
              marginHorizontal: moderateScale(6, 0.6),
            }}
            name={'images-outline'}
            as={Ionicons}
            size={moderateScale(25, 0.6)}
            color={Color.themeColor}
          />
        </View>

        <CreatePostimges
          multiImages={multiImages}
          setMultiImages={setMultiImages}
        />

        <TextInputWithTitle
          secureText={false}
          placeholder={'Add Description Here'}
          setText={setDescription}
          value={description}
          viewHeight={0.13}
          viewWidth={0.85}
          inputWidth={0.8}
          borderColor={'#ffffff'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          multiline
        />
        <CustomText
          style={{
            ...FONTS.Medium15,
            marginTop: moderateScale(10, 0.6),
            textAlign: 'left',
            width: '84%',
          }}
          isBold>
          Location
        </CustomText>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchData}
          style={{
            width:'85%',
          }}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: windowWidth * 0.75,
                  marginVertical: moderateScale(5, 0.3),
                  padding: moderateScale(7, 0.6),
                  backgroundColor: Color.veryLightGray,
                  borderRadius: moderateScale(17, 0.6),
                  textAlign: 'left',
                }}>
                <CustomText numberOfLines={1}
                style={styles.location_text}>
                  {`@${item?.name}`}
                </CustomText>
                <Icon
                  onPress={() => {
                    if (searchData?.length == 1) {
                      let newArray = [...searchData];
                      newArray.splice(index, 1);
                      setSearchData(newArray);
                    } else {
                      let newArray = [...searchData];
                      newArray.splice(index, 1);
                      setSearchData(newArray);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: 9,
                    backgroundColor: Color.blue,
                    borderRadius: 5,
                  }}
                  name="cross"
                  as={Entypo}
                  size={moderateScale(10, 0.6)}
                  color={Color.white}
                />
              </View>
            );
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setTagModal(true);
          }}
          style={styles.row}>
          <TouchableOpacity
            style={{
              height: windowHeight * 0.03,
              width: windowWidth * 0.06,
              marginHorizontal: moderateScale(5, 0.6),
            }}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/icon.png')}
            />
          </TouchableOpacity>
          <CustomText
            style={{
              ...FONTS.Regular13,
              color: Color.textColor,
            }}>
            tag people
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'android') {
              setShow(false);
            }
            openCamera();
          }}
          style={[styles.row, {marginTop: 0}]}>
          <Icon
            style={{
              marginHorizontal: moderateScale(6, 0.6),
            }}
            name={'camera'}
            as={Feather}
            size={moderateScale(20, 0.6)}
            color={Color.themeColor}
          />
          <CustomText
            style={{
              ...FONTS.Regular13,
              color: Color.textColor,
            }}>
            camera
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCheckinModal(true);
          }}
          style={[
            styles.row,
            {
              marginTop: 0,
            },
          ]}>
          <Icon
            style={{
              marginHorizontal: moderateScale(6, 0.6),
            }}
            name={'map-marker-radius-outline'}
            as={MaterialCommunityIcons}
            size={moderateScale(22, 0.6)}
            color={Color.themeColor}
          />
          <CustomText
            style={{
              ...FONTS.Regular13,
              color: Color.textColor,
            }}>
            Check In
          </CustomText>
        </TouchableOpacity>
        <View
          style={[
            styles.row,
            {
              marginTop: 0,
            },
          ]}>
          <Icon
            onPress={() => {
              setAssetsCategoryModal(!assetsCategoryModal);
            }}
            style={{
              marginHorizontal: moderateScale(6, 0.6),
            }}
            name={'keyboard-arrow-down'}
            as={MaterialIcons}
            size={moderateScale(22, 0.6)}
            color={Color.themeColor}
          />
          <View>
            <CustomText
              onPress={() => {
                setAssetsCategoryModal(!assetsCategoryModal);
              }}
              style={{
                ...FONTS.Regular13,
                color: Color.textColor,
              }}>
              {assetsCategory == '' ? 'select asset category' : assetsCategory}
            </CustomText>
            {assetsCategoryModal && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '92%',
                  }}>
                  <CustomText
                    onPress={() => {
                      setAssetsCategory('stolen');
                    }}
                    style={{
                      ...FONTS.Regular13,
                      color: Color.lightGrey,
                    }}>
                    stolen
                  </CustomText>
                  {assetsCategory == 'stolen' && (
                    <Icon
                      as={Feather}
                      name="check"
                      color={Color.blue}
                      size={moderateScale(20, 0.6)}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '92%',
                  }}>
                  <CustomText
                    onPress={() => {
                      setAssetsCategory('founded');
                    }}
                    style={{
                      ...FONTS.Regular13,
                      color: Color.lightGrey,
                    }}>
                    founded
                  </CustomText>
                  {assetsCategory == 'founded' && (
                    <Icon
                      as={Feather}
                      name="check"
                      color={Color.blue}
                      size={moderateScale(20, 0.6)}
                    />
                  )}
                </View>
              </>
            )}
          </View>
        </View>
        <TextInputWithTitle
          titleText={'Email'}
          secureText={false}
          placeholder={'Assets Name '}
          setText={setAssetName}
          value={assetName}
          viewHeight={0.045}
          viewWidth={0.85}
          inputWidth={0.8}
          borderColor={Color.mediumGray}
          border={1}
          backgroundColor={'transparent'}
          color={Color.themeColor}
          placeholderColor={Color.textColor}
        />
        <TextInputWithTitle
          titleText={'Email'}
          secureText={false}
          placeholder={'Assets Color '}
          setText={setAssetColor}
          value={assetColor}
          viewHeight={0.045}
          viewWidth={0.85}
          inputWidth={0.8}
          borderColor={Color.mediumGray}
          border={1}
          backgroundColor={'transparent'}
          color={Color.themeColor}
          placeholderColor={Color.textColor}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInputWithTitle
            titleText={'Email'}
            secureText={false}
            placeholder={'Start Time'}
            setText={setStartTime}
            value={startTime}
            viewHeight={0.045}
            viewWidth={0.43}
            inputWidth={0.4}
            borderColor={Color.mediumGray}
            border={1}
            backgroundColor={'transparent'}
            color={Color.themeColor}
            placeholderColor={Color.textColor}
          />
          <TextInputWithTitle
            titleText={'Email'}
            secureText={false}
            placeholder={'End Time'}
            setText={setEndTime}
            value={endTime}
            viewHeight={0.045}
            viewWidth={0.42}
            inputWidth={0.35}
            borderColor={Color.mediumGray}
            border={1}
            backgroundColor={'transparent'}
            color={Color.themeColor}
            placeholderColor={Color.textColor}
          />
        </View>
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'post'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.05}
          marginTop={windowHeight * 0.1}
          marginBottom={moderateScale(20, 0.6)}
          onPress={() => {
            postCreate();
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
          disabled={isLoading}
        />
        <TagPeopleModal
          tagModal={tagModal}
          setTagModal={setTagModal}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />

        <SearchLocationModal
          setIsModalVisible={setCheckinModal}
          isModalVisible={checkinModal}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </ScrollView>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
  },
  row_container: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  imageContainer: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    borderRadius: moderateScale(windowHeight * 0.06) / 2,
    overflow: 'hidden',
  },
  text_view: {
    width: windowWidth * 0.65,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10, 0.6),
    backgroundColor: '#0000FE12',
    justifyContent: 'center',
    borderRadius: moderateScale(5, 0.6),
  },
  image: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.03,
    height: windowHeight * 0.25,
  },
  sec_image: {
    width: windowWidth * 0.45,
    marginRight: moderateScale(5, 0.6),
    height: windowHeight * 0.25,
  },
  row: {
    marginTop: windowHeight * 0.04,
    flexDirection: 'row',
    width: windowWidth * 0.85,
    borderWidth: 1,
    borderColor: Color.lightGrey,
    borderRadius: moderateScale(5, 0.6),
    paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  multitext: {
    fontSize: moderateScale(19, 0.6),
    position: 'absolute',
    bottom: 37,
    right: 55,
    color: Color.white,
  },
  privacy_mOdal: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.04,
    backgroundColor: 'red',
  },
  location_text: {
    ...FONTS.Medium11,
  },
  user_name: {
    ...FONTS.Medium15,
    color: Color.textColor,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  text: {
    ...FONTS.Medium11,
    color: Color.textColor,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
});
