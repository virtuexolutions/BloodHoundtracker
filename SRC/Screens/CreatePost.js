import {Icon} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import {windowHeight, windowWidth} from '../Utillity/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const CreatePost = () => {
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
        <CustomText
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
        </CustomText>
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
        <TouchableOpacity style={styles.row}>
          <View
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
          </View>
          <CustomText
            style={{
              ...FONTS.Regular13,
              color: Color.textColor,
            }}>
            tag people
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, {marginTop: 0}]}>
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
    width: windowWidth * 0.9,
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
    width: windowWidth * 0.85,
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
});
