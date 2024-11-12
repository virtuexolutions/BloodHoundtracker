import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomImage from './CustomImage';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import ImageViewingModal from './ImageViewingModal';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';

const CreatePostimges = ({multiImages, setMultiImages}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <View>
      {multiImages.length == 1 ? (
        <View style={styles.image}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}
            style={[
              styles.sec_image,
              {
                width: windowWidth * 0.85,
              },
            ]}>
            <CustomImage
              onPress={() => {
                setIsVisible(true);
              }}
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri: multiImages[0]?.uri}}
            />
          </TouchableOpacity>
        </View>
      ) : multiImages.length == 2 ? (
        <View style={styles.image}>
          <View style={styles.sec_image}>
            <CustomImage
              onPress={() => {
                setIsVisible(true);
              }}
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri: multiImages[0]?.uri}}
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
                onPress={() => {
                  setIsVisible(true);
                }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{uri: multiImages[1]?.uri}}
              />
            </View>
          </View>
        </View>
      ) : multiImages.length == 3 ? (
        <View style={styles.image}>
          <View style={styles.sec_image}>
            <CustomImage
              onPress={() => {
                setIsVisible(true);
              }}
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri: multiImages[0]?.uri}}
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
                onPress={() => {
                  setIsVisible(true);
                }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{uri: multiImages[1]?.uri}}
              />
            </View>
            <View
              style={{
                width: windowWidth * 0.38,
                height: windowHeight * 0.12,
              }}>
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{uri: multiImages[2]?.uri}}
              />
            </View>
          </View>
        </View>
      ) : multiImages.length > 3 ? (
        <View style={styles.image}>
          <TouchableOpacity style={styles.sec_image}>
            <CustomImage
              onPress={() => {
                setIsVisible(true);
              }}
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri: multiImages[0]?.uri}}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{
                width: windowWidth * 0.38,
                height: windowHeight * 0.12,
                marginBottom: moderateScale(7, 0.6),
              }}>
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{uri: multiImages[1]?.uri}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
              }}
              activeOpacity={0.9}
              style={{
                width: windowWidth * 0.38,
                height: windowHeight * 0.12,
              }}>
              <View
                style={{
                  tintColor: 'rgba(0,0,0,0.1)',
                  zIndex: 1,
                  height: '100%',
                  width: '100%',
                }}>
                <CustomImage
                  onPress={() => {
                    setIsVisible(true);
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    // tintColor: 'rgba(0,0,0,0.1)',
                  }}
                  source={{uri: multiImages[2]?.uri}}
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
      )}
      <ImageViewingModal
        fromCreatePost={true}
        visible={isVisible}
        setIsVisible={setIsVisible}
        setSelectedImageIndex={setSelectedImageIndex}
        selectedImageIndex={selectedImageIndex}
        multiImages={multiImages}
        setMultiImages={setMultiImages}
      />
    </View>
  );
};

export default CreatePostimges;

const styles = StyleSheet.create({
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
    zIndex: 1,
    marginRight: moderateScale(5, 0.6),
    height: windowHeight * 0.25,
  },
  row: {
    marginTop: windowHeight * 0.04,
    backgroundColor: 'red',
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
  gridView: {
    marginTop: 10,
    // flex: 1,
    width: windowWidth * 0.95,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
