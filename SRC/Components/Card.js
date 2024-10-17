import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import { TouchableOpacity } from 'react-native';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { FONTS } from '../Config/theme';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageSlider from 'react-native-image-slider';
import navigationService from '../navigationService';

const Card = ({ item, fromProfile, setSelected, selected }) => {
  const imageArray = [
    require('../Assets/Images/scoter_image.png'),
    require('../Assets/Images/scoter_image.png'),
    require('../Assets/Images/scoter_image.png'),
    require('../Assets/Images/scoter_image.png'),
  ];
  return (
    <TouchableOpacity style={styles.cardstyle} onPress={() => navigationService.navigate('DetailScreen')}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.text_view}>
          <View
            style={{
              width: moderateScale(40, 0.6),
              height: moderateScale(40, 0.6),
              borderRadius: moderateScale(20, 0.6),
            }}>
            <CustomImage
              source={item?.profile_image}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: moderateScale(20, 0.6),
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'green',
                borderRadius: moderateScale(20, 0.6),
                top: -10,
                alignSelf: 'flex-end',
              }}
            />
          </View>
          <View style={{ paddingHorizontal: moderateScale(10, 0.6) }}>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                width: windowWidth * 0.4,
              }}
              isBold>
              {item?.name}
            </CustomText>
            <CustomText
              style={{ color: Color.lightGrey, width: 100, ...FONTS.Regular10 }}>
              {item?.time}
            </CustomText>
          </View>
        </View>
        {fromProfile ? (
          <View style={styles.btn_row}>
            <TouchableOpacity
              onPress={() => {
                setSelected('stolen');
              }}
              style={[
                styles.founded_bnt,
                {
                  backgroundColor:
                    selected == 'stolen' ? Color.themeColor : Color.mediumGray,
                  padding: moderateScale(5, 0.6),
                },
              ]}>
              <CustomText
                style={[
                  styles.founded_text,
                  {
                    color: selected == 'stolen' ? Color.white : Color.black,
                  },
                ]}>
                stolen
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected('founded');
              }}
              style={[
                styles.founded_bnt,
                {
                  backgroundColor:
                    selected == 'founded' ? Color.themeColor : Color.mediumGray,
                  padding: moderateScale(5, 0.6),
                  width: '60%',
                },
              ]}>
              <CustomText
                style={[
                  styles.founded_text,
                  {
                    color: selected == 'founded' ? Color.white : Color.black,
                  },
                ]}>
                founded
              </CustomText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigationService.navigate('MessageList')} style={styles.message_btn}>
            <CustomText style={styles.msg_btn_text}>Message</CustomText>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: moderateScale(12, 0.6) }}>
        <CustomText
          style={{
            width: windowWidth * 0.8,
            ...FONTS.Regular12,
            color: Color.lightGrey,
          }}>
          {item?.description}
        </CustomText>
        <CustomText style={{ color: '#0201FF', ...FONTS.Regular12 }}>
          Read More....
        </CustomText>
      </View>
      <View style={{
        width: windowWidth * 0.8,
        height: windowHeight * 0.3,
        alignSelf: 'center',
        borderRadius: moderateScale(20, 0.6),
      }}>
        <ImageSlider
          loopBothSides
          // autoPlayWithInterval={3000}
          images={imageArray}
          style={{ backgroundColor: 'white' }}
          customSlide={({ index, item, style, width }) => (
            <View key={index} style={[style, styles.Slide]}>
              <CustomImage
                source={item}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: moderateScale(20, 0.6)
                }}
              />
            </View>
          )}

        // customButtons={(position, move) => (
        //   <View style={styles.buttons}>
        //     {imageArray.map((image, index) => {
        //       return (
        //         <TouchableOpacity
        //           key={index}
        //           underlayColor="#ccc"
        //           onPress={() => move(index)}
        //           style={styles.button}>
        //           <Text style={position === index && styles.buttonSelected}>
        //             {index + 1}
        //           </Text>
        //         </TouchableOpacity>
        //       );
        //     })}
        //   </View>
        // )}
        />
      </View>
      {/* <View
        style={{
          width: windowWidth * 0.8,
          height: windowHeight * 0.4,
          borderRadius: moderateScale(20, 0.6),
          alignSelf: 'center',
          marginTop: moderateScale(10, 0.6),
        }}>
        <CustomImage
          source={item?.images}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: moderateScale(20, 0.6),
          }}
        />
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: moderateScale(10, 0.6),
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="message-processing-outline"
            as={MaterialCommunityIcons}
            size={moderateScale(20, 0.3)}
            color={Color.lightGrey}
          />
          <CustomText
            style={{
              ...FONTS.light12,
              color: Color.lightGrey,
              marginLeft: moderateScale(3, 0.6),
            }}>
            {item?.coments}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="heart-outline"
            as={MaterialCommunityIcons}
            size={moderateScale(20, 0.3)}
            color={Color.lightGrey}
          />
          <CustomText
            style={{
              ...FONTS.light12,
              color: Color.lightGrey,
              marginLeft: moderateScale(3, 0.6),
            }}>
            {item?.likes}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="share-outline"
            as={MaterialCommunityIcons}
            size={moderateScale(20, 0.3)}
            color={Color.lightGrey}
          />
          <CustomText
            style={{
              ...FONTS.light12,
              color: Color.lightGrey,
              marginLeft: moderateScale(3, 0.6),
            }}>
            {item?.shares}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardstyle: {
    // height: windowHeight * 0.61,
    width: windowWidth * 0.9,
    paddingHorizontal: 15,
    borderRadius: 12,
    paddingVertical: moderateScale(12, 0.6),
    overflow: 'hidden',
    backgroundColor: Color.white,
    marginVertical: moderateScale(5, 0.3),
  },
  cardImage: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.24,
    overflow: 'hidden',
    borderRadius: 12,
  },
  text_view: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: windowWidth * 0.5,
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.6),
  },
  message_btn: {
    width: moderateScale(100, 0.6),
    height: moderateScale(30, 0.6),
    backgroundColor: Color.blue,
    borderRadius: moderateScale(20, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg_btn_text: {
    color: Color.white,
    ...FONTS.Medium11,
  },
  btn_row: {
    flexDirection: 'row',
    backgroundColor: Color.lightGrey,
    width: windowWidth * 0.35,
    borderRadius: moderateScale(3, 0.6),
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 15,
  },

  founded_text: {
    color: 'white',
    ...FONTS.Medium11,
    paddingHorizontal: moderateScale(10, 0.6),
  },
  Slide: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    marginLeft: moderateScale(0.6, 0.6),
    borderRadius: moderateScale(20, 0.6),
  },
});
