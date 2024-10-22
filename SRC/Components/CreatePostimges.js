import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import CustomImage from './CustomImage';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import FlatGrid from 'react-native-super-grid';

const CreatePostimges = ({multiImages, setMultiImages}) => {
  console.log("🚀 ~ CreatePostimges ~ multiImages:", multiImages)
  const [images, setImages] = useState([]);
  // const postimages = multiImages.map((item ,index ) => {
  //     return( setImages(item?.uri))
  // })

  return (
    <View>
      <FlatGrid
        // horizontal={true}
          itemDimension={130}
        data={multiImages}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({item}) => (
          <View style={[styles.itemContainer, {backgroundColor: item.code}]}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri: multiImages[0]?.uri}}
            />
          </View>
        )}
      />
      {/* {multiImages.length == 1 ? (
        <View style={styles.image}>
          <View
            style={[
              styles.sec_image,
              {
                width: windowWidth * 0.85,
              },
            ]}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{uri:multiImages[0]?.uri}}
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
              <View
                style={{
                  tintColor: 'rgba(0,0,0,0.1)',
                  zIndex: 1,
                  height: '100%',
                  width: '100%',
                }}>
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
  gridView: {
    marginTop: 10,
    flex: 1,
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
