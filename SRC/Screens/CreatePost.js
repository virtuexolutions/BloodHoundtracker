import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {FONTS} from '../Config/theme';
import {
  requestCameraPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import TagPeopleModal from '../Components/TagPeopleModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CheckinModal from '../Components/CheckinModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Modal from '../Components/Modal';
import CreatePostimges from '../Components/CreatePostimges';

const CreatePost = () => {
  const [tagModal, setTagModal] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [show, setShow] = useState(false);
  const [fileObject, setFileObject] = useState({});
  const [checkinModal, setCheckinModal] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [description, setDescription] = useState('');

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
      mediaType: 'photo',
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


  
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
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
              source={require('../Assets/Images/dummyman1.png')}
            />
          </View>
          <View style={styles.text_view}>
            <CustomText
              isBold
              style={{
                ...FONTS.Medium15,
                color: Color.textColor,
                paddingHorizontal: moderateScale(10, 0.6),
                paddingTop: moderateScale(5, 0.6),
              }}>
              Emmanuel Robertsen
            </CustomText>
            <View style={styles.container}>
              <Icon
                style={{
                  marginTop: moderateScale(2, 0.6),
                }}
                name={'lock'}
                as={AntDesign}
                size={moderateScale(15, 0.6)}
                color={Color.themeColor}
              />
              <CustomText
                isBold
                style={{
                  ...FONTS.Medium10,
                  color: Color.textColor,
                  paddingHorizontal: moderateScale(5, 0.6),
                  paddingTop: moderateScale(2, 0.6),
                }}>
                only me
              </CustomText>
              <Icon
                name={'arrow-drop-down'}
                as={MaterialIcons}
                size={moderateScale(18, 0.6)}
                color={Color.themeColor}
              />
            </View>
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
        {/* <Modal/> */}
        {/* <CustomText
          style={{
            paddingTop: windowHeight * 0.03,
            ...FONTS.Medium11,
            color: Color.lightGrey,
            paddingHorizontal: moderateScale(5, 0.6),
            // paddingTop: moderateScale(2, 0.6),
            width: windowWidth * 0.8,
          }}>
          In Miami, my electric trail motorbike, painted in striking blue, has
          gone missing, leaving only a scratched fuel tank as a clue to its
          whereabouts. I'm fervently searching, longing to reunite with my
          prized ride and resume exploring the city's scenic trails.
        </CustomText> */}
        <CreatePostimges multiImages={multiImages} setMultiImages={setMultiImages}/>
        {/* {multiImages.length == 1 ? (
          <View style={styles.image}>
            <View style={styles.sec_image}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/Bike.png')}
              />
            </View>
          </View>
        ) : multiImages.length == 2 ? (
          <View style={styles.image}>
            <View style={styles.sec_image}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/Bike.png')}
              />
            </View>
            <View>
              <View
                style={{
                  width: windowWidth * 0.38,
                  height: windowHeight * 0.25,
                  marginBottom: moderateScale(7, 0.6),
                }}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/Bike.png')}
                />
              </View>
            </View>
          </View>
        ) : multiImages.length == 3 ? (
          <View style={styles.image}>
            <View style={styles.sec_image}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/Bike.png')}
              />
            </View>
            <View>
              <View
                style={{
                  width: windowWidth * 0.38,
                  height: windowHeight * 0.12,
                  marginBottom: moderateScale(7, 0.6),
                }}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/Bike.png')}
                />
              </View>
              <View
                style={{
                  width: windowWidth * 0.38,
                  height: windowHeight * 0.12,
                }}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/Bike.png')}
                />
              </View>
            </View>
          </View>
        ) : multiImages.length > 3 ? (
          <View style={styles.image}>
            <View style={styles.sec_image}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/Bike.png')}
              />
            </View>
            <View>
              <View
                style={{
                  width: windowWidth * 0.38,
                  height: windowHeight * 0.12,
                  marginBottom: moderateScale(7, 0.6),
                }}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/Bike.png')}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  width: windowWidth * 0.38,
                  height: windowHeight * 0.12,
                }}>
                  <View style={{ tintColor:'rgba(0,0,0,0.1)' ,zIndex:1 ,height:'100%',width:'100%'}}>

                  
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                    // tintColor: 'rgba(0,0,0,0.1)',
                  }}
                  source={require('../Assets/Images/Bike.png')}
                />
                </View>
              </TouchableOpacity>
              <CustomText isBold style={styles.multitext}>{`+${
                multiImages.length - 3
              } `}</CustomText>
            </View>
          </View>
        ) : (
          <View style={styles.image}></View>
        )} */}

        <TextInputWithTitle
          titleText={'Email'}
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
      
        <TouchableOpacity
          onPress={() => {
            console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
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
        <CustomButton
          text={'post'}
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.05}
          marginTop={windowHeight * 0.15}
          onPress={() => {}}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(5, 0.3)}
          elevation
        />
        <TagPeopleModal
          tagModal={tagModal}
          setTagModal={setTagModal}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />
        <CheckinModal
          checkinModal={checkinModal}
          setCheckinModal={setCheckinModal}
        />
       
      </ScrollView>
    </SafeAreaView>
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
    width: windowWidth * 0.25,
    justifyContent: 'center',
    borderRadius: moderateScale(5, 0.6),
    height: windowHeight * 0.03,
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
    color:Color.white
  },
 
});
