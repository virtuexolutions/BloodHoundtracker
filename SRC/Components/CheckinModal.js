import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import {setCustomLocation} from '../Store/slices/common';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';

const CheckinModal = ({
  setCheckinModal,
  checkinModal,
  setSearchData,
  searchData,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [Location, setLocation] = useState('');
  
  const googlePlacesRef = useRef();
  // const kfc = {
  //   description: 'Home',
  //   geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  // };
  // const resturant = {
  //   description: 'Work',
  //   geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  // };
  // console.log('hello -        =========================== >');
  const onclick = async () => {};
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={checkinModal}
      onBackdropPress={() => {
        setCheckinModal(false);
      }}>
      {/* <View style={styles.mainContainer}> */}
        <CustomText isBold style={styles.heading}>
          Check In
        </CustomText>

        <GooglePlacesAutocomplete
          placeholder="Search"
          textInputProps={{
            placeholderTextColor: '#5d5d5d',
          }}
          onFail={(error) => {
            console.log('API Error:', error);
          }}
          onPress={(data, details = null) => {
          
          return   console.log('hey from auto places =============================?')
            // Ensure details is not null before proceeding
            if (details) {
              console.log('Selected Place:', {
                name: data?.description,
                location: details?.geometry?.location,
              });

              // If needed, update the searchData state
              setSearchData({
                name: data?.description,
                location: details?.geometry?.location,
              });
            } else {
              console.log('No details available for this location');
            }
          }}
          query={{
            key: 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM',
            language: 'en',
          }}
          fetchDetails={true} // Important to get 'details' object in onPress
          styles={{
            textInputContainer: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
            },
            textInput: {
              height: windowHeight * 0.06,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 2,
              borderColor: '#EAEAEA',
              borderRadius: moderateScale(20, 0.6),
            },
            listView: {
              width: windowWidth * 0.8,
            },
            description: {
              color: '#5d5d5d',
            },
          }}
        />

        {/* {Object.keys(searchData).length > 0 && ( */}
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: 50,
            }}>
            <CustomButton
              text={'Proceed'}
              textColor={'#fff'}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                console.log('------------------')
                googlePlacesRef.current?.clear()
                // dispatch(setCustomLocation(searchData));
                // navigation.goBack();
              }}
              bgColor={'#FFB000'}
              borderColor={'#fff'}
              borderWidth={1}
              borderRadius={moderateScale(30, 0.3)}
            />
          </View>
        {/* )} */}
      {/* </View> */}
    </Modal>

    // <Modal
    //   hasBackdrop={true}
    //   style={{
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    //   isVisible={checkinModal}
    //   onBackdropPress={() => {
    //     setCheckinModal(false);
    //   }}>
    //   <View style={styles.mainContainer}>
    //     <CustomText isBold style={styles.heading}>
    //       check in
    //     </CustomText>

    //     <View
    //       style={
    //         {
    //           // flexDirection: 'row',
    //           // justifyContent: 'space-between',
    //           // // alignItems: 'center',
    //           // padding: moderateScale(7, 0.6),
    //         }
    //       }>
    //       {/* <TouchableOpacity activeOpacity={0.8} style={styles.Rounded}>
    //         <Icon
    //           onPress={() => {
    //             navigation.goBack();
    //           }}
    //           name="chevron-back-sharp"
    //           as={Ionicons}
    //           size={moderateScale(30)}
    //           color={Color.black}
    //         />
    //       </TouchableOpacity> */}

    //       <GooglePlacesAutocomplete
    //         placeholder="Search"
    //         textInputProps={{
    //           placeholderTextColor: '#5d5d5d',
    //           // returnKeyType: "search"
    //         }}
    //         onFail={error => {
    //           console.log('API Error:', error);
    //         }}
    //         onPress={(data, details = null) =>{
    //             console.log('🚀 ~ CheckinModal ===============>', data);

    //         }}
    //         // onPress={(data, details = null) => {
    //         //   Alert.alert('onPress fired!');
    //         //   // console.log('hello hereeeee ========  >>>>>>>>>', {
    //         //   //   name: data?.description,
    //         //   //   location: details?.geometry?.location,
    //         //   // });
    //         //   //   setSearchData({
    //         //   //     name: data?.description,
    //         //   //     location: details?.geometry?.location,
    //         //   //   });

    //         //   // Alert.alert('onPress fired!');
    //         //   // console.log('🚀 ~ CheckinModal ===============>', data);
    //         //   // console.log('hello hereeeee ========  >>>>>>>>>', {
    //         //   //   name: data?.description,
    //         //   //   location: details?.geometry?.location,
    //         //   // });
    //         //   // setSearchData({
    //         //   //   name: data?.description,
    //         //   //   location: details?.geometry?.location,
    //         //   // });
    //         // }}
    //         query={{

    //           language: 'en',
    //         }}
    //         // isRowScrollable={true}
    //         fetchDetails={true}
    //         // enablePoweredByContainer={false}
    //         styles={{
    //           textInputContainer: {
    //             width: windowWidth * 0.8,
    //             marginLeft: moderateScale(5, 0.6),
    //           },
    //           textInput: {
    //             height: windowHeight * 0.06,
    //             color: '#5d5d5d',
    //             fontSize: 16,
    //             borderWidth: 2,
    //             borderColor: Color.lightGrey,
    //             borderRadius: moderateScale(20, 0.6),
    //           },
    //           listView: {
    //             width: windowWidth * 0.8,
    //             // marginLeft: moderateScale(5, 0.6),
    //             // borderColor: Color.veryLightGray,
    //             // color : 'red',
    //             // backgroundColor : 'red'
    //           },

    //           description: {
    //             color: '#5d5d5d',
    //           },
    //         }}
    //         // predefinedPlaces={[kfc, resturant]}
    //       />
    //     </View>

    //     {Object.keys(searchData).length > 0 && (
    //       <View
    //         style={{
    //           alignSelf: 'center',
    //           position: 'absolute',
    //           bottom: 50,
    //         }}>
    //         <CustomButton
    //           text={'Proceed'}
    //           textColor={Color.white}
    //           width={windowWidth * 0.8}
    //           height={windowHeight * 0.06}
    //           marginTop={moderateScale(20, 0.3)}
    //           onPress={() => {
    //             dispatch(setCustomLocation(searchData));
    //             navigation.goBack();
    //           }}
    //           bgColor={'#FFB000'}
    //           borderColor={Color.white}
    //           borderWidth={1}
    //           borderRadius={moderateScale(30, 0.3)}
    //         />
    //       </View>
    //     )}
    //   </View>
    // </Modal>
  );
};

export default CheckinModal;

const styles = StyleSheet.create({
  // mainContainer: {
  //   height: windowHeight * 0.5,
  //   width: windowWidth * 0.9,
  //   backgroundColor: 'white',
  //   alignItems: 'center',
  //   borderRadius: moderateScale(5, 0.6),
  //   paddingVertical: moderateScale(10, 0.6),
  // },
  main: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    // alignItems : 'flex-end'
  },

  SearchContainer: {
    width: windowWidth * 0.77,
    height: windowHeight * 0.07,
    borderRadius: 30,
    borderColor: Color.lightGrey,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(5, 0.6),
    alignItems: 'center',
  },

  Rounded: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.06,
    borderRadius: moderateScale(30, 0.3),
    backgroundColor: '#FBB824',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: moderateScale(17, 0.6),
    color: Color.blue,
    paddingVertical: moderateScale(10, 0.6),
  },

  txt1: {
    fontSize: moderateScale(12, 0.6),
    color: Color.black,
  },
});
