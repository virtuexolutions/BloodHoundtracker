import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';

const Modal = () => {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        textInputProps={{
          placeholderTextColor: '#5d5d5d',
          // returnKeyType: "search"
        }}
        onFail={error => {
          console.log('API Error:', error);
        }}
        onPress={(data, details = null) => {
          try {
            if (details) {
              // Your logic here
              Alert.alert('onPress fired!');
              console.log('🚀 ~ CheckinModal ===============>', data);
              console.log('hello hereeeee ========  >>>>>>>>>', {
                name: data?.description,
                location: details?.geometry?.location,
              });
              //   setSearchData({
              //     name: data?.description,
              //     location: details?.geometry?.location,
              //   });
            } else {
              throw new Error('Location details not available');
            }
          } catch (error) {
            console.error('Error in onPress:', error);
          }
        }}
        query={{
          key: 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM',
          language: 'en',
        }}
        isRowScrollable={true}
        fetchDetails={true}
        // enablePoweredByContainer={false}
        styles={{
          textInputContainer: {
            width: windowWidth * 0.8,
            backgroundColor: 'red',
            marginLeft: moderateScale(5, 0.6),
          },
          textInput: {
            height: windowHeight * 0.06,
            color: '#5d5d5d',
            fontSize: 16,
            borderWidth: 2,
            borderColor: Color.lightGrey,
            borderRadius: moderateScale(20, 0.6),
          },
          listView: {
            width: windowWidth * 0.8,
            // marginLeft: moderateScale(5, 0.6),
            // borderColor: Color.veryLightGray,
            // color : 'red',
            // backgroundColor : 'red'
          },

          description: {
            color: '#5d5d5d',
          },
        }}
        // predefinedPlaces={[kfc, resturant]}
      />
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({});
