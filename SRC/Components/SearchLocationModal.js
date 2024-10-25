import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

const SearchLocationModal = ({
  isModalVisible,
  setIsModalVisible,
  searchData,
  setSearchData,
}) => {
  const ref = useRef();
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.maincontainer}>
        <CustomText
          style={{
            color: '#193075',
            marginBottom: moderateScale(10, 0.3),
            fontSize: moderateScale(22, 0.6),
          }}
          isBold>
          Select Location
        </CustomText>

        <View
          style={{
            justifyContent: 'space-between',
            padding: moderateScale(7, 0.6),
          }}>
          <GooglePlacesAutocomplete
            keepResultsAfterBlur={true}
            placeholder="Search"
            textInputProps={{
              placeholderTextColor: '#5d5d5d',
            }}
            onPress={(data, details = null) => {
              console.log('hello hereeeee ========  >>>>>>>>>', {
                name: data?.description,
                location: details?.geometry?.location,
              });
              setSearchData({
                name: data?.description,
                location: details?.geometry?.location,
              });
            }}
            query={{
              key: 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM',

              language: 'en',
            }}
            isRowScrollable={true}
            fetchDetails={true}
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
                borderColor: Color.lightGrey,
                borderRadius: moderateScale(20, 0.6),
              },
              listView: {
                width: windowWidth * 0.8,
                marginLeft: moderateScale(5, 0.6),
                borderColor: Color.veryLightGray,
              },

              description: {
                color: '#5d5d5d',
              },
            }}
          />
        </View>
        {Object.keys(searchData).length > 0 && (
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: 50,
            }}>
            <CustomButton
              text={'Proceed'}
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.055}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                setIsModalVisible(false);
              }}
              bgColor={Color.blue}
              borderColor={Color.white}
              borderWidth={1}
              borderRadius={moderateScale(10, 0.3)}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.themeColor,
  },
});
